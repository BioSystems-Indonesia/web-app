"use client";

import { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import logo from "@/assets/logo/bios.png";
import Image from "next/image";
import axios from "axios";

import "./page.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth", {
        username,
        password,
      });
      const data = res.data;

      if (!data.success) {
        setError(data.message || "username or password wrong!");
        setPassword("");
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, try again.");
      }
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
                  autoCapitalize="none"
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
