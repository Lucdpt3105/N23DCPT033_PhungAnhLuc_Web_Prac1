import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-zinc-950 text-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-200 pb-8">
          <Link href="/" className="inline-block">
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tighter text-zinc-950">
              The NEWS<span className="text-rose-600 font-sans">*</span>
            </h2>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider font-semibold text-zinc-600">
            <Link href="/" className="hover:text-zinc-950">About Us</Link>
            <Link href="/" className="hover:text-zinc-950">Editorial Policy</Link>
            <Link href="/" className="hover:text-zinc-950">Contact</Link>
            <Link href="/" className="hover:text-zinc-950">Careers</Link>
            <Link href="/" className="hover:text-zinc-950">Privacy Notice</Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 inline-block"></span>
            <span>Copyright © 2024 - The News - All rights reserved</span>
          </div>

          <div className="flex items-center gap-5 text-zinc-600">
            {["Instagram", "LinkedIn", "YouTube", "Twitter/X", "Reddit"].map((network) => (
              <span
                key={network}
                className="hover:text-zinc-950 cursor-pointer transition font-medium"
              >
                {network}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
