"use client";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleString("th-TH", {
          dateStyle: "full",
          timeStyle: "medium",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="topbar">

      <div>
        <h2>Smart CCTV Dashboard</h2>
        <p>Security Monitoring System</p>
      </div>

      <div className="topbar-right">

        <span className="status online">
          ● Online
        </span>

        <div className="clock">
          {time}
        </div>

      </div>

    </div>
  );
}