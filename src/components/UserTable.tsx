"use client";
import { FormLables } from "@/constant/enum";
import { useEffect, useState } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface UserTableProps {
  onSelect: (id: number) => void;
}

export default function UserTable({ onSelect }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users…</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-center">{FormLables.Avatar}</th>
            <th className="py-2 px-4 text-left">{FormLables.Name}</th>
            <th className="py-2 px-4 text-left">{FormLables.Email}</th>
            <th className="py-2 px-4 text-left">{FormLables.Action}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4 text-center">
                <img
                  src={u.image}
                  alt=""
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="py-2 px-4">
                {u.firstName} {u.lastName}
              </td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onSelect(u.id)}
                  className="text-blue-600 hover:underline"
                >
                  {FormLables.View}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
