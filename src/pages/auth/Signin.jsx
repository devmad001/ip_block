import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { z } from "zod";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSubmit = async (e) => {
        alert("asdf");
        e.preventDefault();
        setIsLoading(true);

        const validation = signInSchema.safeParse(formData);
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
            });
            setIsLoading(false);
            return;
        }

        try {
            await login(formData.email, formData.password);
            toast.success("Sign in successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message || "An error occurred during sign-in.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-6">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Sign in
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and password to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="w-full"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <Button
                                disabled={isLoading}
                                className="w-full"
                                type="submit">
                                {isLoading ? "Signing in..." : "Sign In"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <GoogleSignInButton />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
