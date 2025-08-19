'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    birthday: '',
  });

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();

        setFormData({
          firstname: data.firstname || 'นาย',
          fullname: data.fullname || '',
          lastname: data.lastname || '',
          username: data.username || '',
          password: data.password || '',
          address: data.address || '',
          sex: data.sex || '',
          birthday: data.birthday ? data.birthday.slice(0, 10) : '',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้',
          confirmButtonColor: '#ff6b6b',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData }),
      });

      const result = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'อัปเดตข้อมูลเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: '#fff',
          color: '#333',
        });
        router.push('/admin/users');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message || 'ไม่สามารถอัปเดตข้อมูลได้',
          confirmButtonColor: '#ff6b6b',
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#ff6b6b',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>
        <style jsx>{`
          .loading-wrapper {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loading-spinner {
            text-align: center;
            color: white;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <div className="icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3 className="card-title">แก้ไขข้อมูลสมาชิก</h3>
          <p className="card-subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstname">
                <span className="label-icon">👤</span>
                คำนำหน้า
              </label>
              <div className="input-wrapper">
                <select
                  id="firstname"
                  name="firstname"
                  className="form-control select-control"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- เลือก --</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fullname">
                <span className="label-icon">✏️</span>
                ชื่อจริง
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="กรอกชื่อจริง"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastname">
                <span className="label-icon">📝</span>
                นามสกุล
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="กรอกนามสกุล"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                <span className="label-icon">🏷️</span>
                ชื่อเล่น
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="กรอกชื่อเล่น"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔐</span>
                รหัสผ่าน
              </label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">
                <span className="label-icon">🏠</span>
                ที่อยู่
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="กรอกที่อยู่"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sex">
                <span className="label-icon">⚥</span>
                เพศ
              </label>
              <div className="input-wrapper">
                <select
                  id="sex"
                  name="sex"
                  className="form-control select-control"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">-- เลือก --</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="birthday">
                <span className="label-icon">🎂</span>
                วันเกิด
              </label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  className="form-control"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button 
              type="submit" 
              className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner"></span>
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <span className="button-icon">💾</span>
                  บันทึกข้อมูล
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          top: 70%;
          left: 80%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 85%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 80%;
          left: 15%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 0;
          max-width: 700px;
          width: 100%;
          box-shadow: 
            0 25px 45px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 2;
          overflow: hidden;
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 32px;
          text-align: center;
          position: relative;
        }

        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2), transparent 50%);
          pointer-events: none;
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .card-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: 0.5px;
        }

        .card-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
          font-weight: 300;
        }

        .form-container {
          padding: 32px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          display: flex;
          align-items: center;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 16px;
          color: #4a5568;
          gap: 8px;
        }

        .label-icon {
          font-size: 18px;
        }

        .input-wrapper {
          position: relative;
        }

        .form-control {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          font-weight: 500;
          background: #fff;
          color: #2d3748;
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-control::placeholder {
          color: #a0aec0;
          font-weight: 400;
        }

        .select-control {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 16px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 48px;
        }

        .button-container {
          text-align: center;
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 48px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 
            0 10px 25px rgba(102, 126, 234, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-width: 200px;
          min-height: 56px;
        }

        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-submit:hover::before {
          left: 100%;
        }

        .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 20px 35px rgba(102, 126, 234, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .btn-submit:active {
          transform: translateY(-1px);
        }

        .btn-submit.submitting {
          pointer-events: none;
          opacity: 0.8;
        }

        .button-icon {
          font-size: 20px;
        }

        .button-spinner {
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-wrapper {
            padding: 16px;
          }

          .card {
            max-width: 100%;
          }

          .card-header {
            padding: 24px;
          }

          .card-title {
            font-size: 28px;
          }

          .form-container {
            padding: 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .form-group.full-width {
            grid-column: 1;
          }

          .btn-submit {
            padding: 16px 32px;
            font-size: 16px;
            min-width: 180px;
          }

          .shape {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .card-header {
            padding: 20px;
          }

          .card-title {
            font-size: 24px;
          }

          .form-container {
            padding: 20px;
          }

          .form-control {
            padding: 14px 16px;
            font-size: 15px;
          }

          .btn-submit {
            padding: 14px 28px;
            font-size: 15px;
            min-width: 160px;
          }
        }
      `}</style>
    </div>
  );
}