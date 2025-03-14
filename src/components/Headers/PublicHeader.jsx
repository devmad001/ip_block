// components/public-header.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Button } from "../ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "../../lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className=" mx-auto flex h-20 items-center">
                <div className=" hidden md:flex">
                    <Link to="/" className="mr-4 flex items-center space-x-2">
                        <img
                            src="/miniripple-01.png"
                            alt="MiniRipple Logo"
                            className="h-20 w-40"
                        />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Desktop Navigation */}
                <div className="hidden flex-1 items-center justify-between md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={navLinkClass}>
                                    Features
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={navLinkClass}>
                                    Pricing
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/guide" className={navLinkClass}>
                                    User Guide
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-2">
                        {user ? (
                            <Link to="/dashboard">
                                <Button> Go to dashboard</Button>{" "}
                            </Link>
                        ) : (
                            <>
                                <Button asChild variant="outline">
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/register">Try now</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="absolute left-0 top-14 w-full border-t bg-background md:hidden">
                        <div className="container py-4">
                            <nav className="flex flex-col gap-4">
                                <Link
                                    to="/features"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                    Features
                                </Link>
                                <Link
                                    to="/pricing"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                    Pricing
                                </Link>
                                <Link
                                    to="/guide"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                    User Guide
                                </Link>

                                <div className="flex flex-col gap-2 pt-4">
                                    {user ? (
                                        <>
                                            <Button asChild variant="outline">
                                                <Link to="/dashboard">
                                                    Dashboard
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={logout}>
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild>
                                                <Link to="/login">Login</Link>
                                            </Button>
                                            <Button asChild variant="outline">
                                                <Link to="/signup">
                                                    Sign Up
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

const navLinkClass = cn(
    "text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2",
);
