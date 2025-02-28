import { PublicHeader } from "../components/Headers/PublicHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWithPublicHeader = () => (
    <div>
        <PublicHeader />
        <main>
            <Outlet />
        </main>
    </div>
);

export default LayoutWithPublicHeader;
