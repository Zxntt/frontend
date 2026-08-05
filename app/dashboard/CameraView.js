"use client";

export default function CameraView() {
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

      <img
        src="/images/camera-placeholder.png"
        alt="Camera Preview"
        className="camera-image"
      />

      <p className="camera-note">
        Camera stream will appear here after connecting ESP32-CAM.
      </p>

    </div>
  );
}