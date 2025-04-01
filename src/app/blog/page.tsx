"use client"
import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(
    post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6 text-center">Blog Articles</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-10">
            Explore my collection of articles on web development, design, and technology.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="container-custom py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No articles found</h2>
            <p className="text-gray-600">
              Try different keywords or browse all articles by clearing the search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
