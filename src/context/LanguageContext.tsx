"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

export type Language = "en" | "ko";

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
    children: ReactNode;
    initialLanguage?: Language;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children, initialLanguage = "en" }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(initialLanguage);

    // On mount, check localStorage for the saved language.
    useEffect(() => {
        const storedLang = localStorage.getItem("language") as Language | null;
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    // Update localStorage and cookie whenever language changes.
    useEffect(() => {
        localStorage.setItem("language", language);
        Cookies.set("lang", language, { expires: 365 });
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextProps => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
