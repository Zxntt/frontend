"use client";

import {
    House,
    CameraVideo,
    ClockHistory,
    Gear,
    BoxArrowRight
} from "react-bootstrap-icons";

const links = [
    { icon: <House />, label: "Dashboard" },
    { icon: <CameraVideo />, label: "Cameras" },
    { icon: <ClockHistory />, label: "History" },
    { icon: <Gear />, label: "Settings" },
];

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <h3 className="logo">
                SMART CCTV
            </h3>

            <ul>

                {links.map((item, i) => (
                    <li key={item.label} className={i === 0 ? "active" : ""}>
                        {item.icon}
                        {item.label}
                    </li>
                ))}

                <li className="logout">
                    <BoxArrowRight />
                    Logout
                </li>

            </ul>

        </aside>

    );

}
