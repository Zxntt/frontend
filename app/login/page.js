"use client";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Mogto GP</title>
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="login-box">
        <h2>MOGTO GP LOGIN</h2>
        <form>
          <input type="text" placeholder="ชื่อผู้ใช้" required />
          <input type="password" placeholder="รหัสผ่าน" required />
          <button type="submit">เข้าสู่ระบบ</button>
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

        .login-box {
          background: linear-gradient(145deg, #0d0d20, #12122f);
          border: 3px solid #ff003c;
          box-shadow:
            0 0 20px #001a66cc,
            0 0 25px #ff003ccc,
            inset 0 0 15px #ff003c99;
          padding: 45px 40px;
          border-radius: 18px;
          width: 340px;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .login-box:hover {
          box-shadow:
            0 0 35px #001a99ee,
            0 0 40px #ff003cff,
            inset 0 0 20px #ff003cff;
        }

        .login-box h2 {
          color: #ff003c;
          margin-bottom: 35px;
          font-size: 32px;
          text-shadow:
            0 0 10px #ff003c,
            0 0 25px #001a99;
          letter-spacing: 1.5px;
        }

        .login-box input[type='text'],
        .login-box input[type='password'] {
          background: #0a0a1f;
          border: 1.5px solid #001a66;
          outline: none;
          padding: 12px;
          margin: 14px 0;
          width: 100%;
          border-radius: 10px;
          color: #eee;
          font-size: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: inset 0 0 10px #000022;
        }

        .login-box input[type='text']:focus,
        .login-box input[type='password']:focus {
          border-color: #ff003c;
          box-shadow:
            0 0 10px #ff003c,
            inset 0 0 15px #ff003ccc;
          background: #121234;
        }

        .login-box button {
          background: linear-gradient(90deg, #ff003c, #001a99);
          border: none;
          color: #fff;
          padding: 14px;
          width: 100%;
          margin-top: 25px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 0 15px #ff003c, 0 0 15px #001a99;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          letter-spacing: 1px;
        }

        .login-box button:hover {
          box-shadow: 0 0 25px #ff003c, 0 0 25px #001a99;
          transform: scale(1.05);
        }

        .footer {
          margin-top: 25px;
          font-size: 13px;
          color: #666;
          text-shadow: 0 0 6px #000a;
        }
      `}</style>
    </>
  );
}
