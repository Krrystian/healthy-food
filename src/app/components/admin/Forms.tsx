"use client";
import axios from "axios";
import React from "react";

export const Users = () => {
  const [users, setUsers] = React.useState<
    { id: number; name: string; email: string }[]
  >([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

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
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
              Funkcje
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-white/5 duration-200 border-b-2 border-white/10"
            >
              <td className="px-6 py-4 text-sm text-white">{user.id}</td>
              <td className="px-6 py-4 text-sm text-white">{user.name}</td>
              <td className="px-6 py-4 text-sm text-white">{user.email}</td>
              <td className="px-6 py-4 text-sm text-white flex gap-4 w-full justify-center">
                <button>Profil</button>
                <button>Zablokuj</button>
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
