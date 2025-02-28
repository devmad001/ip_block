import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import ProtectedRoute from "./middlewares/ProtectedRoute.jsx";
import SignUp from "./pages/auth/Siginup";
import SignIn from "./pages/auth/Signin";
import { Toaster } from "sonner";
import LayoutWithPublicHeader from "./layouts/LayoutWithPublicHeader";
import { AuthProvider } from "./contexts/authContext";
import UnProtectedRoute from "./middlewares/UnprotectedRoute";
import { WebsiteProvider } from "./contexts/websiteContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // for data fetching
import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Dashboard/Reports";
import RealTimePage from "./pages/Dashboard/RealTimeView";
import SessionList from "./pages/Dashboard/SessionList";
import SessionDetails from "./pages/Dashboard/SessionDetails";
import Settings from "./pages/Dashboard/Settings";
import EventsPage from "./pages/Dashboard/Events";

const queryClient = new QueryClient();
const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <WebsiteProvider>
                <Toaster />
                <Router>
                    <Routes>
                        <Route element={<LayoutWithPublicHeader />}>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/login"
                                element={
                                    <UnProtectedRoute>
                                        <SignIn />
                                    </UnProtectedRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <UnProtectedRoute>
                                        <SignUp />
                                    </UnProtectedRoute>
                                }
                            />
                            <Route path="/about" element={<About />} />
                        </Route>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <LayoutWithSidebar />
                                </ProtectedRoute>
                            }>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/dashboard/real-time-analytics"
                                element={<RealTimePage />}
                            />
                            <Route
                                path="/dashboard/reports"
                                element={<Reports />}
                            />
                            <Route
                                path="/dashboard/sessions-details"
                                element={<SessionList />}
                            />
                            <Route
                                path="/dashboard/sessions-details/:sessionId"
                                element={<SessionDetails />}
                            />
                            <Route
                                path="/dashboard/settings"
                                element={<Settings />}
                            />
                            <Route
                                path="/dashboard/events"
                                element={<EventsPage />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </WebsiteProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
