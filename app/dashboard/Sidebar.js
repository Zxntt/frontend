"use client";

import {
    House,
    CameraVideo,
    ClockHistory,
    Gear,
    BoxArrowRight
} from "react-bootstrap-icons";

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <h3 className="logo">
                SMART CCTV
            </h3>

            <ul>

                <li>
                    <House />
                    Dashboard
                </li>

                <li>
                    <CameraVideo />
                    Cameras
                </li>

                <li>
                    <ClockHistory />
                    History
                </li>

                <li>
                    <Gear />
                    Settings
                </li>

                <li>
                    <BoxArrowRight />
                    Logout
                </li>

            </ul>

        </aside>

    );

}