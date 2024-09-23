import Layout from "@/components/Layout";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
    title: "Kupat",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl" suppressHydrationWarning={true}>
            <head></head>
            <body suppressHydrationWarning={true}>
                <StoreProvider>
                    <Layout>{children}</Layout>
                </StoreProvider>
            </body>
        </html>
    );
}
