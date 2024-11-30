"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { get } from "http";
import Card from "../Settings/Card";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

type CalculatorStats = {
  type: string;
  result: number;
  weight: number;
  createdAt: string;
};

const Options = () => {
  const searchParams = useSearchParams();
  const menuOption = searchParams.get("menu");
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bmrData, setBmrData] = React.useState<CalculatorStats[]>([]);
  const [tdeeData, setTdeeData] = React.useState<CalculatorStats[]>([]);
  const [bmiData, setBmiData] = React.useState<CalculatorStats[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || !session) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Ładowanie...</p>;
  }

  if (!session) return null;

  useEffect(() => {
    const getCalculatorStats = async () => {
      const res = await fetch("/api/profile/getCalculatorStats", {
        method: "GET",
      });
      const data = await res.json();

      const sortedData = data.sort(
        (a: CalculatorStats, b: CalculatorStats) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Rosnąco
      );

      const bmiData = sortedData.filter(
        (item: CalculatorStats) => item.type === "BMI"
      );
      const bmrData = sortedData.filter(
        (item: CalculatorStats) => item.type === "BMR"
      );
      const tdeeData = sortedData.filter(
        (item: CalculatorStats) => item.type === "TDEE"
      );

      setBmiData(bmiData.reverse());
      setBmrData(bmrData.reverse());
      setTdeeData(tdeeData.reverse());
    };

    if (menuOption === "Statistics" || menuOption === null)
      getCalculatorStats();
  }, [menuOption]);

  return (
    <div className="w-full xl:col-span-9 xl:p-8 p-4 xl:grid xl:grid-cols-2 flex flex-col gap-8">
      {menuOption === "Statistics" || menuOption === null ? (
        <>
          <Card title="Statystyki" className="col-span-2">
            <div className="grid grid-cols-2">
              <div className="flex flex-col items-center">
                <h3 className="font-bold">BMI</h3>
                <ResponsiveContainer height={250}>
                  <LineChart data={bmiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="result"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">BMR</h3>
                <ResponsiveContainer height={250}>
                  <LineChart data={bmrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="result"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold">TDEE</h3>
              <ResponsiveContainer height={250}>
                <LineChart data={tdeeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="createdAt" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="result"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default Options;
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-[#f2f2f2] p-2 px-3 text-sm border-gray-300 rounded shadow-lg text-black">
        <p>
          <span className="font-bold">Waga:</span> {payload[0].payload.weight}
        </p>
        <span className="font-bold">Wynik:</span> {payload[0].value}
        <p className="italic text-black/50">{label}</p>
      </div>
    );
  }

  return null;
};
