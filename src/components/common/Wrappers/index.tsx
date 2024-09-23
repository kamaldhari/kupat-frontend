"use client";

import React, { useEffect, useState } from 'react';

export const PageWrapper = ({ children, classes }: {
    children: React.ReactNode;
    classes: string;
}) => {
    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAddClass(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${classes} ${addClass ? "current-page" : ""}`}>
            {children}
        </div>
    );
}
