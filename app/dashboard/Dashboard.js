"use client";

import "./dashboard.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CameraView from "./CameraView";
import StatusCards from "./StatusCards";
import EventHistory from "./EventHistory";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <CameraView />

        <StatusCards />

        <EventHistory />

      </div>

    </div>
  );
}