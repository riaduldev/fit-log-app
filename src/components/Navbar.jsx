
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  // Read workout counts from localStorage
  useEffect(() => {
    const updateCounts = () => {
      try {
        const plan = JSON.parse(
          localStorage.getItem("fitlog-todays-plan") || "[]"
        );

        const saved = JSON.parse(
          localStorage.getItem("fitlog-saved-workouts") || "[]"
        );

        setPlanCount(Array.isArray(plan) ? plan.length : 0);
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setPlanCount(0);
        setSavedCount(0);
      }
    };

    updateCounts();

    // Update when WorkoutActions changes localStorage
    window.addEventListener("fitlog-updated", updateCounts);

    // Also update when another tab changes localStorage
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("fitlog-updated", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, [pathname]);

  const navLinks = (
    <>
      <li>
        <Link
          href="/workouts"
          className={
            pathname === "/workouts" ||
            pathname.startsWith("/workouts/")
              ? "font-semibold text-[#C2F800]"
              : ""
          }
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/myplan"
          className={
            pathname === "/myplan"
              ? "font-semibold text-[#C2F800]"
              : ""
          }
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#222630]/95 text-white shadow-lg backdrop-blur-xl">
      <div className="navbar mx-auto min-h-16 w-full max-w-7xl flex-nowrap px-2 sm:px-4 lg:px-6">

        {/* Navbar Start */}
        <div className="navbar-start min-w-0 flex-1">
          {/* Mobile Menu */}
          <div className="dropdown shrink-0">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open navigation menu"
              className="btn btn-ghost btn-sm text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-2xl border border-white/10 bg-[#292E39] p-3 text-white shadow-xl"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="ml-1 flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/assets/logo.png"
              width={34}
              height={34}
              alt="FitLog logo"
              className="h-[30px] w-[30px] shrink-0 object-contain sm:h-[34px] sm:w-[34px]"
            />

            <span className="text-lg font-black tracking-wider sm:text-xl">
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden flex-none lg:flex">
          <ul className="menu menu-horizontal flex-nowrap gap-2 px-1 text-sm font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end min-w-0 flex-1">
          <div className="flex w-full items-center justify-end gap-2 sm:gap-3">

            {/* Plan Count */}
            <Link
              href="/myplan"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#C2F800] px-3 py-2 text-xs font-extrabold text-[#222630] transition hover:bg-[#d7ff4b] sm:gap-2 sm:px-4 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 4h8m-9 4h10M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
                />
              </svg>

              <span>Plan</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#222630]/10 px-1 text-[11px] font-black">
                {planCount}
              </span>
            </Link>

            {/* Saved Count */}
            <div
              aria-label={`${savedCount} saved workouts`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-white sm:gap-2 sm:px-4 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-4 w-4 text-[#C2F800]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z"
                />
              </svg>

              <span>Saved</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800]/10 px-1 text-[11px] font-black text-[#C2F800]">
                {savedCount}
              </span>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
