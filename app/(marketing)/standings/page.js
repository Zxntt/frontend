"use client";
import { useState, useEffect } from "react";
import "./sd.css";

export default function MotoGPStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const standingsData = [
    { position: 1, number: 1, name: "Marc Márquez", team: "Ducati Lenovo Team", points: 428 },
    { position: 2, number: 93, name: "Francesco Bagnaia", team: "Gresini Racing MotoGP", points: 392 },
    { position: 3, number: 23, name: "Enea Bastianini", team: "Ducati Lenovo Team", points: 368 },
    { position: 4, number: 72, name: "Marco Bezzecchi", team: "Pertamina Enduro VR46", points: 289 },
    { position: 5, number: 12, name: "Maverick Viñales", team: "Aprilia Racing", points: 276 },
    { position: 6, number: 20, name: "Fabio Quartararo", team: "Monster Energy Yamaha", points: 254 },
    { position: 7, number: 10, name: "Luca Marini", team: "Mooney VR46 Racing", points: 201 },
    { position: 8, number: 43, name: "Jack Miller", team: "Red Bull KTM Factory", points: 189 },
    { position: 9, number: 41, name: "Aleix Espargaró", team: "Aprilia Racing", points: 176 },
    { position: 10, number: 88, name: "Miguel Oliveira", team: "RNF MotoGP Team", points: 158 },
  ];

  const loadStandings = async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (Math.random() < 0.05) throw new Error("Random error");

      const updated = (standings.length > 0 ? standings : standingsData).map((rider) => {
        let newPoints = rider.points;
        if (rider.position <= 3) {
          if (Math.random() < 0.5) {
            newPoints += Math.floor(Math.random() * 2);
          }
        } else {
          if (Math.random() < 0.7) {
            newPoints += Math.floor(Math.random() * 4) + 1;
          }
        }
        return { ...rider, points: newPoints };
      });

      const withPositions = updated
        .sort((a, b) => b.points - a.points)
        .map((r, index) => ({ ...r, position: index + 1 }));

      setStandings(withPositions);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStandings();
    const interval = setInterval(loadStandings, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPositionClass = (pos) => {
    if (pos === 1) return "podium-1";
    if (pos === 2) return "podium-2";
    if (pos === 3) return "podium-3";
    return "";
  };

  return (
    <div className="page-standings container">
      <div className="header">
        <h1>🏁 MotoGP Championship Standings</h1>
        <p>Season 2025 • World Championship</p>
      </div>

      {loading && (
        <div className="loading-overlay active">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>⚠️ Error Loading Data</h3>
          <p>Unable to load championship standings. Please try again.</p>
          <button className="refresh-btn" onClick={loadStandings}>
            Refresh Data
          </button>
        </div>
      )}

      {!error && (
        <>
          <button className="refresh-btn" onClick={loadStandings}>
            🔄 Refresh Standings
          </button>
          <table className="standings-table">
            <thead className="table-header">
              <tr>
                <th>POS</th>
                <th>RIDER</th>
                <th>TEAM</th>
                <th>POINTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((rider) => (
                <tr key={rider.number} className="rider-row">
                  <td className={`position ${getPositionClass(rider.position)}`}>{rider.position}</td>
                  <td>
                    <div className="rider-info">
                      <div className="rider-number">{rider.number}</div>
                      <div className="rider-name">{rider.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="team-name">{rider.team}</div>
                  </td>
                  <td className="points">{rider.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
