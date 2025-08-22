"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const lastScrollY = useRef(0);

  // ✅ Theme toggle effect (ใช้ classList แทน className)
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [theme]);

  // ✅ Scroll hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Check login & admin status
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const adminStatus = localStorage.getItem("isAdminConfirmed") === "true";
    setIsLoggedIn(loginStatus);
    setIsAdmin(adminStatus);
  }, [pathname]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdminConfirmed");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/"; // redirect กลับหน้าแรก
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg shadow-sm ${
          theme === "dark" ? "navbar-dark bg-black" : "navbar-light bg-light"
        } ${showNavbar ? "nav-visible" : "nav-hidden"}`}
      >
        <div className="container">
          {/* LOGO */}
          <Link
            href="/"
            className="navbar-brand fw-bold d-flex align-items-center gap-2 text-danger"
          >
            <img
              src={theme === "dark" ? "/images/logo/1.png" : "/images/logo/2.png"}
              alt="Logo"
              width={180}
              height={100}
            />
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAVBAR MENU */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${
                    pathname === "/" ? "active fw-bold text-danger" : "nav-link-hover"
                  }`}
                >
                  Home
                </Link>
              </li>

              {/* DROPDOWN */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle nav-link-hover btn btn-link"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  Information
                </button>
                <ul className="dropdown-menu shadow-sm rounded-3 border-0">
                  {[
                    { href: "/information/team", label: "Team", icon: "bi-people-fill" },
                    { href: "/information/rider", label: "Rider", icon: "bi-person-bounding-box" },
                    { href: "/information/car", label: "Car", icon: "bi-truck-front-fill" },
                    { href: "/information/manager", label: "Manager", icon: "bi-person-gear" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`dropdown-item dropdown-item-hover ${
                          pathname === item.href ? "active text-danger fw-bold" : ""
                        }`}
                      >
                        <i className={`bi ${item.icon} me-2`}></i>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="/standings"
                  className={`nav-link ${
                    pathname === "/standings" ? "active fw-bold text-danger" : "nav-link-hover"
                  }`}
                >
                  Standings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/register"
                  className={`nav-link ${
                    pathname === "/register" ? "active fw-bold text-danger" : "nav-link-hover"
                  }`}
                >
                  Register
                </Link>
              </li>
            </ul>

            {/* RIGHT MENU */}
            <div className="d-flex align-items-center gap-3">
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                title="Toggle Theme"
              >
                {theme === "dark" ? (
                  <>
                    <i className="bi bi-sun-fill fs-5 text-warning"></i>
                    <span className="d-none d-md-inline fw-semibold">Light</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-moon-stars-fill fs-5 text-danger"></i>
                    <span className="d-none d-md-inline fw-semibold">Dark</span>
                  </>
                )}
              </button>

              {/* ADMIN */}
              {isLoggedIn && isAdmin && (
                <Link
                  href="/admin/users"
                  className="btn btn-warning btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill"
                >
                  <i className="bi bi-shield-lock-fill fs-5"></i>
                  <span className="d-none d-md-inline">Admin</span>
                </Link>
              )}

              {/* LOGIN / LOGOUT */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill"
                >
                  <i className="bi bi-box-arrow-right fs-5"></i>
                  <span className="d-none d-md-inline">Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-danger btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill"
                >
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                  <span className="d-none d-md-inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* STYLES */}
      <style jsx>{`
        .nav-link-hover {
          color: inherit;
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .nav-link-hover:hover {
          color: #dc3545;
          transform: scale(1.05);
          text-shadow: 0 0 8px rgba(220, 53, 69, 0.6);
        }

        .dropdown-item-hover {
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .dropdown-item-hover:hover {
          background-color: #dc3545;
          color: white;
          font-weight: 600;
        }

        nav.navbar {
          transition: background-color 0.4s ease, transform 0.3s ease, opacity 0.3s ease;
          backdrop-filter: saturate(180%) blur(10px);
          -webkit-backdrop-filter: saturate(180%) blur(10px);
          position: sticky;
          top: 0;
          z-index: 9999;
        }

        .nav-hidden {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .nav-visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}
