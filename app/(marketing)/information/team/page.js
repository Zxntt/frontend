"use client";

import styles from './team.css'; // สมมติเป็น CSS แบบ global ที่มี prefix .page-team

export default function Team() {
  const riders = [
    { id: 1, name: "Rider 1", image: "/images/team/1.png", team: "Aprilia Racing" },
    { id: 2, name: "Rider 2", image: "/images/team/2.png", team: "BK8 Gresini Racing MotoGP" },
    { id: 3, name: "Rider 3", image: "/images/team/3.png", team: "Ducati Lenovo Team" },
    { id: 4, name: "Rider 4", image: "/images/team/4.png", team: "Honda HRC Castrol" },
    { id: 5, name: "Rider 5", image: "/images/team/5.png", team: "LCR Honda" },
    { id: 6, name: "Rider 6", image: "/images/team/6.png", team: "Monster Energy Yamaha MotoGP" },
    { id: 7, name: "Rider 7", image: "/images/team/7.png", team: "Pertamina Enduro VR46 Racing Team" },
    { id: 8, name: "Rider 8", image: "/images/team/8.png", team: "Prima Pramac Yamaha" },
    { id: 9, name: "Rider 9", image: "/images/team/9.png", team: "Red Bull KTM Factory Racing" },
    { id: 10, name: "Rider 10", image: "/images/team/10.png", team: "Red Bull KTM Tech3" },
    { id: 11, name: "Rider 11", image: "/images/team/11.png", team: "Trackhouse MotoGP Team" },
  ];

  const rows = [];
  for (let i = 0; i < riders.length; i += 4) {
    rows.push(riders.slice(i, i + 4));
  }

  return (
    <div className="page-team">
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-center text-danger mb-5">
          - MotoGP Team -
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
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderBottom: "2px solid #dc3545",
                      }}
                    />
                    <div className="mt-2 fw-semibold text-danger">{rider.team}</div>
                  </td>
                ))}
                {row.length < 4 &&
                  Array.from({ length: 4 - row.length }).map((_, i) => (
                    <td key={"empty-" + i}></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
