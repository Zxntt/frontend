"use client";

import Head from "next/head";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register - Mogto GP</title>
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="register-box">
        <h2>🏁 MOGTO GP REGISTER 🏁</h2>
        <form>
          <input type="text" placeholder="ชื่อผู้ใช้" required />
          <input type="email" placeholder="อีเมล" required />
          <input type="password" placeholder="รหัสผ่าน" required />
          <input type="password" placeholder="ยืนยันรหัสผ่าน" required />
          <button type="submit">สมัครสมาชิก</button>
        </form>
        <div className="footer">© 2025 Mogto GP</div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #05091f, #000000);
          font-family: 'Orbitron', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          color: #eee;
        }

        .register-box {
          background: linear-gradient(145deg, #0d0d20, #12122f);
          border: 3px solid #ff003c;
          box-shadow:
            0 0 25px #001a99cc,
            0 0 30px #ff003ccc,
            inset 0 0 20px #ff003c99;
          padding: 50px 40px;
          border-radius: 20px;
          width: 360px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .register-box::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background:
            radial-gradient(circle at center, #ff003cbb, transparent 70%),
            radial-gradient(circle at center, #001a99bb, transparent 70%);
          animation: pulse 4s infinite alternate;
          z-index: 0;
          border-radius: 20px;
          filter: blur(30px);
        }

        @keyframes pulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        .register-box * {
          position: relative;
          z-index: 1;
        }

        .register-box h2 {
          margin-bottom: 30px;
          font-size: 32px;
          text-shadow: 0 0 20px #ff003c, 0 0 30px #001a99;
          letter-spacing: 2px;
          color: #ff003c;
          font-weight: 700;
        }

        form input[type='text'],
        form input[type='email'],
        form input[type='password'] {
          background: #0a0a1f;
          border: 2px solid #001a66;
          outline: none;
          padding: 14px 15px;
          margin: 14px 0;
          width: 100%;
          border-radius: 12px;
          color: #eee;
          font-size: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-family: 'Orbitron', monospace;
          box-shadow: inset 0 0 12px #000022;
        }

        form input[type='text']:focus,
        form input[type='email']:focus,
        form input[type='password']:focus {
          border-color: #ff003c;
          box-shadow:
            0 0 15px #ff003cbb,
            inset 0 0 18px #ff003ccc;
          background: #121234;
        }

        form button {
          background: linear-gradient(90deg, #ff003c, #001a99);
          border: none;
          color: white;
          padding: 16px;
          width: 100%;
          margin-top: 30px;
          font-size: 20px;
          font-weight: 700;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 2px;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          font-family: 'Orbitron', monospace;
          box-shadow: 0 0 18px #ff003c, 0 0 18px #001a99;
        }

        form button:hover {
          box-shadow:
            0 0 28px #ff003c,
            0 0 38px #001a99,
            0 0 48px #ff003c,
            0 0 58px #001a99;
          transform: scale(1.07);
        }

        .footer {
          margin-top: 30px;
          font-size: 13px;
          color: #888;
          letter-spacing: 1.2px;
          font-family: 'Orbitron', monospace;
          text-shadow: 0 0 8px #000a;
        }
      `}</style>
    </>
  );
}
