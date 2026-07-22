"use client";

import { useState } from "react";
import "./sd.css";

const allClips = [
  { id: 1, type: "Motion", label: "Motion detected", time: "Today, 13:47", date: "2026-07-23" },
  { id: 2, type: "Person", label: "Person detected", time: "Today, 09:12", date: "2026-07-23" },
  { id: 3, type: "Motion", label: "Motion detected", time: "Yesterday, 22:03", date: "2026-07-22" },
  { id: 4, type: "Person", label: "Person detected", time: "Yesterday, 18:30", date: "2026-07-22" },
  { id: 5, type: "Motion", label: "Motion detected", time: "Yesterday, 14:05", date: "2026-07-22" },
  { id: 6, type: "Person", label: "Person detected", time: "Jul 21, 20:11", date: "2026-07-21" },
  { id: 7, type: "Motion", label: "Motion detected", time: "Jul 21, 08:44", date: "2026-07-21" },
  { id: 8, type: "Motion", label: "Motion detected", time: "Jul 20, 19:27", date: "2026-07-20" },
];

const filters = ["All", "Motion", "Person"];

export default function History() {
  const [activeFilter, setActiveFilter] = useState("All");

  const clips =
    activeFilter === "All"
      ? allClips
      : allClips.filter((c) => c.type === activeFilter);

  return (
    <div className="page-history">
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4" style={{ fontSize: "1.6rem" }}>
          History
        </h1>

        {/* FILTER TABS */}
        <div className="d-flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* CLIP LIST */}
        <div className="d-flex flex-column gap-2">
          {clips.map((clip) => (
            <div key={clip.id} className="clip-row">
              <div className="clip-thumb">
                <i className="bi bi-play-fill"></i>
              </div>
              <div className="clip-info">
                <p className="clip-label">{clip.label}</p>
                <p className="clip-time">{clip.time}</p>
              </div>
              <span className={`badge-type ${clip.type === "Person" ? "person" : "motion"}`}>
                {clip.type}
              </span>
              <i className="bi bi-chevron-right text-secondary"></i>
            </div>
          ))}

          {clips.length === 0 && <p className="empty-state">No clips found.</p>}
        </div>
      </div>
    </div>
  );
}