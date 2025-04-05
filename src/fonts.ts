// src/fonts.ts
import { Noto_Sans_KR } from "next/font/google";

export const notoSansKR = Noto_Sans_KR({
    weight: ["400", "700"],
    subsets: ["latin", "korean"],
    variable: "--font-noto-sans-kr",
});
