"use client";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container text-center py-4">
        {/* COPYRIGHT */}
        <p className="mb-3 fs-6">
          &copy; {new Date().getFullYear()}{" "}
          <strong className="brand-name">MyBrand</strong>. All rights reserved.
        </p>

        {/* SOCIAL ICONS */}
        <div className="social-icons d-flex justify-content-center gap-4 fs-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-link facebook"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="social-link twitter"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="social-link github"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
          color: #aaa;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          transition: background-color 0.4s ease, color 0.3s ease;
        }

        .brand-name {
          color: #dc3545; /* ใช้สีหลักเดียวกับปุ่ม/ธีม */
        }

        .social-link {
          color: #bbb;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-link:hover {
          transform: scale(1.25);
          color: #dc3545; /* default hover เป็นสีแดง theme */
        }

        .social-link.facebook:hover {
          color: #3b5998;
        }
        .social-link.twitter:hover {
          color: #1da1f2;
        }
        .social-link.github:hover {
          color: #f0f0f0;
        }

        @media (max-width: 576px) {
          .fs-4 {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
