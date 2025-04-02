// src/components/BackButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2"
        >
            <ArrowLeft size={16} /> Back
        </Button>
    );
}
