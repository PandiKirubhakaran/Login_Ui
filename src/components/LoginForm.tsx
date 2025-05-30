"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import { AuthLables } from "@/constant/enum";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check localStorage (users signed up via your SignupForm)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const localUser = users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (localUser) {
      // Simulate a token and enrich with default values
      const fakeUser = {
        ...localUser,
        accessToken: "fake-local-token",
        refreshToken: "fake-local-refresh",
        image: "https://dummyjson.com/image/128x128",
        gender: "not specified",
      };
      login(fakeUser); // Login with user object
      router.push("/dashboard");
      return;
    }

    // Fallback to DummyJSON API
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login(data); // Login with full API user object
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-96 space-y-4 mx-auto mt-20"
    >
      <h1 className="text-2xl font-bold text-center">{AuthLables.Login}</h1>
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="w-full bg-black text-yellow-400 py-2 rounded hover:opacity-90 transition"
      >
        {AuthLables.Login}
      </button>
    </form>
  );
}
