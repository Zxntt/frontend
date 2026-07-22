"use client";

export default function Card() {
  const activities = [
    { type: "Motion detected", time: "Today, 13:47" },
    { type: "Person detected", time: "Today, 09:12" },
    { type: "Motion detected", time: "Yesterday, 22:03" },
    { type: "Person detected", time: "Yesterday, 18:30" },
  ];

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h5 className="fw-bold mb-3" style={{ fontSize: "1rem" }}>
        Recent activity
      </h5>
      <div className="d-flex flex-column gap-2">
        {activities.map((a, index) => (
          <div key={index} className="activity-row d-flex align-items-center gap-3">
            <div className="thumb d-flex align-items-center justify-content-center">
              <i className="bi bi-play-fill"></i>
            </div>
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                {a.type}
              </p>
              <p className="mb-0 text-secondary" style={{ fontSize: "0.8rem" }}>
                {a.time}
              </p>
            </div>
            <i className="bi bi-chevron-right text-secondary"></i>
          </div>
        ))}
      </div>

      <style jsx>{`
        .activity-row {
          background: var(--color-bg-soft, #f5f6f8);
          border-radius: 10px;
          padding: 10px 14px;
        }
        .thumb {
          width: 56px;
          height: 40px;
          background: #222;
          border-radius: 6px;
          color: #999;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}