import { PublicHeader } from "../components/Headers/PublicHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWithPublicHeader = () => (
    <div className="min-h-screen bg-[rgb(1,20,49)]">
        <PublicHeader />
        <main>
            <Outlet />
        </main>
    </div>
);

export default LayoutWithPublicHeader;
