import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Home,
    LineChart,
    Settings,
    Users,
    Mail,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);
    const location = useLocation();

    const menuItems = [
        { id: 1, title: "Overview", icon: Home, href: "/dashboard" },
        {
            id: 2,
            title: "Reports",
            icon: LineChart,
            href: "/dashboard/reports",
        },
        {
            id: 3,
            title: "Real Time Analytics",
            icon: Users,
            href: "/dashboard/real-time-analytics",
        },
        {
            id: 7,
            title: "Sessions",
            icon: Users,
            href: "/dashboard/sessions-details",
        },
        { id: 4, title: "Events", icon: Mail, href: "/dashboard/events" },
        {
            id: 6,
            title: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
        },
    ];

    return (
        <aside
            className={cn(
                "h-screen relative bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
                expanded ? "w-64" : "w-20",
            )}>
            <Button
                onClick={() => setExpanded((prev) => !prev)}
                className="absolute -right-3 top-6 bg-white text-black border border-gray-300 rounded-full p-1.5 hover:bg-gray-100 transition-colors">
                {expanded ? (
                    <ChevronLeft size={16} />
                ) : (
                    <ChevronRight size={16} />
                )}
            </Button>

            <div className="p-4 h-16 flex items-center border-b border-gray-200">
                <span
                    className={cn(
                        "ml-3 font-semibold text-gray-900 transition-opacity duration-200",
                        expanded ? "block" : "hidden",
                    )}>
                    Dashboard
                </span>
            </div>

            {/* Navigation Items */}
            <nav className="p-2 space-y-1">
                {menuItems.map((item) => (
                    <Link to={item.href} key={item.id}>
                        <Button
                            variant="ghost"
                            size={expanded ? "default" : "icon"}
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                                location.pathname === item.href
                                    ? "bg-blue-100 text-blue-600"
                                    : "hover:bg-gray-100 group",
                                expanded ? "justify-start" : "justify-center",
                            )}>
                            <item.icon
                                size={20}
                                className={cn(
                                    location.pathname === item.href
                                        ? "text-blue-600"
                                        : "text-gray-600 group-hover:text-blue-600",
                                )}
                            />
                            <span
                                className={cn(
                                    "ml-3 group-hover:text-blue-600 whitespace-nowrap transition-opacity duration-200",
                                    expanded ? "opacity-100" : "opacity-0 w-0",
                                    location.pathname === item.href
                                        ? "text-blue-600"
                                        : "text-gray-700",
                                )}>
                                {item.title}
                            </span>
                        </Button>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
