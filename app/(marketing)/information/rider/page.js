"use client";

import styles from './rider.css'; 

export default function Rider() {
  const riders = [
    { id: 1, name: "Rider 1", image: "/images/rider/1.png", rider: "Jorge Martin" },
    { id: 2, name: "Rider 2", image: "/images/rider/2.png", rider: "Johann Zarco" },
    { id: 3, name: "Rider 3", image: "/images/rider/3.png", rider: "Luca Marini" },
    { id: 4, name: "Rider 4", image: "/images/rider/4.png", rider: "Maverick Viñales" },
    { id: 5, name: "Rider 5", image: "/images/rider/5.png", rider: "Fabio Quartararo" },
    { id: 6, name: "Rider 6", image: "/images/rider/6.png", rider: "Franco Morbidelli" },
    { id: 7, name: "Rider 7", image: "/images/rider/7.png", rider: "Enea Bastianini" },
    { id: 8, name: "Rider 8", image: "/images/rider/8.png", rider: "Raul Fernandez" },
    { id: 9, name: "Rider 9", image: "/images/rider/9.png", rider: "Brad Binder" },
    { id: 10, name: "Rider 10", image: "/images/rider/10.png", rider: "Somkiat Chantra" },
    { id: 11, name: "Rider 11", image: "/images/rider/11.png", rider: "Joan Mir" },
    { id: 12, name: "Rider 12", image: "/images/rider/12.png", rider: "Pedro Acosta" },
    { id: 13, name: "Rider 13", image: "/images/rider/13.png", rider: "Alex Rins" },
    { id: 14, name: "Rider 14", image: "/images/rider/14.png", rider: "Jack Miller" },
    { id: 15, name: "Rider 15", image: "/images/rider/15.png", rider: "Fabio Di Giannantonio" },
    { id: 16, name: "Rider 16", image: "/images/rider/16.png", rider: "Fermin Aldeguer" },
    { id: 17, name: "Rider 17", image: "/images/rider/17.png", rider: "Francesco Bagnaia" },
    { id: 18, name: "Rider 18", image: "/images/rider/18.png", rider: "Marco Bezzecchi" },
    { id: 19, name: "Rider 19", image: "/images/rider/19.png", rider: "Alex Marquez" },
    { id: 20, name: "Rider 20", image: "/images/rider/20.png", rider: "Ai Ogura" },
    { id: 21, name: "Rider 21", image: "/images/rider/21.png", rider: "Miguel Oliveira" },
    { id: 22, name: "Rider 22", image: "/images/rider/22.png", rider: "Marc Marquez" },
  ];

  const rows = [];
  for (let i = 0; i < riders.length; i += 4) {
    rows.push(riders.slice(i, i + 4));
  }

  return (
    <div className="page-rider">
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-center text-danger mb-5">
          - Riders -
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
                    <div className="mt-2 fw-semibold text-danger">
                      {rider.rider}
                    </div>
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
