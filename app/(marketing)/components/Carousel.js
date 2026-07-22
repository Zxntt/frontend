"use client";

export default function Carousel() {
  return (
    <div className="container" style={{ maxWidth: "900px", margin: "40px auto" }}>
      <div className="live-screen rounded-4 shadow-lg position-relative d-flex flex-column align-items-center justify-content-center">
        <i className="bi bi-camera-video-fill" style={{ fontSize: "3rem", color: "#666" }}></i>
        <p className="text-secondary mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
          Live feed
        </p>

        <span className="live-badge">
          <span className="live-dot"></span>
          Live
        </span>
        <span className="time-badge">14:32:07</span>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className="btn btn-outline d-flex align-items-center gap-2">
          <i className="bi bi-mic-fill"></i>
          Talk
        </button>
        <button className="btn btn-outline d-flex align-items-center gap-2">
          <i className="bi bi-record-circle"></i>
          Record
        </button>
        <button className="btn btn-outline d-flex align-items-center gap-2">
          <i className="bi bi-arrows-fullscreen"></i>
          Fullscreen
        </button>
      </div>

      <style jsx>{`
        .live-screen {
          background: #111;
          height: 60vh;
          min-height: 320px;
        }
        .live-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(220, 38, 38, 0.15);
          color: #f87171;
          font-size: 0.8rem;
          padding: 4px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f87171;
          display: inline-block;
        }
        .time-badge {
          position: absolute;
          bottom: 14px;
          right: 14px;
          color: #ccc;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}