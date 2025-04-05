// src/lib/wordpress.ts
import mongoose from "mongoose";

export interface WPPost {
    id?: number; // for WP posts
    wordpressId?: number; // for translated posts in MongoDB
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    jetpack_featured_media_url?: string;
    _embedded?: {
        "wp:term"?: Array<
            Array<{
                id: number;
                name: string;
                taxonomy: string;
            }>
        >;
    };
    translatedTitle?: string;
    translatedExcerpt?: string;
    translatedContent?: string;
    // ...other fields as needed
}

/**
 * Ensure that MongoDB is connected.
 */
async function connectToMongo() {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI!);
}

// Define a Mongoose schema/model for posts (original and translated stored together)
const postSchema = new mongoose.Schema({
    wordpressId: { type: Number, unique: true },
    title: String,
    excerpt: String,
    content: String,
    translatedTitle: String,
    translatedExcerpt: String,
    translatedContent: String,
    date: Date,
    slug: String,
});
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

/**
 * Get a translated post by its slug from MongoDB.
 * Uses a case-insensitive search for robustness.
 */
export async function getTranslatedPostBySlug(slug: string): Promise<WPPost | null> {
    await connectToMongo();
    // Use a regular expression for a case-insensitive match on the slug.
    const result = await Post.findOne({ slug: { $regex: new RegExp(`^${slug}$`, "i") } }).lean();
    return result as unknown as WPPost | null;
}

/**
 * Get all translated posts from MongoDB.
 * Only returns posts that have a non-empty translatedTitle.
 */
export async function getAllTranslatedPosts(): Promise<WPPost[]> {
    await connectToMongo();
    const results = await Post.find({ translatedTitle: { $exists: true, $ne: "" } }).lean();
    return results as unknown as WPPost[];
}

/**
 * Get a post from WordPress by slug.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const posts: WPPost[] = await res.json();
    if (!posts || posts.length === 0) return null;
    return posts[0];
}

/**
 * Get all posts from WordPress.
 */
export async function getAllPosts(): Promise<WPPost[]> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    let page = 1;
    const perPage = 100; // maximum allowed per request
    let allPosts: WPPost[] = [];
    let fetchedPosts: WPPost[] = [];
    do {
        const res = await fetch(`${apiUrl}/posts?_embed&per_page=${perPage}&page=${page}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch posts");
        fetchedPosts = await res.json();
        allPosts = allPosts.concat(fetchedPosts);
        page++;
    } while (fetchedPosts.length === perPage);
    return allPosts;
}

/**
 * Get posts by page from WordPress.
 */
export async function getPostsByPage(page: number, perPage: number): Promise<WPPost[]> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?_embed&per_page=${perPage}&page=${page}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch posts for page ${page}`);
    }
    return res.json();
}

/**
 * Get total pages from WordPress.
 */
export async function getTotalPages(perPage: number): Promise<number> {
    const apiUrl = process.env.WORDPRESS_API_URL;
    const res = await fetch(`${apiUrl}/posts?_embed&per_page=${perPage}&page=1`, {
        next: { revalidate: 60 },
    });
    const totalPagesHeader = res.headers.get("X-WP-TotalPages");
    return totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;
}
