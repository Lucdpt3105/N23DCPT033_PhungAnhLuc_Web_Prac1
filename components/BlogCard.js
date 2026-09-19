import Link from "next/link";
import Badge from "./Badge";

export default function BlogCard({ post }) {
  const category = post.category || "TECHNOLOGY";
  const categoryColor = post.categoryColor || "indigo";
  const author = post.author || `User #${post.userId}`;
  const publishDate = post.publishDate || "Sep 9, 2024";
  const imageUrl =
    post.imageUrl ||
    `https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80`;

  return (
    <article className="group flex flex-col bg-white border border-zinc-200 hover:border-zinc-300 rounded-lg overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Card Thumbnail Image */}
      <Link href={`/blog/${post.id}`} className="relative block aspect-[16/10] overflow-hidden bg-zinc-100">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge label={category} color={categoryColor} />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Author & Date Metadata */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
          <span>{author}</span>
          <span>•</span>
          <span>{publishDate}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-zinc-900 leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors mb-2 capitalize">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt Body */}
        <p className="text-zinc-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {post.body}
        </p>

        {/* Card Action Footer */}
        <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
          <span className="text-zinc-400 font-medium">
            User #{post.userId}
          </span>
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-rose-600 transition"
          >
            <span>Read Article</span>
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
