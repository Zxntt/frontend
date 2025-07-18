"use client";
export default function Footer() {
  return (
    <footer className="py-4 border-top mt-5 bg-dark text-light">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} <strong className="text-danger">MyBrand</strong>. All rights reserved.
        </p>
        <div className="d-flex justify-content-center gap-4 fs-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-decoration-none text-primary"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-decoration-none text-info"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="text-decoration-none text-light"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>

      <style jsx>{`
        footer {
          background-color: #111;
          box-shadow: inset 0 1px 5px rgba(255, 75, 43, 0.3);
          color: #eee;
        }
        a.text-decoration-none:hover i {
          transform: scale(1.3);
          color: #ff4b2b;
          transition: transform 0.3s ease, color 0.3s ease;
        }
      `}</style>
    </footer>
  );
}
