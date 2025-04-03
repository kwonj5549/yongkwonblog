// app/api/searchPosts/route.ts
import { NextResponse } from "next/server";
import he from "he";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const perPage = searchParams.get("per_page") || "9";
    const page = searchParams.get("page") || "1";
    const tags = searchParams.get("tags") || ""; // Expecting a comma-separated list of tag/category names
    const apiUrl = process.env.WORDPRESS_API_URL;

    // Build the URL to fetch posts from WordPress
    const url = `${apiUrl}/posts?_embed&search=${encodeURIComponent(
        q
    )}&per_page=${perPage}&page=${page}`;
    const res = await fetch(url);

    if (!res.ok) {
        return NextResponse.error();
    }

    let posts = await res.json();

    // If tags are provided, filter posts by matching category names.
    if (tags) {
        const tagList = tags.split(",").map((t) => t.trim().toLowerCase());
        posts = posts.filter((post: any) => {
            // Extract categories from embedded data.
            const categories =
                post._embedded?.["wp:term"]?.flat().filter((term: any) => term.taxonomy === "category") || [];
            // Decode the category name before comparing.
            return categories.some((cat: any) =>
                tagList.includes(he.decode(cat.name).toLowerCase())
            );
        });
    }

    // Get the total pages from the response headers (this may not reflect the tag filter)
    const totalPages = res.headers.get("X-WP-TotalPages") || "1";
    return NextResponse.json({ posts, totalPages });
}
