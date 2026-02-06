"use client";

import RoundEarthLogo from "@/presentation/components/icon/RoundEarth.svg";
import LoginLogo from "@/presentation/components/icon/Login.svg";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import "./header.css";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import axios from "axios";

type NavItem = {
  href: string;
  label: string;
};

type HeaderProps = {
  backgroundColor?: string;
};

interface CurrentUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

export default function Header({ backgroundColor = "transparent" }: HeaderProps) {
  const t = useTranslations("Header");
  const [langOpen, setLangOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const languageRef = useRef<HTMLDivElement>(null);
  const languageRefBottom = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLLIElement>(null);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node) &&
        languageRefBottom.current &&
        !languageRefBottom.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }

    if (langOpen || productsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langOpen, productsOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  const getScrolledColor = () => {
    if (pathname.includes("/clinical-analysis")) {
      return "#FF5A00";
    } else if (pathname.includes("/food-beverage-analysis")) {
      return "#d3d92b";
    } else if (pathname.includes("/instrument")) {
      return "#FF5A00";
    } else {
      return "var(--primary)";
    }
  };

  const headerStyle = {
    backgroundColor: isScrolled ? getScrolledColor() : backgroundColor,
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    transition: "all 0.3s ease",
  };

  const textColorClass = isScrolled ? "text-dark" : "";

  const navItems = (locale: string): NavItem[] => [
    // { href: `/${locale}/career`, label: "career" },
    { href: `/${locale}/clinical-analysis`, label: "reagents" },
    { href: `/${locale}/instrument`, label: "instruments" },
    { href: `/${locale}/article`, label: "article" },
    { href: `/${locale}#about`, label: "about" },
    { href: `/${locale}#contact-us`, label: "contact-us" },
  ];

  return (
    <header style={headerStyle} className={`${textColorClass} header`}>
      <div className={`layout ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}></div>
      <div className={`header-up ${isScrolled ? "hidden" : ""}`}>
        <a href={`/${locale}`}>
          <h2 className="logo">BioSystems</h2>
        </a>
        <div className="items">
          <div ref={languageRef} style={{ position: "relative" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setLangOpen(!langOpen);
              }}
            >
              <RoundEarthLogo />
              <p>{t("language")}</p>
            </div>
            <div className={`language-card ${langOpen ? "lang-open" : ""}`}>
              <span
                onClick={() => {
                  const newPath = pathname.replace(`/${locale}`, "/id");
                  window.location.href = newPath;
                  setLangOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                Indonesia
              </span>
              <span
                onClick={() => {
                  const newPath = pathname.replace(`/${locale}`, "/en");
                  window.location.href = newPath;
                  setLangOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                English
              </span>
            </div>
          </div>

          {currentUser ? (
            <div
              className=""
              onClick={() => router.push("/dashboard/products")}
              style={{ cursor: "pointer" }}
            >
              <div className="user-info">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-role">{currentUser.role}</div>
              </div>
              <div className="icon-card">
                <FaUser />
              </div>
            </div>
          ) : (
            <div
              onClick={() => (window.location.href = `/${locale}/login`)}
              style={{ cursor: "pointer" }}
            >
              <LoginLogo />
              <p>{t("login")}</p>
            </div>
          )}
        </div>
        <div
          className={`hamburger-menu ${isOpen ? "is-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
      </div>
      <div
        className={`header-bottom ${isScrolled ? "move-up" : ""}`}
        style={isOpen ? { transform: "translateX(0)" } : {}}
      >
        <ul>
          {navItems(locale).map((item, index) => {
            const isProductsItem = item.label === "products";
            const isOnProductPage =
              pathname.includes("/clinical-analysis") ||
              pathname.includes("/food-beverage-analysis") ||
              pathname.includes("/instrument");

            let shouldBeActive = false;
            if (isProductsItem) {
              shouldBeActive = isOnProductPage || (productsOpen && isDesktop);
            } else {
              shouldBeActive =
                pathname === item.href || pathname === `/${locale}${item.href.replace(locale, "")}`;
            }

            return (
              <li
                key={index}
                ref={isProductsItem ? productsRef : null}
                className={shouldBeActive ? "active" : ""}
                onClick={() => {
                  if (isProductsItem && isDesktop) {
                    setProductsOpen(!productsOpen);
                  } else {
                    window.location.href = item.href;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            );
          })}
          <div className="items">
            <div ref={languageRefBottom} style={{ position: "relative" }}>
              {/* <div style={{ cursor: "pointer" }} onClick={() => { setLangOpen(!langOpen) }}>
                                <RoundEarthLogo />
                                <p>{t("language")}</p>
                            </div> */}
              <div
                className={`language-card ${langOpen ? "lang-open" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  marginBottom: 10,
                }}
              >
                <span
                  onClick={() => {
                    const newPath = pathname.replace(`/${locale}`, "/id");
                    window.location.href = newPath;
                    setLangOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Indonesia
                </span>
                <span
                  onClick={() => {
                    const newPath = pathname.replace(`/${locale}`, "/en");
                    window.location.href = newPath;
                    setLangOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  English
                </span>
              </div>
            </div>
            {currentUser ? (
              <div
                className="user-info"
                onClick={() => router.push("/dashboard")}
                style={{ cursor: "pointer" }}
              >
                <div className="user-name">{currentUser.name}</div>
                <div className="user-role">{currentUser.role}</div>
              </div>
            ) : (
              <div onClick={() => (window.location.href = `/${locale}/login`)}>
                <LoginLogo />
                <p>{t("login")}</p>
              </div>
            )}
          </div>
        </ul>
        <div className={`floating-products ${productsOpen ? "open" : ""}`}>
          <Link href="/instrument">Instruments</Link>
          <Link href="/clinical-analysis" target="_blank">
            Reagents
          </Link>
        </div>
      </div>
    </header>
  );
}
