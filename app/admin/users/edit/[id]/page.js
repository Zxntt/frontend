'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams();
  const id = params.id;
  
  // Form states
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [sex, setSex] = useState('')
  const [birthday, setBirthday] = useState('')
  
  // Status states
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // 1. Fetch Data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/adminlogin');
      return;
    }

    async function getUser() {
      try {
        setLoading(true)
        setError('')
        
        const res = await fetch(`https://backend-1-six-lime.vercel.app/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        }
        
        const data = await res.json();
        
        // เช็คเผื่อ API ส่งมาเป็น array
        const user = Array.isArray(data) ? data[0] : data;

        if (user) {
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setAddress(user.address || '');
          setSex(user.sex || '');
          if (user.birthday) {
            setBirthday(user.birthday.split('T')[0]);
          }
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

    if (id) {
        getUser();
    }
  }, [id, router]);

  // 2. Update Data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setError('')
    
    if (!firstname || !fullname || !lastname || !username || !address || !sex || !birthday) {
        Swal.fire({
            icon: 'warning',
            title: 'ข้อมูลไม่ครบ',
            text: 'กรุณากรอกข้อมูลให้ครบทุกช่องที่มีเครื่องหมาย *',
            confirmButtonColor: '#ffc107'
        });
        setSubmitting(false);
        return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-1-six-lime.vercel.app/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
            id, 
            firstname, 
            fullname, 
            lastname, 
            username, 
            password: password || undefined,
            address,
            sex,
            birthday
        }),
      })
      
      const result = await res.json();
      
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          html: '<h5 class="text-success">✅ ปรับปรุงข้อมูลเรียบร้อยแล้ว</h5>',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).then(function () {
          router.push('/admin/users')
        });
        
      } else {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการปรับปรุงข้อมูล');
      }
      
    } catch (error) {
      console.error('Update error:', error);
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

  if (loading) {
    return (
      <div className="container py-5 text-center">
         <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
         <p className="mt-2">กำลังโหลดข้อมูล...</p>
      </div>
    )
  }

  if (error) {
    return (
        <div className="container py-5">
            <div className="alert alert-danger text-center">
                <h4>เกิดข้อผิดพลาด</h4>
                <p>{error}</p>
                <button className="btn btn-danger" onClick={() => window.location.reload()}>ลองใหม่</button>
            </div>
        </div>
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

            {/* Form Card */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0 text-dark">
                  <i className="fas fa-edit me-2"></i>
                  ข้อมูลส่วนตัว
                </h5>
              </div>
              
              <div className="card-body p-4">
                  {/* *** จุดที่แก้ไข: ไม่มีการใช้ items.map แล้ว *** */}
                  <form onSubmit={handleUpdateSubmit}>
                    
                    {/* คำนำหน้า */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">คำนำหน้า <span className="text-danger">*</span></label>
                      <select 
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

                    {/* ชื่อ - นามสกุล */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">ชื่อ <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">นามสกุล <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* ที่อยู่ */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">ที่อยู่ <span className="text-danger">*</span></label>
                        <textarea 
                            className="form-control" 
                            rows="3"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* เพศ และ วันเกิด */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">เพศ <span className="text-danger">*</span></label>
                            <select 
                                className="form-select form-select-lg"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                required
                            >
                                <option value="">ระบุเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">วันเกิด <span className="text-danger">*</span></label>
                            <input 
                                type="date" 
                                className="form-control form-control-lg"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Username */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">ชื่อผู้ใช้ <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control form-control-lg bg-light"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        รหัสผ่าน <small className="text-muted fw-normal">(เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</small>
                      </label>
                      <div className="input-group input-group-lg">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="กรอกรหัสผ่านใหม่"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
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

                    {/* Buttons */}
                    <div className="d-grid gap-2 mb-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`btn btn-lg ${submitting ? 'btn-secondary' : 'btn-primary'}`}
                      >
                        {submitting ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                      </button>
                    </div>

                    <div className="d-grid">
                      <button
                        type="button"
                        onClick={() => router.push('/admin/users')}
                        className="btn btn-outline-secondary btn-lg"
                        disabled={submitting}
                      >
                        ยกเลิก / กลับ
                      </button>
                    </div>

                  </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <br /><br />
    </>
  )
}