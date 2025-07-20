"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-black text-white" : "bg-light text-dark";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm sticky-top ${
        theme === "dark" ? "navbar-dark bg-black" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2 text-danger">
          <img
            src={theme === "dark" ? "/images/logo/1.png" : "/images/logo/2.png"}
            alt="MotoGP Logo"
            width={200}
            height={120}
          />
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active fw-bold text-danger" : "nav-link-hover"}`}
              >
                Home
              </Link>
            </li>

            {/* Dropdown Menu: Marketing */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle nav-link-hover"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Information
              </a>
              <ul className="dropdown-menu shadow-sm rounded-3 border-0">
                <li>
                  <Link href="/marketing/Team" className="dropdown-item dropdown-item-hover">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/marketing/Rider" className="dropdown-item dropdown-item-hover">
                    Rider
                  </Link>
                </li>
                <li>
                  <Link href="/marketing/Car" className="dropdown-item dropdown-item-hover">
                    Car
                  </Link>
                </li>
                <li>
                  <Link href="/marketing/Manager" className="dropdown-item dropdown-item-hover">
                    Manager
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                href="/register"
                className={`nav-link ${pathname === "/register" ? "active fw-bold text-danger" : "nav-link-hover"}`}
              >
                Register
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <>
                  <i className="bi bi-sun-fill fs-5 text-warning"></i>
                  <span className="d-none d-md-inline fw-semibold">Light Mode</span>
                </>
              ) : (
                <>
                  <i className="bi bi-moon-stars-fill fs-5 text-danger"></i>
                  <span className="d-none d-md-inline fw-semibold">Dark Mode</span>
                </>
              )}
            </button>

            <Link href="/login" className="btn btn-danger btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill">
              <i className="bi bi-box-arrow-in-right fs-5"></i> <span className="d-none d-md-inline">Login</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link-hover {
          color: inherit;
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .nav-link-hover:hover {
          color: #420107ff;
          transform: scale(1.05);
          text-shadow: 0 0 8px #420107ff;
        }

        .dropdown-item-hover {
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .dropdown-item-hover:hover {
          background-color: #420107ff;
          color: white;
          font-weight: 600;
        }

        nav.navbar {
          transition: background-color 0.4s ease;
          backdrop-filter: saturate(180%) blur(10px);
          -webkit-backdrop-filter: saturate(180%) blur(10px);
          background-color: var(--bs-navbar-bg) !important;
        }
      `}</style>
    </nav>
  );
}
