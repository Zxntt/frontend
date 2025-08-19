"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-black text-white" : "bg-light text-dark";
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // เลื่อนลง ให้ซ่อน navbar
        setShowNavbar(false);
      } else {
        // เลื่อนขึ้น ให้แสดง navbar
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg shadow-sm sticky-top ${
          theme === "dark" ? "navbar-dark bg-black" : "navbar-light bg-light"
        } ${showNavbar ? "nav-visible" : "nav-hidden"}`}
      >
        <div className="container">
          {/* LOGO */}
          <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2 text-danger">
            <img
              src={theme === "dark" ? "/images/logo/1.png" : "/images/logo/2.png"}
              alt="MotoGP Logo"
              width={200}
              height={120}
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
                  className={`nav-link ${pathname === "/" ? "active fw-bold text-danger" : "nav-link-hover"}`}
                >
                  Home
                </Link>
              </li>

              {/* DROPDOWN: INFORMATION */}
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
                  <li>
                    <Link
                      href="/information/team"
                      className={`dropdown-item dropdown-item-hover ${
                        pathname === "/information/team" ? "active text-danger fw-bold" : ""
                      }`}
                    >
                      <i className="bi bi-people-fill me-2"></i> Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/information/rider"
                      className={`dropdown-item dropdown-item-hover ${
                        pathname === "/information/rider" ? "active text-danger fw-bold" : ""
                      }`}
                    >
                      <i className="bi bi-person-bounding-box me-2"></i> Rider
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/information/car"
                      className={`dropdown-item dropdown-item-hover ${
                        pathname === "/information/car" ? "active text-danger fw-bold" : ""
                      }`}
                    >
                      <i className="bi bi-truck-front-fill me-2"></i> Car
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/information/manager"
                      className={`dropdown-item dropdown-item-hover ${
                        pathname === "/information/manager" ? "active text-danger fw-bold" : ""
                      }`}
                    >
                      <i className="bi bi-person-gear me-2"></i> Manager
                    </Link>
                  </li>
                </ul>
              </li>
              
                {/* STANDINGS */}
  <li className="nav-item">
    <Link
      href="/standings"
      className={`nav-link ${pathname === "/standings" ? "active fw-bold text-danger" : "nav-link-hover"}`}
    >
      Standings
    </Link>
  </li>

              {/* REGISTER */}
              <li className="nav-item">
                <Link
                  href="/register"
                  className={`nav-link ${pathname === "/register" ? "active fw-bold text-danger" : "nav-link-hover"}`}
                >
                  Register
                </Link>
              </li>
            </ul>

            {/* RIGHT MENU: TOGGLE + ADMIN + LOGIN */}
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
                    <span className="d-none d-md-inline fw-semibold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-moon-stars-fill fs-5 text-danger"></i>
                    <span className="d-none d-md-inline fw-semibold">Dark Mode</span>
                  </>
                )}
              </button>

              {/* ADMIN BUTTON */}
              <Link
                href="/admin/users"
                className="btn btn-warning btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill"
              >
                <i className="bi bi-gear-fill fs-5"></i>
                <span className="d-none d-md-inline">Admin</span>
              </Link>

              {/* LOGIN BUTTON */}
              <Link
                href="/login"
                className="btn btn-danger btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill"
              >
                <i className="bi bi-box-arrow-in-right fs-5"></i>
                <span className="d-none d-md-inline">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
