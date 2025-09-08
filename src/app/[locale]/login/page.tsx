"use client";

import { useState, useEffect } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import logo from "@/assets/logo/bios.png";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import "./page.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [locale, setLocale] = useState("id");
  const params = useParams();
  const t = useTranslations('Auth');

  useEffect(() => {
    if (params?.locale && typeof params.locale === 'string') {
      setLocale(params.locale);
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/login", {
        username,
        password,
      });

      window.location.href = `/${locale}/dashboard`;
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
          <h2>{t('login')}</h2>
          <p>{t('loginDescription')}</p>
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
                  placeholder={t('username')}
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
                  placeholder={t('password')}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
            >
              {t('login')}
            </button>
          </form>
        </div>
      </div>
      <footer>Copyright © 2025 Biosystems Indonesia</footer>
    </>
  );
}
