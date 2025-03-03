import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const UserGuide = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">User Guide</h1>

            {/* Getting Started Section */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Getting Started
                    </h2>
                    <p className="mb-4">
                        Welcome to our website protection platform! This guide
                        will help you set up and manage your website's security
                        effectively.
                    </p>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">
                            Quick Start Steps:
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Register and verify your account</li>
                            <li>Add your website domain in the dashboard</li>
                            <li>Install our protection script</li>
                            <li>Configure your security settings</li>
                            <li>Monitor your website's security status</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            {/* Integration Guide */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Website Integration
                    </h2>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium">
                            Adding Protection to Your Website
                        </h3>
                        <p className="mb-4">
                            Copy and paste the following script tag into your
                            website's &lt;head&gt; section:
                        </p>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code>{`<script src="https://api.yourplatform.com/protect.js" 
        data-site-id="YOUR_SITE_ID"
        async defer>
</script>`}</code>
                        </pre>
                        <p className="mt-4">
                            Replace YOUR_SITE_ID with the unique identifier from
                            your dashboard.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Troubleshooting Guide */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Troubleshooting Guide
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Script Not Loading
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Verify that your site ID is correct</li>
                                    <li>
                                        Check if the script URL is accessible
                                    </li>
                                    <li>
                                        Ensure your domain is properly verified
                                    </li>
                                    <li>
                                        Check your browser's console for any
                                        error messages
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Protection Not Active
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Confirm your subscription is active</li>
                                    <li>
                                        Verify your security settings in the
                                        dashboard
                                    </li>
                                    <li>
                                        Check if your website's SSL certificate
                                        is valid
                                    </li>
                                    <li>
                                        Ensure your website's firewall isn't
                                        blocking our service
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Dashboard Connection Issues
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Check your internet connection</li>
                                    <li>Clear your browser cache</li>
                                    <li>Try logging out and back in</li>
                                    <li>
                                        Ensure you're using a supported browser
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
                <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Best Practices
                    </h2>
                    <div className="space-y-4">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Regularly monitor your security dashboard</li>
                            <li>
                                Keep your contact information up to date for
                                security alerts
                            </li>
                            <li>
                                Review and update your security settings monthly
                            </li>
                            <li>Set up automated security reports</li>
                            <li>
                                Enable two-factor authentication for your
                                account
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserGuide;
