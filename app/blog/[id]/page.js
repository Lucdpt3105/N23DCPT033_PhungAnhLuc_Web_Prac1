import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import BlogCard from "@/components/BlogCard";
import { enrichPost, FALLBACK_POSTS } from "@/lib/postUtils";

async function getPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch post #${id}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`Post #${id} fetch failed, checking fallback dataset:`, error.message);
    const fallback = FALLBACK_POSTS.find((p) => p.id === Number(id));
    return (
      fallback || {
        userId: 1,
        id: Number(id) || 1,
        title: "A deep dive into the influence of cultural movements on contemporary society",
        body: "Examining foundational dynamics reveals subtle shifts in policy, digital communication, and community engagement across global institutions.",
      }
    );
  }
}

async function getRelatedPosts(currentId) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch related posts");
    const posts = await res.json();
    return posts
      .filter((p) => p.id !== Number(currentId))
      .slice(0, 3)
      .map(enrichPost);
  } catch {
    return FALLBACK_POSTS.filter((p) => p.id !== Number(currentId))
      .slice(0, 3)
      .map(enrichPost);
  }
}


export default async function BlogDetailPage({ params }) {
  // Await params for Next.js 15+ App Router compatibility
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const rawPost = await getPost(id);
  if (!rawPost) {
    notFound();
  }

  const post = enrichPost(rawPost);
  const relatedPosts = await getRelatedPosts(id);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Back Navigation Button (Mandatory Lab Requirement) */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-rose-600 transition group py-1"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back To Blog</span>
        </Link>
      </div>

      {/* 2. Article Header & Metadata */}
      <header className="space-y-4 border-b border-zinc-200 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge label={post.category} color={post.categoryColor} />
          <span className="text-xs text-zinc-400 font-medium">•</span>
          <span className="text-xs text-zinc-500 font-medium">
            Published {post.publishDate}
          </span>
          <span className="text-xs text-zinc-400 font-medium">•</span>
          <span className="text-xs text-zinc-500 font-medium">
            {post.readTime} Read
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 leading-tight capitalize">
          {post.title}
        </h1>

        {/* Author Byline */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-serif font-bold text-sm">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 leading-tight">
                {post.author}
              </p>
              <p className="text-xs text-zinc-500">
                Staff Writer / Contributor • User #{post.userId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 text-xs">
            <button className="hover:text-zinc-900 transition flex items-center gap-1 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Featured Editorial Image */}
      <div className="rounded-xl overflow-hidden aspect-[16/9] bg-zinc-100 shadow-md">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* 4. Article Editorial Body */}
      <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed space-y-6 pt-2">
        <p className="text-lg sm:text-xl font-serif text-zinc-900 leading-relaxed font-medium">
          {post.body}
        </p>

        <p>
          In contemporary discourse, the intersection between innovation and societal frameworks continues to redefine expectations globally. As cultural movements gain momentum, both institutions and individual communities find themselves re-evaluating long-held paradigms.
        </p>

        {/* Editorial Pull Quote */}
        <blockquote className="border-l-4 border-zinc-900 pl-5 py-2 my-6 font-serif italic text-xl text-zinc-950 bg-zinc-50 rounded-r">
          “Progress is not merely an acceleration of past trajectories, but an intentional recalibration of cultural values and collective responsibility.”
        </blockquote>

        <p>
          Examining the foundational dynamics reveals subtle shifts in policy, digital communication, and community engagement. By looking across disciplinary boundaries, researchers and analysts highlight how modern narratives are shaped by participatory culture and decentralized discourse.
        </p>

        <p className="text-zinc-600">
          As we look toward subsequent developments, sustaining open dialogues and transparent analytical frameworks remains vital for understanding where these cultural undercurrents will carry us next.
        </p>
      </div>

      {/* 5. Bottom Return to Blog button */}
      <div className="pt-8 border-t border-zinc-200 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white hover:bg-rose-600 font-semibold text-xs uppercase tracking-wider transition duration-200"
        >
          <span>← Back To Blog</span>
        </Link>
        <span className="text-xs text-zinc-400 font-medium">
          Article #{post.id} of 100
        </span>
      </div>

      {/* 6. SIMILAR STORIES Section */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t-2 border-zinc-950 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-serif font-black tracking-tight uppercase text-zinc-950">
              Similar Stories
            </h2>
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
            >
              Explore More →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
