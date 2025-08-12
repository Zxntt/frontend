"use client";

import styles from './manager.css'; 

export default function Manager() {
  const riders = [
    { id: 1, name: "Rider 1", image: "/images/team/1.png", manager: "Paolo Bonora  Massimo Rivola " },
    { id: 2, name: "Rider 2", image: "/images/team/2.png", manager: "Nadia Padovani " },
    { id: 3, name: "Rider 3", image: "/images/team/3.png", manager: "Davide Tardozzi  Luigi Dall’Igna" },
    { id: 4, name: "Rider 4", image: "/images/team/4.png", manager: "Tetsuhiro Kuwata " },
    { id: 5, name: "Rider 5", image: "/images/team/5.png", manager: "Lucio Cecchinello " },
    { id: 6, name: "Rider 6", image: "/images/team/6.png", manager: "Paolo Pavesio  Maio Meregalli" },
    { id: 7, name: "Rider 7", image: "/images/team/7.png", manager: "Pablo Nieto  Valentino Rossi" },
    { id: 8, name: "Rider 8", image: "/images/team/8.png", manager: "Gino Borsoi  PaoloCampinoti" },
    { id: 9, name: "Rider 9", image: "/images/team/9.png", manager: "Pit Beirer  Aki Ajo" },
    { id: 10, name: "Rider 10", image: "/images/team/10.png", manager: "Hervé Poncharal  Nicolas Goyon" },
    { id: 11, name: "Rider 11", image: "/images/team/11.png", manager: "WilcoZeelenberg  Davide Brivio" },
  ];

  const rows = [];
  for (let i = 0; i < riders.length; i += 4) {
    rows.push(riders.slice(i, i + 4));
  }

  return (
    <div className="page-manager">
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
                    <div className="mt-2 fw-semibold text-danger">{rider.manager}</div>
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
