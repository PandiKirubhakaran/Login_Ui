"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLables } from "@/constant/enum";

type User = {
  username: string;
  password: string;
};

export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    // Simulate signup by saving to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: User) => u.username === username)) {
      setError("Username already exists");
      return;
    }
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login
    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-96 space-y-4 mx-auto mt-20"
    >
      <h1 className="text-2xl font-bold text-center">{AuthLables.Sign_Up}</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full border p-2 rounded"
        autoComplete="username"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
        autoComplete="new-password"
      />

      <button
        type="submit"
        className="w-full bg-black text-yellow-400 py-2 rounded hover:opacity-90 transition"
      >
        {AuthLables.Sign_Up}
      </button>
    </form>
  );
}
