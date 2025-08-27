"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegUser, FaLock } from "react-icons/fa";
import logo from "@/assets/logo/bios.png";
import Image from "next/image";

import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.user.token);

      if (!res.ok || !data.success) {
        setError(data.message || "Email or password wrong!");
        setPassword("")
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-card">
          <Image className="logo" src={logo} alt="BioSystems Logo" />
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <p>Please log in to continue</p>
          {error && (
            <div className="card-error"><p className="error">{error}</p><p onClick={() => setError("")}>x</p></div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="username-container">

              <div className={`input-container ${username ? "filled" : ""}`}>
                <FaRegUser />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="password-container">

              <div className={`input-container ${password ? "filled" : ""}`}>
                <FaLock />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <footer>Copyright © 2025 Biosystems Indonesia</footer>
    </>
  );
}
