import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#222630] px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-xl text-center">

        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56">
          <div className="absolute inset-0 rounded-full border border-[#C2F800]/20" />
          <div className="absolute inset-4 rounded-full border border-dashed border-[#C2F800]/30" />

          <span className="text-7xl font-black tracking-tighter text-[#C2F800] sm:text-8xl">
            404
          </span>

          <span className="absolute right-3 top-5 h-3 w-3 rounded-full bg-[#C2F800] shadow-[0_0_20px_#C2F800]" />
          <span className="absolute bottom-7 left-2 h-2 w-2 rounded-full bg-white/40" />
        </div>

        {/* Message */}
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C2F800]">
          Lost your way?
        </p>

        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Page Not <span className="text-[#C2F800]">Found</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          Looks like this page skipped leg day and disappeared.
          Let&apos;s get you back to your workout routine.
        </p>

        {/* Home Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C2F800] px-7 py-3.5 text-sm font-black text-[#222630] transition duration-300 hover:scale-[1.03] hover:bg-[#d8ff4d]"
          >
            <span aria-hidden="true">←</span>
            Back to Workouts
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            FIT<span className="text-[#C2F800]">LOG</span> — Train hard, log honest.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;