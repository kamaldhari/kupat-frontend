"use client";
import Header from "@/components/common/Header";
import gsap from "gsap";
import React, { useEffect } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        const minLoadingTime = 0;
        const startLoadingTime = Date.now();

        // Page loader animation
        let loading = gsap.timeline({
            // delay: 1,
        });

        loading.to(
            ".cls-2.bottom-path",
            {
                duration: 2,
                strokeDashoffset: "0px",
            },
            ""
        );

        loading.to(
            ".cls-2.top-path",
            {
                duration: 2,
                strokeDashoffset: "0px",
            },
            ""
        );

        loading.to(
            ".cls-1.svg-char",
            {
                duration: 0.3,
                transform: "translateY(0%)",
                stagger: {
                    amount: -1.5,
                },
            },
            ""
        );

        loading.to(
            ".cls-3.dashed-path",
            {
                duration: 0.5,
                transform: "translateY(0%)",
            },
            "-=0.5"
        );
        // Ensure the minimum loading time
        const endLoadingTime = () => {
            const loadTime = Date.now() - startLoadingTime;
            const remainingTime = minLoadingTime - loadTime;

            if (remainingTime > 0) {
                setTimeout(finishLoading, remainingTime);
            } else {
                finishLoading();
            }
        };

        function finishLoading() {
            gsap.to(".loader-wrap", {
                autoAlpha: 0,
                duration: 0.5,
            });

            gsap.to("#app", {
                duration: 0.5,
                autoAlpha: 1,
                onComplete: afterAnim,
            });
        }

        function afterAnim() {
            // GSAP animations and loading logic
        }

        loading.eventCallback("onComplete", endLoadingTime);
        window.scrollTo(0, 0);
    });

    return (
        <div id="app" suppressHydrationWarning={true}>
            <Header />
            <main suppressHydrationWarning={true}>{children}</main>
        </div>
    );
};

export default Layout;
