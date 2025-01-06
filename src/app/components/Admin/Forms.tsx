"use client";
import { cn } from "@/app/lib/cn";
import axios from "axios";
import React, { useEffect } from "react";
import { EmailTemplate } from "../email-template";
import { SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import {
  LineChart,
  Line,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { set } from "date-fns";

export const Users = () => {
  const [users, setUsers] = React.useState<
    {
      id: number;
      name: string;
      email: string;
      active: boolean;
      roles: string[];
    }[]
  >([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<"id" | "email">("id");
  const [showActiveOnly, setShowActiveOnly] = React.useState<
    "all" | "active" | "inactive"
  >("all");
  const [error, setError] = React.useState<string | null>(null);

  const suspendUser = async (id: number) => {
    try {
      await axios.put("/api/admin/suspendUser", { id });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const fetchData = async (newPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/admin/getUsers`, {
        params: {
          page: newPage,
          [searchBy]: searchQuery,
          active:
            showActiveOnly === "all" ? undefined : showActiveOnly === "active",
        },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Nie udało się pobrać użytkowników:", error);
      setError("Nie udało się pobrać użytkowników");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(page);
  }, [page, showActiveOnly]);

  const handleSearch = () => {
    setPage(1);
    fetchData(1);
  };

  const skeletons = Array(5)
    .fill(null)
    .map((_, index) => (
      <tr key={index} className="border-b-2 border-white/10">
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
      </tr>
    ));

  return (
    <div className="overflow-x-auto select-text flex flex-col justify-between h-full">
      <div>
        <div className="flex xl:items-center xl:flex-row flex-col gap-4 mb-4">
          <label className="text-white">Wyszukaj:</label>
          <input
            type="text"
            placeholder={`Wprowadź ${searchBy}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-white/10 rounded text-white outline-none"
          />
          <label className="text-white">Po:</label>
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as "id" | "email")}
            className="px-4 py-2 bg-white/10 rounded text-white"
          >
            <option value="id">ID</option>
            <option value="email">Email</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
          >
            Znajdź
          </button>
          <label className="text-white">Filtruj:</label>
          <select
            value={showActiveOnly}
            onChange={(e) => {
              setShowActiveOnly(
                e.target.value as "all" | "active" | "inactive"
              );
              setPage(1);
            }}
            className="px-4 py-2 bg-white/10 rounded text-white"
          >
            <option value="all">Wszyscy</option>
            <option value="active">Aktywni</option>
            <option value="inactive">Zablokowani</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="border-b-2 border-white/60">
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Nazwa
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Funkcje
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? skeletons
                : users.map((user) => (
                    <tr
                      key={user.id}
                      className={cn(
                        "hover:bg-white/5 duration-200 border-b-2 border-white/10",
                        !user.active && "bg-red-500/20"
                      )}
                    >
                      <td className="px-6 py-4 text-sm text-white">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-white text-center">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className={cn(
                              "bg-slate-400/40 px-2 py-1 mr-2 rounded-xl",
                              role === "admin" && "bg-orange-500/40"
                            )}
                          >
                            {role}
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-sm text-white flex gap-4 w-full justify-center">
                        <button
                          className={cn(
                            "bg-green-500/50 hover:bg-green-500/60 px-3 py-1 rounded-xl duration-300 transition-all"
                          )}
                        >
                          Profil
                        </button>
                        {!user.roles.includes("admin") ? (
                          <button
                            className={cn(
                              "bg-red-500/50 hover:bg-red-500/70 px-3 py-1 rounded-xl duration-300 transition-all",
                              !user.active &&
                                "bg-green-500/50 hover:bg-green-500/70"
                            )}
                            onClick={() => {
                              suspendUser(user.id);
                            }}
                          >
                            {user.active ? "Zablokuj" : "Odblokuj"}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={cn(
            "bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white",
            page === 1 && "cursor-not-allowed hover:bg-blue-500/50"
          )}
        >
          Poprzednia
        </button>
        <span>
          Strona {page} z {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
        >
          Następna
        </button>
      </div>
    </div>
  );
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export const Notifications = () => {
  type FormValues = {
    title: string;
    body: string;
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [previewData, setPreviewData] = React.useState<FormValues | null>(null);
  const [emails, setEmails] = React.useState<[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const skeletons = Array(3)
    .fill(null)
    .map((_, index) => (
      <tr key={index} className="border-b-2 border-white/10">
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
      </tr>
    ));
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const sanitizedBody = DOMPurify.sanitize(data.body);
    await axios.post("/api/admin/sendNotification", {
      title: data.title,
      body: sanitizedBody,
    });
  };
  useEffect(() => {
    const getEmails = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/admin/getEmails");
      setEmails(response.data);
      setIsLoading(false);
    };
    getEmails();
  }, []);

  const handlePreview = (data: FormValues) => {
    const sanitizedBody = DOMPurify.sanitize(data.body);
    setPreviewData({ title: data.title, body: sanitizedBody });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="grid w-full grid-cols-3">
          <label className="text-white">Tytuł:</label>

          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="px-4 py-2 bg-white/10 rounded text-white outline-none col-span-2"
          />

          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="xl:grid w-full xl:grid-cols-3 flex flex-col gap-4 xl:gap-0">
          <label className="text-white">Treść:</label>

          <div className="col-span-2">
            <ReactQuill
              onChange={(content: any) => setValue("body", content)}
              className="bg-white/10 text-white rounded"
            />
          </div>

          {errors.body && (
            <span className="text-red-500">{errors.body.message}</span>
          )}
        </div>

        <div className="w-full grid grid-cols-2 gap-8">
          <button
            type="submit"
            className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
          >
            Wyślij
          </button>

          <button
            type="button"
            onClick={handleSubmit(handlePreview)}
            className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
          >
            Zobacz podgląd
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-center mt-8">
          <thead>
            <tr className="border-b-2 border-white/60">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                Id
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider  border-white/60 w-1/4">
                User
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? skeletons
              : emails.map((email: any) => (
                  <tr
                    key={email.id}
                    className={cn(
                      "hover:bg-white/5 duration-200 border-b-2 border-white/10"
                    )}
                  >
                    <td className="px-6 py-4 text-sm text-white">{email.id}</td>
                    <td className="px-6 py-4 text-sm text-white">
                      {email.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {email.createdAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {email.user.name}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <p className="text-white/60 italic text-center w-full">
        Tylko 5 najnowszych wiadomości
      </p>

      {previewData && (
        <div
          className="mt-8 bg-black/80 rounded flex justify-center absolute w-full h-full -top-8 left-1/2 -translate-x-1/2"
          onClick={() => setPreviewData(null)}
        >
          <EmailTemplate
            title={previewData.title}
            button
            htmlContent={previewData.body}
          ></EmailTemplate>
        </div>
      )}
    </>
  );
};

export const Statistics = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const getStatistics = async () => {
      const response = await axios.get("/api/admin/getDatabaseStatistics");
      setData(response.data);
    };
    getStatistics();
  }, []);

  return (
    <div className="grid grid-cols-2">
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newCalculators"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer className="col-span-2" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newNotifications"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />{" "}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Recipes = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [recipes, setRecipes] = React.useState<
    {
      id: number;
      name: string;
      description: string;
      tags: string[];
      ingredients: { name: string; quantity: number; metric: string }[];
      instructions: string[];
    }[]
  >([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<"name" | "tag">("name");

  const fetchData = async (newPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/admin/getRecipe`, {
        params: {
          [searchBy]: searchQuery,
        },
      });
      console.log(res.data);
      setRecipes(res.data.recipes);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Nie udało się pobrać użytkowników:", error);
      setError("Nie udało się pobrać użytkowników");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const handleSearch = () => {
    setPage(1);
    fetchData(1);
  };
  const handleSuspend = async (id: number) => {
    try {
      const response = await axios.delete(`/api/admin/removeRecipe/${id}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error suspending recipe:", error);
    }
  }
  const skeletons = Array(5)
    .fill(null)
    .map((_, index) => (
      <tr key={index} className="border-b-2 border-white/10">
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
        <td className="px-6 py-4 text-sm text-white/30 rounded w-1/4">
          <span className="animate-pulse text-white block h-4 bg-white/30 rounded"></span>
        </td>
      </tr>
  ));
  return (
    <div className="relative w-full h-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          window.open("/account/adm/createRecipe", "_blank");
        }}
        className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white mb-4"
      >
        Dodaj nowy przepis
      </button>
      <div>
        <div className="flex xl:items-center xl:flex-row flex-col gap-4 mb-4">
          <label className="text-white">Wyszukaj:</label>
          <input
            type="text"
            placeholder={`Wprowadź ${searchBy}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-white/10 rounded text-white outline-none"
          />
          <label className="text-white">Po:</label>
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as "tag" | "name")}
            className="px-4 py-2 bg-white/10 rounded text-white"
          >
            <option value="name">Nazwa</option>
            <option value="tag">Tagi</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
          >
            Znajdź
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="border-b-2 border-white/60">
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Nazwa
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Opis
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Tagi
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-white/60 w-1/4">
                  Akcja
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? skeletons
                : recipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className={cn(
                        "hover:bg-white/5 duration-200 border-b-2 border-white/10")}
                    >
                      <td className="px-6 py-4 text-sm text-white">
                        {recipe.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {recipe.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {recipe.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-white text-center">
                        {recipe.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "bg-slate-400/40 px-2 py-1 mr-2 rounded-xl"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-sm text-white flex gap-4 w-full justify-center">
                        <button
                          className={cn(
                            "bg-yellow-500/50 hover:bg-yellow-500/60 px-3 py-1 rounded-xl duration-300 transition-all"
                          )}
                        >
                          Edytuj
                        </button>
                        <button
                          className={cn(
                            "bg-red-500/50 hover:bg-red-500/60 px-3 py-1 rounded-xl duration-300 transition-all"
                          )}
                          onClick={() => {
                            handleSuspend(recipe.id);
                          }}
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          
        </div>
        <div className="flex justify-center mt-4 gap-4 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={cn(
            "bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white",
            page === 1 && "cursor-not-allowed hover:bg-blue-500/50"
          )}
        >
          Poprzednia
        </button>
        <span>
          Strona {page} z {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
        >
          Następna
        </button>
      </div>
      </div>

    </div>
  );
};
