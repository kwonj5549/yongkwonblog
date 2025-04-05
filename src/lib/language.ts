// src/lib/language.ts

export function parseLanguageFromCookie(lang: string | undefined): "en" | "ko" {
  return lang === "ko" ? "ko" : "en";
}
