import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import {Language, LanguageProvider} from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cookies } from "next/headers";
import { parseLanguageFromCookie } from "@/lib/language";

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

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // Read the language cookie on the server.
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("lang")?.value;
    const initialLanguage: Language = parseLanguageFromCookie(cookieLang);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>
            <Layout>
                {children}
                <LanguageSwitcher />
            </Layout>
        </LanguageProvider>
        </body>
        </html>
    );
}
