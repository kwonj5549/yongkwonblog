
import ClientHomePage from "./ClientHomePage";
import { getAllPosts } from "@/lib/wordpress";

export default async function HomePage() {
  const posts = await getAllPosts();
  return <ClientHomePage posts={posts} />;
}