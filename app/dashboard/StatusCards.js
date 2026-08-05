"use client";

const cards = [
  { icon: "🌡", label: "Temperature", value: "28°C", tint: "rgba(245,158,11,.15)" },
  { icon: "💧", label: "Humidity", value: "65%", tint: "rgba(59,130,246,.15)" },
  { icon: "🚶", label: "Motion", value: "Detected", tint: "rgba(34,197,94,.15)" },
  { icon: "🔔", label: "Alarm", value: "OFF", tint: "rgba(148,163,184,.15)" },
];

export default function StatusCards() {
  return (
    <div className="status-grid">

      {cards.map((c) => (
        <div className="status-card" key={c.label}>

          <div className="status-icon" style={{ background: c.tint }}>
            {c.icon}
          </div>

          <h4>{c.label}</h4>

          <h2>{c.value}</h2>

        </div>
      ))}

    </div>
  );
}
