export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className=" px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-2 ">
                        <h4 className="font-semibold text-2xl">MiniRipple</h4>
                        <p className="text-muted-foreground max-w-sm">
                            Privacy-focused web analytics that Block Ip address
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2  ">
                            <h4 className="font-semibold">Product</h4>
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary">
                                        Documentation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2 ">
                            <h4 className="font-semibold">Legal</h4>
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-primary">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © 2025 Ip Block Analytics. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
