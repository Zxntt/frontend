'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params.id;
  
  // Form states
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [items, setItems] = useState([]);
  
  // Status states
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        setError('')
        
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`);
        if (!res.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        }
        
        const data = await res.json();
        setItems(data);

        // กำหนดค่า state เริ่มต้นจาก API
        if (data.length > 0) {
          const user = data[0];
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setPassword(user.password || '');
        } else {
          setError('ไม่พบข้อมูลผู้ใช้')
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false)
      }
    }
 
    getUsers();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setError('')
    
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, firstname, fullname, lastname, username, password }),
      })
      
      const result = await res.json();
      console.log(result);
      
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          html: '<h5 class="text-success">✅ ปรับปรุงข้อมูลเรียบร้อยแล้ว</h5><p class="text-muted">ข้อมูลของคุณได้รับการอัปเดตเรียบร้อยแล้ว</p>',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        }).then(function () {
          router.push('/admin/users')
        });
        
      } else {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการปรับปรุงข้อมูل');
      }
      
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
      
      Swal.fire({
        icon: 'error',
        title: '❌ เกิดข้อผิดพลาด',
        text: error.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#dc3545'
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <>
        <br /><br /><br />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h4 className="text-primary">กำลังโหลดข้อมูล...</h4>
                  <p className="text-muted">โปรดรอสักครู่</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Error state
  if (error && items.length === 0) {
    return (
      <>
        <br /><br /><br />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-danger text-center" role="alert">
                <h1 className="display-1">⚠️</h1>
                <h4 className="alert-heading">เกิดข้อผิดพลาด!</h4>
                <p>{error}</p>
                <hr />
                <button 
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  <i className="fas fa-redo me-2"></i>ลองใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <br /><br /><br />
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            
            {/* Header Card */}
            <div className="card shadow-lg border-0 mb-4" style={{ background: 'linear-gradient(135deg, #ff0000ff 0%, #1100ffff 100%)' }}>
              <div className="card-body text-white text-center py-4">
                <h1 className="card-title mb-2">
                  <i className="fas fa-user-edit me-3"></i>
                  แก้ไขข้อมูลผู้ใช้งาน
                </h1>
                <p className="mb-0">
                  <i className="fas fa-id-card me-2"></i>
                  รหัสผู้ใช้: <span className="badge bg-light text-dark">#{id}</span>
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <div>{error}</div>
              </div>
            )}

            {/* Form Card */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0 text-dark">
                  <i className="fas fa-edit me-2"></i>
                  ข้อมูลส่วนตัว
                </h5>
              </div>
              
              <div className="card-body p-4">
                {items.map((item) => (
                  <form key={item.id} onSubmit={handleUpdateSubmit}>
                    
                    {/* คำนำหน้า */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-user-tag me-2 text-primary"></i>
                        คำนำหน้า <span className="text-danger">*</span>
                      </label>
                      <select 
                        name="firstname" 
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)} 
                        className="form-select form-select-lg"
                        required
                      >
                        <option value="">เลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                    </div>

                    {/* ชื่อ */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-user me-2 text-success"></i>
                        ชื่อ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="กรอกชื่อ"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    {/* นามสกุล */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-user me-2 text-info"></i>
                        นามสกุล <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="กรอกนามสกุล"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-at me-2 text-warning"></i>
                        ชื่อผู้ใช้ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="กรอกชื่อผู้ใช้"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        <i className="fas fa-key me-2 text-danger"></i>
                        รหัสผ่าน <span className="text-danger">*</span>
                      </label>
                      <div className="input-group input-group-lg">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="กรอกรหัสผ่าน"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          required
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 mb-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`btn btn-lg ${
                          submitting ? 'btn-secondary' : 'btn-primary'
                        }`}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            กำลังปรับปรุงข้อมูล...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            ปรับปรุงข้อมูล
                          </>
                        )}
                      </button>
                    </div>

                    {/* Back Button */}
                    <div className="d-grid">
                      <button
                        type="button"
                        onClick={() => router.push('/admin/users')}
                        className="btn btn-outline-secondary btn-lg"
                        disabled={submitting}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        กลับไปหน้ารายการ
                      </button>
                    </div>

                  </form>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="card border-0 bg-light mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary">
                      <i className="fas fa-info-circle me-2"></i>
                      คำแนะนำ:
                    </h6>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li><i className="fas fa-check me-2 text-success"></i>กรอกข้อมูลให้ครบถ้วนทุกช่อง</li>
                      <li><i className="fas fa-check me-2 text-success"></i>รหัสผ่านควรมีความปลอดภัยสูง</li>
                      <li><i className="fas fa-check me-2 text-success"></i>ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</li>
                    </ul>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <small className="text-muted">
                      <i className="fas fa-clock me-2"></i>
                      อัพเดทล่าสุด: {new Date().toLocaleString('th-TH')}
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
  )
}