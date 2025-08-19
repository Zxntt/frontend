'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdminConfirmed = localStorage.getItem('isAdminConfirmed');

    if (isLoggedIn !== 'true') {
      router.replace('/login');
    } else if (isAdminConfirmed !== 'true') {
      router.replace('/login?confirmAdmin=true');
    } else {
      setCheckingLogin(false);
    }
  }, [router]);

  useEffect(() => {
    if (checkingLogin) return;

    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    fetchUsers();
  }, [checkingLogin]);

  const filteredItems = items.filter((item) => {
  const search = searchTerm.trim().toLowerCase();
  return (
    // ภาษาอังกฤษ
    item.firstname.toLowerCase().includes(search) ||
    item.lastname.toLowerCase().includes(search) ||
    item.username.toLowerCase().includes(search) ||
    item.fullname.toLowerCase().includes(search) || // เพิ่มชื่อเต็ม
    // ภาษาไทย
    item.firstname.includes(searchTerm) ||
    item.lastname.includes(searchTerm) ||
    item.username.includes(searchTerm) ||
    item.fullname.includes(searchTerm) || // เพิ่มชื่อเต็ม
    // id
    item.id.toString().includes(searchTerm)
  );
});



  const handleDelete = (id) => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: 'ต้องการลบข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '🗑️ ลบเลย!',
      cancelButtonText: '❌ ยกเลิก',
      customClass: {
        popup: 'animated fadeInDown faster',
        confirmButton: 'btn btn-danger mx-2',
        cancelButton: 'btn btn-secondary mx-2'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) throw new Error('Failed to delete');
          setItems((prev) => prev.filter((item) => item.id !== id));
          Swal.fire({
            title: 'ลบเรียบร้อย!',
            text: 'ข้อมูลถูกลบแล้ว',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'animated fadeInUp faster'
            }
          });
        } catch (error) {
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถลบข้อมูลได้',
            icon: 'error',
            customClass: {
              popup: 'animated shake faster'
            }
          });
          console.error(error);
        }
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบแอดมินใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '✅ ออกจากระบบ',
      cancelButtonText: '❌ ยกเลิก',
      customClass: {
        popup: 'animated pulse faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdminConfirmed');
        router.replace('/login');
      }
    });
  };

  if (checkingLogin) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
        <div className="text-center">
          <div className="spinner-grow text-light mb-3" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-white fw-bold animate__animated animate__pulse animate__infinite">
            🔐 กำลังตรวจสอบสถานะการเข้าสู่ระบบ...
          </h4>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-vh-100 bg-gradient-light">
        {/* Header Section */}
        <div className="bg-gradient-primary text-white shadow-lg">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                    <i className="fas fa-users fs-2 text-white"></i>
                  </div>
                  <div>
                    <h2 className="mb-1 fw-bold">จัดการข้อมูลผู้ใช้</h2>
                    <p className="mb-0 opacity-75">ระบบจัดการผู้ใช้งาน | Users Management System</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
  <span className="badge bg-light text-primary px-3 py-2 rounded-pill">
    👥 ทั้งหมด: {filteredItems.length} คน
  </span>

  <Link 
    href="/" 
    className="btn btn-outline-light btn-hover fw-bold px-4 py-2 rounded-pill shadow-sm"
  >
    <i className="fas fa-home me-2"></i>กลับหน้าหลัก
  </Link>

  <button 
    onClick={handleLogout} 
    className="btn btn-outline-light btn-hover-danger fw-bold px-4 py-2 rounded-pill shadow-sm"
  >
    <i className="fas fa-sign-out-alt me-2"></i>ออกจากระบบ
  </button>
