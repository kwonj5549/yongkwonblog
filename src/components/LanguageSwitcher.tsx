"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ko" : "en");
    };

    // Display the current language
    const displayText = language === "en" ? "English" : "한국어";

    return (
        <div
            style={{
                position: "fixed",
                left: "20px",
                bottom: "20px",
                zIndex: 1000,
            }}
        >
            <button
                onClick={toggleLanguage}
                style={{
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                {displayText}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
