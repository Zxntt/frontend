"use client";

import styles from './car.css'; 

export default function Car() {
  const riders = [
    { id: 1, name: "Rider 1", image: "/images/car/1.png", car: "Aprilia Racing" },
    { id: 2, name: "Rider 2", image: "/images/car/2.png", car: "BK8 Gresini Racing MotoGP" },
    { id: 3, name: "Rider 3", image: "/images/car/3.png", car: "Ducati Lenovo Team" },
    { id: 4, name: "Rider 4", image: "/images/car/4.png", car: "Honda HRC Castrol" },
    { id: 5, name: "Rider 5", image: "/images/car/5.png", car: "LCR Honda" },
    { id: 6, name: "Rider 6", image: "/images/car/6.png", car: "Monster Energy Yamaha MotoGP" },
    { id: 7, name: "Rider 7", image: "/images/car/7.png", car: "Pertamina Enduro VR46 Racing Team" },
    { id: 8, name: "Rider 8", image: "/images/car/8.png", car: "Prima Pramac Yamaha" },
    { id: 9, name: "Rider 9", image: "/images/car/9.png", car: "Red Bull KTM Factory Racing" },
    { id: 10, name: "Rider 10", image: "/images/car/10.png", car: "Red Bull KTM Tech3" },
    { id: 11, name: "Rider 11", image: "/images/car/11.png", car: "Trackhouse MotoGP Team" },
  ];

  const rows = [];
  for (let i = 0; i < riders.length; i += 4) {
    rows.push(riders.slice(i, i + 4));
  }

  return (
    <div className="page-Car">
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-center text-danger mb-5">
          - Cars -
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
                    <div className="mt-2 fw-semibold text-danger">{rider.car}</div>
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
