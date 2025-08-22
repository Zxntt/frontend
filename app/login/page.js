'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';
import './login.css';   // ✅ import CSS แยกไฟล์

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user?.isAdmin) router.replace('/admin/users');
      else router.replace('/');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      Swal.fire({ icon: 'warning', title: 'กรุณากรอกข้อมูล', text: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
      return;
    }

    setIsLoading(true);
    Swal.fire({
      title: 'กำลังเข้าสู่ระบบ...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      if (formData.username === 'admin' && formData.password === '1234') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username: formData.username, isAdmin: true }));
        Swal.close();
        await Swal.fire({ icon: 'success', title: 'เข้าสู่ระบบสำเร็จ!', text: `ยินดีต้อนรับ ${formData.username}`, timer: 2000, showConfirmButton: false });
        router.replace('/admin/users');
        return;
      }

      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username: data.username || formData.username, isAdmin: data.isAdmin || false }));

        Swal.close();
        await Swal.fire({ icon: 'success', title: 'เข้าสู่ระบบสำเร็จ!', text: `ยินดีต้อนรับ ${data.username || formData.username}`, timer: 2000, showConfirmButton: false });
        if (data.isAdmin) router.replace('/admin/users');
        else router.replace('/');
      } else {
        Swal.fire({ icon: 'error', title: '❌ ล็อกอินไม่สำเร็จ', text: data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({ icon: 'error', title: '❌ เกิดข้อผิดพลาด', text: 'ไม่สามารถเข้าสู่ระบบได้ โปรดลองใหม่' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      <div className="login-card">
        <div className="card-header">
          <div className="avatar"><div className="avatar-inner">🔑</div></div>
          <h1>เข้าสู่ระบบ</h1>
          <p>เข้าสู่บัญชีของคุณ</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <div className="input-container">
              <div className="input-icon">👤</div>
              <input type="text" name="username" placeholder="ชื่อผู้ใช้"
                value={formData.username} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <div className="input-icon">🔒</div>
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="รหัสผ่าน"
                value={formData.password} onChange={handleInputChange} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="divider-section">
          <div className="divider-line"></div>
          <span className="divider-text">หรือ</span>
          <div className="divider-line"></div>
        </div>

        <div className="action-buttons">
          <Link href="/register" className="action-btn primary">สร้างบัญชีใหม่</Link>
          <Link href="/" className="action-btn secondary">กลับหน้าหลัก</Link>
        </div>
      </div>
    </div>
  );
}
