// app/api/searchPosts/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const perPage = searchParams.get("per_page") || "9";
    const page = searchParams.get("page") || "1";
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(
        `${apiUrl}/posts?_embed&search=${encodeURIComponent(q)}&per_page=${perPage}&page=${page}`
    );
    if (!res.ok) {
        return NextResponse.error();
    }
    const posts = await res.json();
    const totalPages = res.headers.get("X-WP-TotalPages") || "1";
    return NextResponse.json({ posts, totalPages });
}
