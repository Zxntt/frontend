"use client";

import { useState } from "react";
import Head from "next/head";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Start Racing");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setButtonText("Starting Engine...");

    setTimeout(() => {
      setButtonText("Welcome Champion!");
      setTimeout(() => {
        alert("🏁 Welcome back to the MotoGP Racing Championship!\n\nRedirecting to your dashboard...");
        setLoading(false);
        setButtonText("Start Racing");
      }, 1500);
    }, 2000);
  };

  const handleSocialClick = (platform) => {
    alert(`🚀 Redirecting to ${platform} login...\n\nYou'll be back on the track in seconds!`);
  };

  return (
    <>
      <Head>
        <title>MotoGP Racing - Login</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
        <div className="p-5 rounded shadow-lg" style={{ maxWidth: 500, width: "100%", background: "#1f1f1f" }}>
          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ fontFamily: "Orbitron, sans-serif", color: "#dc143c" }}>MotoGP</h1>
            <p className="text-secondary">Racing Championship</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Racing Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                <input type="email" className="form-control" id="email" required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-shield-lock-fill"></i></span>
                <input type="password" className="form-control" id="password" required />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("🔐 Recovery email sent!"); }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-danger w-100" disabled={loading}>
              {buttonText}
            </button>
          </form>

          <div className="text-center my-3 text-muted">OR</div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-light w-50"
              onClick={() => handleSocialClick("Google")}
            >
              <i className="bi bi-google"></i> Google
            </button>
            <button
              className="btn btn-outline-light w-50"
              onClick={() => handleSocialClick("Facebook")}
            >
              <i className="bi bi-facebook"></i> Facebook
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-muted">New to MotoGP Racing? </span>
            <a href="#" className="text-primary">Join the Championship Now</a>
          </div>
        </div>
      </div>
    </>
  );
}
