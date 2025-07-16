<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Login - Mogto GP</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #000000, #0a0a23);
      font-family: 'Orbitron', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
    }

    .login-box {
      background: #111;
      border: 2px solid #ff003c;
      box-shadow: 0 0 30px #007bff88, 0 0 15px #ff003c88;
      padding: 40px;
      border-radius: 15px;
      width: 320px;
      text-align: center;
    }

    .login-box h2 {
      color: #fff;
      margin-bottom: 30px;
      font-size: 28px;
      text-shadow: 0 0 10px #007bff;
    }

    .login-box input[type="text"],
    .login-box input[type="password"] {
      background: #000;
      border: 1px solid #444;
      outline: none;
      padding: 10px;
      margin: 10px 0;
      width: 100%;
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
    }

    .login-box input[type="text"]:focus,
    .login-box input[type="password"]:focus {
      border: 1px solid #007bff;
      box-shadow: 0 0 10px #007bff66;
    }

    .login-box button {
      background: linear-gradient(90deg, #ff003c, #007bff);
      border: none;
      color: #fff;
      padding: 12px;
      width: 100%;
      margin-top: 20px;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .login-box button:hover {
      box-shadow: 0 0 15px #ff003c, 0 0 15px #007bff;
    }

    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }

  </style>
</head>
<body>
  <div class="login-box">
    <h2>MOGTO GP LOGIN</h2>
    <form>
      <input type="text" placeholder="ชื่อผู้ใช้" required>
      <input type="password" placeholder="รหัสผ่าน" required>
      <button type="submit">เข้าสู่ระบบ</button>
    </form>
    <div class="footer">© 2025 Mogto GP</div>
  </div>
</body>
</html>
