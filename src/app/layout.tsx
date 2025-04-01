// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout"; // Adjust the import path as needed

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BizConMnA",
    description: "BizConMnA by Yong Kwon",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // @ts-ignore
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {/* Wrap all pages with your custom Layout */}
        <Layout>{children}</Layout>
        </body>
        </html>
    );
}
