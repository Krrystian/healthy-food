"use client";
import { cn } from "@/app/lib/cn";
import axios from "axios";
import React from "react";

// TODO: Profile page, profile link
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
        <div className="flex items-center gap-4 mb-4">
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
                    <td className="px-6 py-4 text-sm text-white">{user.id}</td>
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
