"use client";
import { cn } from "@/app/lib/cn";
import axios from "axios";
import React from "react";

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
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/admin/getUsers?page=${page}`);
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [page]);

  if (users.length === 0) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="overflow-x-auto select-text">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className={`border-b-2 border-white/60`}>
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
              role
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
              Funkcje
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={cn(
                `hover:bg-white/5 duration-200 border-b-2 border-white/10`,
                !user.active && "bg-red-500/20"
              )}
            >
              <td className="px-6 py-4 text-sm text-white">{user.id}</td>
              <td className="px-6 py-4 text-sm text-white">{user.name}</td>
              <td className="px-6 py-4 text-sm text-white">{user.email}</td>
              <td className="px-6 py-4 text-sm text-white">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className={cn(
                      `bg-slate-400/40 px-2 py-1 mr-2 rounded-xl`,
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
                      !user.active && "bg-green-500/50 hover:bg-green-500/70"
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
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Poprzednia
        </button>
        <span>
          Strona {page} z {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Następna
        </button>
      </div>
    </div>
  );
};
