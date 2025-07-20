"use client";

import { useState } from "react";
import Head from "next/head";

export default function MotoGPAuth() {
  const [isLogin, setIsLogin] = useState(true);

  function toggleForms() {
    setIsLogin((prev) => !prev);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    alert("🏁 Welcome back to the racing championship!");
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    alert("🏆 Welcome to MotoGP Championship! Your racing career starts now!");
  }

  return (
    <>
      <Head>
        <title>MotoGP Racing - Authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        /* ใส่ CSS ตามเดิม */
        :root {
          --motogp-red: #dc143c;
          --motogp-blue: #0066cc;
          --motogp-black: #0f0f0f;
          --motogp-white: #ffffff;
          --motogp-gray: #1f1f1f;
          --motogp-dark-red: #8b0000;
          --motogp-dark-blue: #003d7a;
          --racing-gradient: linear-gradient(135deg, #dc143c 0%, #0066cc 50%, #000000 100%);
          --track-gradient: linear-gradient(90deg, #0f0f0f 0%, #1f1f1f 50%, #0f0f0f 100%);
          --accent-gradient: linear-gradient(45deg, #dc143c 0%, #0066cc 100%);
          --motogp-yellow: #ffd700;
        }
        body {
          font-family: 'Rajdhani', sans-serif;
          background: var(--track-gradient);
          min-height: 100vh;
          margin: 0;
          padding: 0;
          color: var(--motogp-white);
          overflow-x: hidden;
          position: relative;
        }
        .auth-container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .auth-card {
          background: rgba(15, 15, 15, 0.95);
          border-radius: 20px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
          box-shadow: 
              0 20px 40px rgba(220, 20, 60, 0.4),
              0 0 0 1px rgba(0, 102, 204, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.8s ease-out;
          border: 2px solid transparent;
          background-clip: padding-box;
          color: var(--motogp-white);
        }
        @keyframes slideUp {
          from {
              opacity: 0;
              transform: translateY(50px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
        }
        .speed-indicator {
          position: absolute;
          top: 20px;
          right: 20px;
          font-family: 'Orbitron', monospace;
          font-size: 0.9rem;
          color: var(--motogp-yellow);
          opacity: 0.7;
        }
        .motogp-logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .motogp-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 2.5rem;
          background: var(--racing-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 10px;
          animation: titleGlow 3s ease-in-out infinite;
        }
        @keyframes titleGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        .racing-subtitle {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }
        .form-control {
          background: rgba(31, 31, 31, 0.9);
          border: 2px solid rgba(0, 102, 204, 0.4);
          color: var(--motogp-white);
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          padding: 15px 20px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          background: rgba(31, 31, 31, 1);
          border-color: var(--motogp-red);
          box-shadow: 0 0 20px rgba(220, 20, 60, 0.4);
          color: var(--motogp-white);
        }
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-group-text {
          background: var(--motogp-red);
          border: 2px solid var(--motogp-red);
          color: var(--motogp-white);
          border-radius: 10px 0 0 10px;
        }
        .btn-racing {
          background: var(--racing-gradient);
          border: none;
          color: var(--motogp-white);
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 1.2rem;
          padding: 15px 30px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 2px;
          width: 100%;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-racing:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(225, 6, 0, 0.4);
          filter: brightness(1.1);
        }
        .btn-switch {
          background: transparent;
          border: 2px solid var(--motogp-yellow);
          color: var(--motogp-yellow);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          padding: 10px 25px;
          border-radius: 25px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          margin-top: 20px;
          cursor: pointer;
        }
        .btn-switch:hover {
          background: var(--motogp-yellow);
          color: var(--motogp-black);
          transform: scale(1.05);
        }
        .racing-divider {
          height: 2px;
          background: var(--racing-gradient);
          margin: 30px 0;
          border-radius: 2px;
        }
        .social-login {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .social-btn {
          flex: 1;
          padding: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(44, 44, 44, 0.6);
          color: var(--motogp-white);
          border-radius: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .social-btn:hover {
          border-color: var(--motogp-yellow);
          background: rgba(255, 215, 0, 0.1);
          color: var(--motogp-white);
          transform: translateY(-2px);
        }
        .form-check-input {
          background: rgba(44, 44, 44, 0.8);
          border: 2px solid rgba(255, 215, 0, 0.3);
        }
        .form-check-input:checked {
          background-color: var(--motogp-yellow);
          border-color: var(--motogp-yellow);
        }
        .form-check-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }
        @media (max-width: 576px) {
          .auth-card {
            padding: 30px 20px;
            margin: 10px;
          }
          .motogp-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="speed-indicator">
            <i className="bi bi-speedometer2"></i> MAX SPEED
          </div>

          <div className="motogp-logo">
            <div className="motogp-title">MotoGP</div>
            <div className="racing-subtitle">Racing Championship</div>
          </div>

          {isLogin ? (
            <form id="loginForm" onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input type="email" className="form-control" placeholder="Racing Email" required />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock-fill"></i>
                  </span>
                  <input type="password" className="form-control" placeholder="Secret Password" required />
                </div>
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember my racing profile
                </label>
              </div>

              <button type="submit" className="btn btn-racing">
                <i className="bi bi-flag-fill me-2"></i>
                Start Racing
              </button>

              <div className="racing-divider"></div>

              <div className="social-login">
                <a href="#" className="social-btn">
                  <i className="bi bi-google"></i>
                  Google
                </a>
                <a href="#" className="social-btn">
                  <i className="bi bi-facebook"></i>
                  Facebook
                </a>
              </div>

              <div className="text-center mt-4">
                <span className="text-muted">New to MotoGP Racing? </span>
                <button type="button" className="btn-switch" onClick={toggleForms}>
                  Join the Championship
                </button>
              </div>
            </form>
          ) : (
            <form id="registerForm" onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-badge-fill"></i>
                  </span>
                  <input type="text" className="form-control" placeholder="Racing Name" required />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input type="email" className="form-control" placeholder="Racing Email" required />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock-fill"></i>
                  </span>
                  <input type="password" className="form-control" placeholder="Secret Password" required />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-shield-check-fill"></i>
                  </span>
                  <input type="password" className="form-control" placeholder="Confirm Password" required />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-motorcycle"></i>
                  </span>
                  <select className="form-control" required>
                    <option value="">Choose your favorite team</option>
                    <option value="ducati">Ducati</option>
                    <option value="yamaha">Yamaha</option>
                    <option value="honda">Honda</option>
                    <option value="suzuki">Suzuki</option>
                    <option value="ktm">KTM</option>
                    <option value="aprilia">Aprilia</option>
                  </select>
                </div>
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the Racing Terms & Conditions
                </label>
              </div>

              <button type="submit" className="btn btn-racing">
                <i className="bi bi-trophy-fill me-2"></i>
                Join Championship
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">Already a racer? </span>
                <button type="button" className="btn-switch" onClick={toggleForms}>
                  Back to Track
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
