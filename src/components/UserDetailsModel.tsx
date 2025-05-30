"use client";
import { useEffect, useState } from "react";
import Modal from "./Model";
import { FormLables, StatusLables } from "@/constant/enum";

interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
  age: number;
  address: { address: string; city: string; postalCode: string };
}

interface Props {
  userId: number | null;
  onClose: () => void;
}

export default function UserDetailsModal({ userId, onClose }: Props) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId === null) return;
    setLoading(true);
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <Modal open={userId !== null} onClose={onClose}>
      {loading && <p>{StatusLables.Loading}</p>}
      {error && <p className="text-red-600">{error}</p>}
      {user && (
        <div className="space-y-4">
          <img
            src={user.image}
            alt=""
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-bold text-center">
            {user.firstName} {user.lastName}
          </h2>
          <p>
            <strong>{FormLables.Email}:</strong> {user.email}
          </p>
          <p>
            <strong>{FormLables.Phone}:</strong> {user.phone}
          </p>
          <p>
            <strong>{FormLables.Age}:</strong> {user.age}
          </p>
          <p>
            <strong>{FormLables.Address}:</strong> {user.address.address},{" "}
            {user.address.city} {user.address.postalCode}
          </p>
        </div>
      )}
    </Modal>
  );
}
