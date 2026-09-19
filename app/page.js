import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Badge from "@/components/Badge";
import { enrichPost, FALLBACK_POSTS } from "@/lib/postUtils";

async function getPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("API fetch failed, utilizing fallback dataset:", error.message);
    return FALLBACK_POSTS;
  }
}


export default async function HomePage() {
  const rawPosts = (await getPosts()) || [];
  const posts = Array.isArray(rawPosts) ? rawPosts.map(enrichPost) : [];


  // Post 0 is the big Hero featured story
  const heroPost = posts[0];
  // Trending highlights row
  const trendingPosts = posts.slice(1, 5);
  // Main Lab 1 Grid (12 posts as specified in Lab PDF: posts.slice(0, 12))
  const mainGridPosts = posts.slice(1, 13);
  // Tech & Culture news highlights
  const techPosts = posts.slice(13, 17);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* 1. Trending Highlights Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-zinc-200">
        {trendingPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group flex items-center gap-3 p-2 rounded hover:bg-zinc-50 transition"
          >
            <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-zinc-100">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-wider block">
                {post.category}
              </span>
              <p className="text-xs text-zinc-700 font-serif font-semibold line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* 2. Hero Featured Article (The NEWS* Key Story) */}
      {heroPost && (
        <section id="hero" className="space-y-4">
          <Link
            href={`/blog/${heroPost.id}`}
            className="group block relative rounded-xl overflow-hidden aspect-[21/9] bg-zinc-900 shadow-md"
          >
            <img
              src={heroPost.imageUrl}
              alt={heroPost.title}
              className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Live Updates Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-rose-600 shadow">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              Live Updates
            </div>
          </Link>

          {/* Hero Metadata & Headline */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Badge label={heroPost.category} color={heroPost.categoryColor} />
                <Badge label={heroPost.author} color="gray" />
              </div>
              <div className="flex items-center gap-4 font-medium">
                <span>{heroPost.publishDate}</span>
                <span>•</span>
                <span>{heroPost.readTime}</span>
                <Link
                  href={`/blog/${heroPost.id}`}
                  className="font-semibold text-zinc-900 hover:text-rose-600 inline-flex items-center gap-1 transition"
                >
                  Read Article
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 leading-tight capitalize hover:text-rose-600 transition-colors">
              <Link href={`/blog/${heroPost.id}`}>
                {heroPost.title}
              </Link>
            </h2>

            <p className="text-zinc-600 text-base sm:text-lg max-w-4xl leading-relaxed line-clamp-2">
              {heroPost.body}
            </p>
          </div>
        </section>
      )}

      {/* 3. LATEST NEWS - Lab 1 Core Grid (Responsive Grid 1 / 2 / 3 cols) */}
      <section id="latest-news" className="space-y-6 pt-6 border-t-2 border-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight uppercase text-zinc-950">
              Latest News & Stories
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold">
              {mainGridPosts.length} Articles
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 cursor-pointer inline-flex items-center gap-1">
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        {/* Required Grid Layout from Lab PDF: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainGridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 4. TECHNOLOGY & INNOVATION SPOTLIGHT */}
      <section id="technology-news" className="space-y-6 pt-6 border-t border-zinc-200">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight uppercase text-zinc-950">
            Technology & Innovation
          </h2>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 cursor-pointer inline-flex items-center gap-1">
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5 font-medium">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-zinc-900 group-hover:text-rose-600 transition-colors line-clamp-2 capitalize">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
