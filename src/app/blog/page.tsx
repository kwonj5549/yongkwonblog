
import ClientBlogsPage from "./ClientBlogsPage";
import { getAllPosts } from "@/lib/wordpress";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <ClientBlogsPage posts={posts} />;
}