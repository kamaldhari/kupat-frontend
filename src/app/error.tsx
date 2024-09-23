"use client";

import AnimatedAntButton from "@/components/common/AnimatedAntButton";

export default function GlobalError({ reset }: { readonly reset: () => void }) {
    return (
        <html lang="he" dir="rtl">
            <body>
                <div className="something-wrong-wrapper">
                    <div className="container something-wrong">
                        <h1>משהו השתבש. אנא נסה לרענן את הדף.</h1>
                        <AnimatedAntButton onclick={() => reset()} dynamicClass={"cta_btn btn-dark"}>
                            לְרַעֲנֵן
                        </AnimatedAntButton>
                    </div>
                </div>
            </body>
        </html>
    );
}
