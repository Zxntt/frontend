"use client";

import { useState } from "react";
import { CameraVideoOff } from "react-bootstrap-icons";

export default function CameraView() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="camera-card">

      <div className="camera-header">
        <h3>📹 Live Camera</h3>

        <span className="camera-status">
          ● Camera Offline
        </span>
      </div>

      {/* ===================================================
          ESP32-CAM STREAM

          เมื่อต่อกล้องแล้ว
          เปลี่ยน src ด้านล่างเป็น

          http://192.168.1.xxx:81/stream

          ตัวอย่าง

          <img
              src="http://192.168.1.100:81/stream"
              className="camera-image"
          />

      ==================================================== */}

      <div className="camera-frame">
        {!imgError ? (
          <img
            src="/images/camera-placeholder.png"
            alt="Camera Preview"
            className="camera-image"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="camera-placeholder">
            <CameraVideoOff size={40} />
            <span>Waiting for ESP32-CAM stream…</span>
          </div>
        )}
      </div>

      <p className="camera-note">
        Camera stream will appear here after connecting ESP32-CAM.
      </p>

    </div>
  );
}
