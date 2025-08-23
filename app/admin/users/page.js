'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function User() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/adminlogin');
      return;
    }

    async function getUsers() {
      try {
        setError('');
        const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users');
        if (!res.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลได้');
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    }
 
    getUsers();
    const interval = setInterval(getUsers, 10000); // 10 วินาที
    return () => clearInterval(interval);
  }, [router]);

  const handleDelete = async (id, username) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: `คุณต้องการลบผู้ใช้ ${username} หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        setDeleteLoading(id);
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        });
        
        if (res.ok) {
          // อัพเดท state ทันที
          setItems(prevItems => prevItems.filter(item => item.id !== id));
          
          Swal.fire({
            icon: 'success',
            title: 'ลบสำเร็จ!',
            text: `ลบผู้ใช้ ${username} แล้ว`,
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          throw new Error('ไม่สามารถลบได้');
        }
        
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถลบผู้ใช้ได้'
        });
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading screen
  if (loading) {
    return (
      <>
        <br /><br /><br /><br />
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3 className="mt-3 text-primary">กำลังโหลดข้อมูล...</h3>
            <p className="text-muted">โปรดรอสักครู่</p>
          </div>
        </div>
      </>
    );
  }

  // Error screen
  if (error) {
    return (
      <>
        <br /><br /><br /><br />
        <div className="container">
          <div className="alert alert-danger text-center" role="alert">
            <h4 className="alert-heading">เกิดข้อผิดพลาด!</h4>
            <p>{error}</p>
            <hr />
            <button 
              className="btn btn-danger" 
              onClick={() => window.location.reload()}
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <br /><br /><br />
      
      <div className="container-fluid px-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #eb2424ff 0%, #111ee2ff 100%)' }}>
              <div className="card-body text-white">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h1 className="card-title mb-2">
                      <i className="fas fa-users me-3"></i>
                      จัดการข้อมูลผู้ใช้งาน
                    </h1>
                    <p className="mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      จำนวนผู้ใช้ทั้งหมด: <strong>{items.length}</strong> คน
                      {searchTerm && (
                        <span className="ms-3">
                          | ผลการค้นหา: <strong>{filteredItems.length}</strong> คน
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        placeholder="ค้นหาผู้ใช้..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button
                          className="btn btn-outline-light"
                          type="button"
                          onClick={() => setSearchTerm('')}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0 text-dark">
                  <i className="fas fa-table me-2"></i>
                  รายการผู้ใช้งาน
                </h5>
              </div>
              <div className="card-body p-0">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-search text-muted" style={{ fontSize: '3rem' }}></i>
                    <h4 className="text-muted mt-3">ไม่พบข้อมูล</h4>
                    <p className="text-muted">
                      {searchTerm ? 'ลองค้นหาด้วยคำอื่น' : 'ยังไม่มีผู้ใช้ในระบบ'}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th className="text-center" width="80">
                            <i className="fas fa-hashtag"></i> ID
                          </th>
                          <th>
                            <i className="fas fa-user-tag"></i> คำนำหน้า
                          </th>
                          <th>
                            <i className="fas fa-user"></i> ชื่อ
                          </th>
                          <th>
                            <i className="fas fa-user"></i> นามสกุล
                          </th>
                          <th>
                            <i className="fas fa-at"></i> Username
                          </th>
                          <th>
                            <i className="fas fa-map-marker-alt"></i> ที่อยู่
                          </th>
                          <th width="80">
                            <i className="fas fa-venus-mars"></i> เพศ
                          </th>
                          <th width="120">
                            <i className="fas fa-birthday-cake"></i> วันเกิด
                          </th>
                          <th className="text-center" width="180">
                            <i className="fas fa-cogs"></i> จัดการ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item, index) => (
                          <tr key={item.id} className={index % 2 === 0 ? 'table-light' : ''}>
                            <td className="text-center">
                              <span className="badge bg-primary rounded-pill">
                                #{item.id}
                              </span>
                            </td>
                            <td>
                              <span className="text-dark fw-medium">
                                {item.firstname || '-'}
                              </span>
                            </td>
                            <td>
                              <span className="text-dark fw-medium">
                                {item.fullname || '-'}
                              </span>
                            </td>
                            <td>
                              <span className="text-dark fw-medium">
                                {item.lastname || '-'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-success">
                                {item.username || '-'}
                              </span>
                            </td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                              <small className="text-muted">
                                {item.address || '-'}
                              </small>
                            </td>
                            <td>
                              <span className={`badge ${
                                item.sex === 'ชาย' ? 'bg-info' : 
                                item.sex === 'หญิง' ? 'bg-warning' : 'bg-secondary'
                              }`}>
                                {item.sex || '-'}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">
                                {item.birthday ? new Date(item.birthday).toLocaleDateString('th-TH') : '-'}
                              </small>
                            </td>
                            <td className="text-center">
                              <div className="btn-group btn-group-sm" role="group">
                                <Link 
                                  href={`/admin/users/edit/${item.id}`}
                                  className="btn btn-warning btn-sm"
                                  title="แก้ไขข้อมูล"
                                >
                                  <i className="fas fa-edit"></i> แก้ไข
                                </Link>
                                <button 
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(item.id, item.username)}
                                  disabled={deleteLoading === item.id}
                                  title="ลบข้อมูล"
                                >
                                  {deleteLoading === item.id ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                      ลบ...
                                    </>
                                  ) : (
                                    <>
                                      <i className="fas fa-trash"></i> ลบ
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body py-2">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <small className="text-muted">
                      <i className="fas fa-clock me-2"></i>
                      อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}
                    </small>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <small className="text-muted">
                      <i className="fas fa-sync-alt me-2"></i>
                      รีเฟรชอัตโนมัติทุก 10 วินาที
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <br /><br />
    </>
  );
}