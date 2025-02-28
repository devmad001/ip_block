import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Headers/Header";
import Sidebar from "../components/Layout/Sidebar";

const LayoutWithSidebar = () => (
    <div className="h-screen">
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 h-full overflow-y-scroll max-h-full">
                <Header />
                <main className=" p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    </div>
);

export default LayoutWithSidebar;
