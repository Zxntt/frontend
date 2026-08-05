"use client";

export default function StatusCards() {
  return (
    <div className="status-grid">

      <div className="status-card">

        <h4>🌡 Temperature</h4>

        <h2>28°C</h2>

      </div>

      <div className="status-card">

        <h4>💧 Humidity</h4>

        <h2>65%</h2>

      </div>

      <div className="status-card">

        <h4>🚶 Motion</h4>

        <h2>Detected</h2>

      </div>

      <div className="status-card">

        <h4>🔔 Alarm</h4>

        <h2>OFF</h2>

      </div>

    </div>
  );
}