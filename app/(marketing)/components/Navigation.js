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
  const [user, setUser] = useState(null);
  const lastScrollY = useRef(0);

  const [openDropdown, setOpenDropdown] = useState(null); // 'profile' | null

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
        setOpenDropdown(null);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const adminStatus = localStorage.getItem("isAdminConfirmed") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    setIsLoggedIn(loginStatus);
    setIsAdmin(adminStatus);
    if (storedUser) {
      setUser(storedUser);
    }
  }, [pathname]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdminConfirmed");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    window.location.href = "/";
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
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
          >
            <i className="bi bi-bell-fill fs-4 text-accent"></i>
            <span className="brand-text">SmartDoorBell</span>
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
                    pathname === "/" ? "active fw-bold text-accent" : "nav-link-hover"
                  }`}
                >
                  Live
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/information/history"
                  className={`nav-link ${
                    pathname === "/information/history" ? "active fw-bold text-accent" : "nav-link-hover"
                  }`}
                >
                  History
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/information/setting"
                  className={`nav-link ${
                    pathname === "/information/setting" ? "active fw-bold text-accent" : "nav-link-hover"
                  }`}
                >
                  Settings
                </Link>
              </li>
            </ul>

            {/* RIGHT MENU */}
            <div className="d-flex align-items-center gap-3">
              {/* CAMERA STATUS */}
              <div className="d-flex align-items-center gap-2 status-badge">
                <span className="status-dot"></span>
                <span className="d-none d-md-inline">Online</span>
              </div>

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="btn btn-outline-accent btn-sm d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <>
                    <i className="bi bi-sun-fill fs-6"></i>
                    <span className="d-none d-md-inline fw-semibold">Light</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-moon-stars-fill fs-6"></i>
                    <span className="d-none d-md-inline fw-semibold">Dark</span>
                  </>
                )}
              </button>

              {/* LOGIN / PROFILE */}
              {isLoggedIn ? (
                <div className="dropdown dropdown-container">
                  <button
                    className={`btn btn-profile d-flex align-items-center gap-2 px-3 py-1 rounded-pill dropdown-toggle ${
                      openDropdown === "profile" ? "show" : ""
                    }`}
                    onClick={() => toggleDropdown("profile")}
                  >
                    <div className="profile-avatar d-flex justify-content-center align-items-center fw-bold">
                      {user?.username ? user.username[0].toUpperCase() : "U"}
                    </div>
                    <span className="d-none d-md-inline fw-semibold">
                      {user?.username || "User"}
                    </span>
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-end profile-menu ${
                      openDropdown === "profile" ? "show" : ""
                    }`}
                    style={{ marginTop: "10px" }}
                  >
                    <li>
                      <div className="dropdown-item-text d-flex align-items-center gap-2">
                        <div className="profile-avatar d-flex justify-content-center align-items-center fw-bold">
                          {user?.username ? user.username[0].toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="fw-bold">{user?.username || "User"}</div>
                          <small className="text-muted">Camera owner</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-primary fw-semibold"
                        onClick={() => {
                          setOpenDropdown(null);
                          window.location.href = "/admin/users";
                        }}
                      >
                        <i className="bi bi-speedometer2 me-2"></i>
                        เข้าสู่หน้าระบบจัดการ
                      </button>
                      <button
                        className="dropdown-item text-danger fw-semibold"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-login fw-semibold d-flex align-items-center gap-2 px-3 py-1"
                >
                  <i className="bi bi-box-arrow-in-right fs-6"></i>
                  <span className="fw-bold">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* STYLES */}
      <style jsx>{`
        .text-accent {
          color: #2563eb !important;
        }

        .nav-link-hover {
          color: inherit;
          transition: color 0.2s ease;
        }
        .nav-link-hover:hover {
          color: #2563eb;
        }

        nav.navbar {
          transition: background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
          position: sticky;
          top: 0;
          z-index: 9999;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

        .brand-text {
          letter-spacing: 0.2px;
        }

        .status-badge {
          font-size: 0.85rem;
          color: #4ade80;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
        }

        .btn-outline-accent {
          border: 1px solid rgba(37, 99, 235, 0.4);
          color: inherit;
          background: transparent;
        }
        .btn-outline-accent:hover {
          background: rgba(37, 99, 235, 0.1);
        }

        .btn-login {
          background: #2563eb;
          border: none;
          color: #fff !important;
          font-weight: 600;
          border-radius: 8px;
          padding: 0.5rem 1.2rem;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-login:hover {
          background: #1d4ed8;
        }

        .btn-profile {
          background: transparent;
          border: 1px solid rgba(37, 99, 235, 0.4);
          color: inherit;
          transition: background 0.2s ease;
        }
        .btn-profile:hover {
          background: rgba(37, 99, 235, 0.1);
        }

        .profile-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          font-size: 0.85rem;
        }

        .profile-menu {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </>
  );
}