"use client";

import { useState } from "react";

export default function Manager() {
  const [cameraName, setCameraName] = useState("Front door");
  const [sensitivity, setSensitivity] = useState(60);
  const [notifyMotion, setNotifyMotion] = useState(true);
  const [notifyPerson, setNotifyPerson] = useState(true);
  const [recordAlways, setRecordAlways] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-manager">
      <div className="container py-5" style={{ maxWidth: "640px" }}>
        <h1 className="fw-bold mb-4" style={{ fontSize: "1.6rem" }}>
          Settings
        </h1>

        {/* CAMERA SECTION */}
        <div className="settings-card mb-3">
          <h2 className="section-title">Camera</h2>

          <label className="form-label">Camera name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={cameraName}
            onChange={(e) => setCameraName(e.target.value)}
          />

          <label className="form-label d-flex justify-content-between">
            <span>Motion sensitivity</span>
            <span className="text-secondary">{sensitivity}%</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
          />
        </div>

        {/* NOTIFICATIONS SECTION */}
        <div className="settings-card mb-3">
          <h2 className="section-title">Notifications</h2>

          <div className="form-check form-switch d-flex justify-content-between align-items-center mb-3">
            <label className="form-check-label">Motion detected</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifyMotion}
              onChange={() => setNotifyMotion(!notifyMotion)}
            />
          </div>

          <div className="form-check form-switch d-flex justify-content-between align-items-center mb-3">
            <label className="form-check-label">Person detected</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifyPerson}
              onChange={() => setNotifyPerson(!notifyPerson)}
            />
          </div>

          <div className="form-check form-switch d-flex justify-content-between align-items-center">
            <label className="form-check-label">Record continuously</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={recordAlways}
              onChange={() => setRecordAlways(!recordAlways)}
            />
          </div>
        </div>

        {/* ACCOUNT SECTION */}
        <div className="settings-card mb-4">
          <h2 className="section-title">Account</h2>
          <label className="form-label">Email</label>
          <input type="email" className="form-control mb-3" placeholder="you@example.com" />
          <button className="btn btn-outline btn-sm">Change password</button>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      <style jsx>{`
        .settings-card {
          background: var(--color-bg-soft, #f5f6f8);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .section-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .form-check-input {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}