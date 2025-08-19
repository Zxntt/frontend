'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ตรวจ login แบบง่าย (client-side) ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdminConfirmed');
    if (isLoggedIn !== 'true' || isAdmin !== 'true') {
      router.replace('/admin/users');
    }
  }, [router]);

  // --- ดึงข้อมูล users ---
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 5000); // refresh ทุก 5 วิ
    return () => clearInterval(interval);
  }, []);

  // --- ฟังก์ชันลบ user ---
  async function handleDelete(id) {
    if (!confirm('คุณต้องการลบ User นี้ใช่หรือไม่?')) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.error('Failed to delete user');
        alert('ไม่สามารถลบ user ได้ ❌');
        return;
      }

      // ลบออกจาก state ทันที
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert('ลบเรียบร้อยแล้ว ✅');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('เกิดข้อผิดพลาด ❌');
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header">Users List</div>
          <div className="card-body">
            <div className="row">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Firstname</th>
                    <th>Fullname</th>
                    <th>Lastname</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>
                        <Link href={`/admin/users/edit/${item.id}`} className="btn btn-warning">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-pill btn-danger"
                          type="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fa fa-trash"></i> Del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}
