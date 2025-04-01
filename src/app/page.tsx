"use client";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Home = () => {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
      <div className="bg-cream">
        {/* Hero section with photo and intro */}
        <section className="py-20 pb-35 border-b border-gray-200 bg-gradient-to-b from-white to-cream">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-2/5 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/10 rounded-full transform rotate-3 transition-all duration-300 group-hover:rotate-1"></div>
                  <div className="relative overflow-hidden rounded-full shadow-xl border-2 border-white">
                    <Image
                        src="/YongKwonProfile.png"
                        alt="Yong Kwon"
                        width={256}
                        height={256}
                        className="w-64 h-64 object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg border border-gray-200">
                    <div className="text-primary text-2xl font-serif">YK</div>
                  </div>
                </div>
              </div>
              <div className="md:w-3/5">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif">
                  <span className="text-primary">Insights</span> & <span className="text-primary">Strategies</span>
                  <br />
                 for Today&apos;s Market
                </h1>
                <p className="text-xl text-gray-700 mb-6 font-sans max-w-xl">
                  Welcome to my blog, where I share professional insights and strategic perspectives on mergers, acquisitions, and corporate finance.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button asChild size="lg" className="rounded-sm shadow-md">
                    <Link href="/blog">Read My Blog</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-sm border-2">
                    <Link href="/about">About Me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About me section */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold">About Me</h2>
              <Button asChild variant="ghost" className="gap-1">
                <Link href="/about" className="flex items-center">
                  Learn more <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 prose">
                <p>
                  Yong Kwon is an experienced accountant and consultant specialized in exit planning, valuation consulting and M&A transaction advisory services to various clients, ranging from Korean public companies to family-owned businesses in diversified industries. He has provided both buy-side and sell-side advisory to assist clients in M&A transactions. Yong has performed the valuation consulting services including business valuations, Merger and Acquisition (M&A) valuations, and purchase price allocation analyses. Through his experiences including valuation, accounting, taxation, M&A and financing, he consults business value growth and personnel financial planning.
                </p>
                <div>
                  <b>Areas of Special Emphasis</b>
                  <p className="!mt-0">
                    M&amp;A, Valuation, Exit Planning, Financial Planning, Family Office, Retirement Plans, Private Accounting, Assurance, International Taxes
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="classic-card p-5">
                  <h3 className="text-lg font-bold mb-3">Designations and Certifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Certified Public Accountant (CPA)</li>
                    <li>Personal Financial Specialist (PFS)</li>
                    <li>Accredited in Business Valuation (ABV)</li>
                    <li>Certified Valuators and Analysts (CVA)</li>
                    <li>Certified Merger and Acquisition Advisor (CM&amp;AA)</li>
                    <li>Certified Exit Planning Advisor (CEPA)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured post */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold">Featured Post</h2>
            </div>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>

        {/* Recent posts */}
        <section className="py-16 bg-white border-t border-b border-gray-200">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold">Recent Posts</h2>
              <Button asChild variant="ghost" className="gap-1">
                <Link href="/blog" className="flex items-center">
                  View all <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <Newsletter />
      </div>
  );
};

export default Home;
