"use client";

export default function team() {
  const riders = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    name: `Rider ${i + 1}`,
    image: `/images/rider${i + 1}.jpg`,
  }));

  // แบ่ง array เป็นแถวละ 4 คน
  const rows = [];
  for (let i = 0; i < riders.length; i += 4) {
    rows.push(riders.slice(i, i + 4));
  }

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-center text-danger mb-5">
        MotoGP Riders Table
      </h1>

      <table className="table table-bordered text-center align-middle">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((rider) => (
                <td key={rider.id} style={{ width: "25%", verticalAlign: "top" }}>
                  <img
                    src={rider.image}
                    alt={rider.name}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderBottom: "2px solid #dc3545" }}
                  />
                  <div className="mt-2 fw-semibold text-danger">{rider.name}</div>
                </td>
              ))}
              {/* ถ้าแถวสุดท้ายไม่เต็ม 4 คน ให้เพิ่มช่องว่าง */}
              {row.length < 4 &&
                Array.from({ length: 4 - row.length }).map((_, i) => (
                  <td key={"empty-" + i}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
