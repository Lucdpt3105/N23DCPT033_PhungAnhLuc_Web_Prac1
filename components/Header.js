import Link from "next/link";

export default function Header() {
  const currentDate = "Tuesday, October 29, 2024";

  const categories = [
    { name: "All Stories", href: "/" },
    { name: "World News", href: "#world-news" },
    { name: "Politics", href: "#latest-news" },
    { name: "Business", href: "#latest-news" },
    { name: "Technology", href: "#technology-news" },
    { name: "Health", href: "#latest-news" },
    { name: "Sports", href: "#latest-news" },
    { name: "Culture", href: "#hero" },
    { name: "Podcasts", href: "#podcasts" },
  ];

  return (
    <header className="w-full bg-white text-zinc-900 border-b border-zinc-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="font-medium text-zinc-600">{currentDate}</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:text-zinc-900 flex items-center gap-1.5 font-medium transition">
            <span>The Menu</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            aria-label="Search"
            className="hover:text-zinc-900 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Masthead Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-center relative">
        <Link href="/" className="group text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tighter text-zinc-950 group-hover:opacity-90 transition">
            The NEWS<span className="text-rose-600 font-sans">*</span>
          </h1>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-semibold mt-1">
            Global Daily Chronicle & Insights
          </p>
        </Link>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t border-zinc-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none flex items-center justify-center gap-5 sm:gap-8 py-2.5 text-xs uppercase tracking-wider font-semibold text-zinc-600">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="whitespace-nowrap hover:text-zinc-950 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-zinc-950 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
