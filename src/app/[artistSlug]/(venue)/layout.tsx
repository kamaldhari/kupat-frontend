"use client";

import ReactFullpage from "@fullpage/react-fullpage";
import React, { useEffect, useState } from "react";

export default function Vanuelayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
    }, []);

    return isMobile ? (
        <ReactFullpage
            licenseKey={"YOUR_KEY_HERE"}
            scrollingSpeed={400}
            credits={{ enabled: false }}
            render={({ fullpageApi }) => {
                if (typeof fullpageApi !== "undefined") {
                    fullpageApi.silentMoveTo(1);
                }
                return (
                    <main className="hello" suppressHydrationWarning={true}>
                        <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>
                    </main>
                );
            }}
        />
    ) : (
        <main suppressHydrationWarning={true}>{children}</main>
    );
}
