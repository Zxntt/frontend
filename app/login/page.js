"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Head from "next/head";
import "./login.css";

export default function MotoGPAuth() {
  const [isLogin, setIsLogin] = useState(true);

  // Register form state
  const [firstname, setFirstname] = useState("");
  const [fullname, setFullname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function toggleForms() {
    setIsLogin((prev) => !prev);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "🏁 Welcome back!",
      text: "You are now logged in to MotoGP Racing!",
    });
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          fullname,
          lastname,
          username,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ!",
          text: "ยินดีต้อนรับเข้าสู่ MotoGP Championship!",
        });
        setIsLogin(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: result.message || "ไม่สามารถสมัครสมาชิกได้",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
      });
    }
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
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Racing Email"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-racing">
                <i className="bi bi-flag-fill me-2"></i> Start Racing
              </button>

              <div className="racing-divider"></div>

              <div className="social-login">
                <a href="#" className="social-btn">
                  <i className="bi bi-google"></i> Google
                </a>
                <a href="#" className="social-btn">
                  <i className="bi bi-facebook"></i> Facebook
                </a>
              </div>

              <div className="text-center mt-4">
                <span className="text-muted">New to MotoGP Racing? </span>
                <button
                  type="button"
                  className="btn-switch"
                  onClick={toggleForms}
                >
                  Join the Championship
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="คำนำหน้า"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ชื่อ"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="นามสกุล"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ชื่อผู้ใช้ (Username)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-racing">
                <i className="bi bi-trophy-fill me-2"></i> สมัครสมาชิก
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">Already a racer? </span>
                <button
                  type="button"
                  className="btn-switch"
                  onClick={toggleForms}
                >
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
