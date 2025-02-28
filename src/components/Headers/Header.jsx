import React from "react";
import { WebsiteSwitcher } from "./components/WebsiteSwitcher";
import { UserProfileDropdown } from "./components/UserProfileDropdown";

const Header = () => {
    return (
        <header className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
            <div className="ml-5 hidden md:block">
                <WebsiteSwitcher />
            </div>
            <div className="flex items-center gap-2">
                <UserProfileDropdown />
            </div>
        </header>
    );
};

export default Header;
