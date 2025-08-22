'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isLoggedIn) {
      if (isAdmin === 'true') router.replace('/admin/users');
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
      // ตรวจสอบ admin local
      if (formData.username === 'admin' && formData.password === '1234') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('username', formData.username);
        Swal.close();
        await Swal.fire({ icon: 'success', title: 'เข้าสู่ระบบสำเร็จ!', text: `ยินดีต้อนรับ ${formData.username}`, timer: 2000, showConfirmButton: false });
        router.replace('/admin/users');
        return;
      }
      // กรณี user ปกติ ใช้ API
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('API response:', data);

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username || formData.username);
        localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
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
      {/* Animated geometric shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      
      <div className="login-card">
        <div className="card-header">
          <div className="avatar">
            <div className="avatar-inner">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H3C1.9 1 1 1.9 1 3V21C1 22.1 1.9 23 3 23H11.24C11.09 22.36 11 21.69 11 21C11 16.03 15.03 12 20 12C20.34 12 20.67 12.03 21 12.08V9ZM13 13V11H5V13H13ZM9 15H5V17H9.5C9.18 16.36 9 15.7 9 15ZM19 14C16.8 14 15 15.8 15 18S16.8 22 19 22 23 20.2 23 18 21.2 14 19 14ZM19 20C18.4 20 18 19.6 18 19S18.4 18 19 18 20 18.4 20 19 19.6 20 19 20Z"/>
              </svg>
            </div>
          </div>
          <h1>เข้าสู่ระบบ</h1>
          <p>เข้าสู่บัญชีของคุณ</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <div className="input-container">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
              </div>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-container">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="รหัสผ่าน"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {showPassword ? (
                    <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"/>
                  ) : (
                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                กำลังเข้าสู่ระบบ
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                </svg>
                เข้าสู่ระบบ
              </>
            )}
          </button>
        </form>
        
        <div className="divider-section">
          <div className="divider-line"></div>
          <span className="divider-text">หรือ</span>
          <div className="divider-line"></div>
        </div>
        
        <div className="action-buttons">
          <Link href="/register" className="action-btn primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"/>
            </svg>
            สร้างบัญชีใหม่
          </Link>
          <Link href="/" className="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
            </svg>
            กลับหน้าหลัก
          </Link>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .bg-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
        }
        
        .shape-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation: float 6s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 150px;
          height: 150px;
          top: 70%;
          right: 20%;
          animation: float 8s ease-in-out infinite reverse;
        }
        
        .shape-3 {
          width: 100px;
          height: 100px;
          top: 20%;
          right: 10%;
          animation: float 7s ease-in-out infinite;
        }
        
        .shape-4 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 20%;
          animation: float 9s ease-in-out infinite reverse;
        }
        
        .shape-5 {
          width: 80px;
          height: 80px;
          top: 50%;
          left: 5%;
          animation: float 5s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .login-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .avatar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .avatar-inner {
          color: rgba(255, 255, 255, 0.9);
          z-index: 1;
        }
        
        .card-header h1 {
          color: rgba(255, 255, 255, 0.95);
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .card-header p {
          color: rgba(255, 255, 255, 0.75);
          font-size: 16px;
          margin: 0;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .input-container {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .input-container:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .input-container:focus-within {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .input-icon {
          padding: 0 16px;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
        }
        
        .input-container input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 16px 8px 16px 0;
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          font-weight: 500;
        }
        
        .input-container input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .password-toggle {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          padding: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }
        
        .password-toggle:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 12px;
          padding: 16px 24px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin: 24px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .divider-section {
          display: flex;
          align-items: center;
          margin: 24px 0;
        }
        
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .divider-text {
          padding: 0 16px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        .action-btn {
          flex: 1;
          padding: 14px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .action-btn.primary {
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.95);
        }
        
        .action-btn.primary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }
        
        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
            margin: 16px;
          }
          
          .card-header h1 {
            font-size: 24px;
          }
          
          .avatar {
            width: 70px;
            height: 70px;
          }
          
          .action-buttons {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}