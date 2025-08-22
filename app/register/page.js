'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './reg.css'   // ✅ ใช้ไฟล์ CSS แยกสำหรับ Register

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    sex: '',
    birthday: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'รหัสผ่านไม่ตรงกัน', text: 'กรุณากรอกให้ตรงกัน' })
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (res.ok) {
        Swal.fire({ icon: 'success', title: 'บันทึกข้อมูลเรียบร้อยแล้ว', timer: 2000, showConfirmButton: false })
        router.push('/login')
      } else {
        Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: result.message || 'ไม่สามารถสมัครได้' })
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'เครือข่ายผิดพลาด', text: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="card-header">
          <div className="avatar"><div className="avatar-icon">🏍️</div></div>
          <h1>สมัครสมาชิก</h1>
          <p>เข้าร่วมทีมแข่ง MotoGP</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">

          {/* Firstname */}
          <div className="form-group">
            <label>Firstname</label>
            <select name="firstname" value={formData.firstname} onChange={handleChange} required>
              <option value="">Select Firstname</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required />
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          </div>

          {/* Sex */}
          <div className="form-group">
            <label>Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select sex</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>

          {/* Birthday */}
          <div className="form-group">
            <label>Birthday</label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <div className="action-buttons">
          <Link href="/login" className="action-btn secondary">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  )
}