</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-4">
          {/* Search Card */}
          <div className="card border-0 shadow-sm mb-4 card-hover">
            <div className="card-body bg-white rounded-3">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="position-relative">
                    <i className="fas fa-search position-absolute text-muted" style={{left: '15px', top: '50%', transform: 'translateY(-50%)'}}></i>
                    <input
                      type="text"
                      placeholder="🔍 ค้นหาจาก ชื่อ, นามสกุล, หรือ username..."
                      className="form-control form-control-lg border-0 bg-light rounded-pill ps-5 shadow-sm search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft: '50px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="card border-0 shadow-lg card-hover">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <div className="spinner-border text-primary mb-3" style={{ width: '4rem', height: '4rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <div className="d-flex justify-content-center gap-1 mb-3">
                        <div className="loading-dot bg-primary"></div>
                        <div className="loading-dot bg-primary"></div>
                        <div className="loading-dot bg-primary"></div>
                      </div>
                      <h5 className="text-primary fw-bold animate__animated animate__pulse animate__infinite">
                        📊 กำลังโหลดข้อมูลผู้ใช้...
                      </h5>
                      <p className="text-muted">กรุณารอสักครู่</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-dark text-white sticky-top">
                      <tr>
                        <th className="text-center border-0 py-3">id</th>
                        <th className="border-0 py-3">👤 ชื่อ</th>
                        <th className="border-0 py-3">📝 ชื่อเต็ม</th>
                        <th className="border-0 py-3">👥 นามสกุล</th>
                        <th className="border-0 py-3">🔐 Username</th>
                        <th className="border-0 py-3">🔑 Password</th>
                        <th className="border-0 py-3">📍 ที่อยู่</th>
                        <th className="border-0 py-3">⚥ เพศ</th>
                        <th className="border-0 py-3">🎂 วันเกิด</th>
                        <th className="text-center border-0 py-3">⚙️ จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center py-5">
                            <div className="empty-state">
                              <i className="fas fa-users-slash fs-1 text-muted mb-3"></i>
                              <h5 className="text-muted mb-2">ไม่พบข้อมูลผู้ใช้</h5>
                              <p className="text-muted">ลองเปลี่ยนคำค้นหาหรือเพิ่มผู้ใช้ใหม่</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredItems.map((item, index) => (
                          <tr key={item.id} className="table-row-hover border-bottom">
                            <td className="text-center fw-bold">
                              <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">
                                {item.id}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-circle bg-primary bg-opacity-10 me-3">
                                  {item.firstname.charAt(0).toUpperCase()}
                                </div>
                                <span className="fw-semibold">{item.firstname}</span>
                              </div>
                            </td>
                            <td className="text-muted">{item.fullname}</td>
                            <td className="fw-medium">{item.lastname}</td>
                            <td>
                              <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                                @{item.username}
                              </span>
                            </td>
                            <td>
                              <code className="password-field bg-light border rounded px-2 py-1">
                                {item.password}
                              </code>
                            </td>
                            <td className="text-muted small">{item.address}</td>
                            <td>
  <span className={`badge ${item.sex === 'ชาย' ? 'bg-primary' : 'bg-pink'} bg-opacity-10 ${item.sex === 'ชาย' ? 'text-primary' : 'text-pink'} rounded-pill`}>
    {item.sex === 'ชาย' ? '👨 ชาย' : '👩 หญิง'}
  </span>
</td>
                            <td className="text-muted small">
                              <i className="fas fa-calendar-alt me-1"></i>
                              {item.birthday}
                            </td>
                            <td>
                              <div className="btn-group gap-2" role="group">
                                <Link 
                                  href={`/admin/users/edit/${item.id}`} 
                                  className="btn btn-warning btn-sm rounded-pill shadow-sm btn-hover px-3"
                                >
                                  <i className="fas fa-edit me-1"></i>แก้ไข
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm rounded-pill shadow-sm btn-hover px-3"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <i className="fas fa-trash me-1"></i>ลบ
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer Info */}
            {!loading && filteredItems.length > 0 && (
              <div className="card-footer bg-light border-0 py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      แสดง {filteredItems.length} จาก {items.length} รายการ
                    </small>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <small className="text-muted">
                      <i className="fas fa-clock me-1"></i>
                      อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bg-gradient-light {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .bg-pink {
          background-color: #e91e63;
        }
        
        .text-pink {
          color: #e91e63;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }

        .table-row-hover {
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .table-row-hover:hover {
          background: linear-gradient(90deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
          transform: scale(1.002);
        }

        .btn-hover {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .btn-hover-danger:hover {
          background-color: #dc3545 !important;
          border-color: #dc3545 !important;
          color: white !important;
        }

        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
          border-color: #667eea;
          transform: scale(1.01);
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }

        .password-field {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          background: linear-gradient(45deg, #f8f9fa, #e9ecef);
          border: 1px solid #dee2e6;
        }

        .empty-state {
          padding: 2rem;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: wave 1.3s linear infinite;
        }

        .loading-dot:nth-child(2) {
          animation-delay: -1.1s;
        }

        .loading-dot:nth-child(3) {
          animation-delay: -0.9s;
        }

        @keyframes wave {
          0%, 60%, 100% {
            transform: initial;
          }
          30% {
            transform: translateY(-15px);
          }
        }

        .sticky-top {
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .animate__animated.animate__pulse.animate__infinite {
          animation-duration: 2s;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .table-responsive {
            font-size: 0.875rem;
          }
          
          .btn-group {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .avatar-circle {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .bg-gradient-light {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          }
        }
      `}</style>
    </>
  );
}