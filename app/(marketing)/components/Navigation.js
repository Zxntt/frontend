"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm sticky-top ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2 text-primary">
          <i className="bi bi-fire-fill fs-4 animate-fire"></i>
          <span>MotoGP</span>
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
              <Link href="/" className={`nav-link ${pathname === "/" ? "active fw-bold text-primary" : "nav-link-hover"}`}>
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle nav-link-hover"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                Marketing
              </a>
              <ul className="dropdown-menu shadow-sm rounded-3 border-0">
                <li>
                  <Link href="/marketing/about" className="dropdown-item dropdown-item-hover">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/marketing/service" className="dropdown-item dropdown-item-hover">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/marketing/contact" className="dropdown-item dropdown-item-hover">
                    Contact
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/register" className={`nav-link ${pathname === "/register" ? "active fw-bold text-primary" : "nav-link-hover"}`}>
                Register
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme toggle switch styled */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <>
                  <i className="bi bi-sun-fill fs-5 text-warning"></i>
                  <span className="d-none d-md-inline fw-semibold">Light Mode</span>
                </>
              ) : (
                <>
                  <i className="bi bi-moon-stars-fill fs-5 text-primary"></i>
                  <span className="d-none d-md-inline fw-semibold">Dark Mode</span>
                </>
              )}
            </button>

            <Link href="/login" className="btn btn-primary btn-sm d-flex align-items-center gap-1 fw-semibold px-3 py-1 rounded-pill">
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
          color: #ff4b2b;
          transform: scale(1.05);
          text-shadow: 0 0 8px #ff4b2b;
        }

        .dropdown-item-hover {
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .dropdown-item-hover:hover {
          background-color: #ff4b2b;
          color: white;
          font-weight: 600;
        }

        /* Fire icon flicker animation */
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-fire {
          animation: flicker 1.5s infinite;
          color: #ff4b2b;
          filter: drop-shadow(0 0 6px #ff4b2b);
        }

        /* Navbar shadow smoother */
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
