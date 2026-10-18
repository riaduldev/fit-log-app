"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = (
    <>
      <li>
        <Link
          href="/workouts"
          className={
            pathname === "/workouts"
              ? "text-[#C2F800] font-semibold"
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
              ? "text-[#C2F800] font-semibold"
              : ""
          }
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="w-full bg-base-100 shadow-sm">
      <div className="navbar mx-auto flex min-h-16 w-full max-w-7xl flex-nowrap px-2 sm:px-4 lg:px-6">

        {/* Navbar Start */}
        <div className="navbar-start w-auto flex-1 min-w-0">
          <div className="dropdown shrink-0">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open navigation menu"
              className="btn btn-ghost btn-sm lg:hidden"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
            >
              {navLinks}
            </ul>
          </div>

          <div className="flex min-w-0 items-center">
            <Image
              src="/assets/logo.png"
              width={30}
              height={30}
              alt="FitLog logo"
              className="h-[30px] w-[30px] shrink-0 object-contain"
            />

            <Link
              href="/"
              className="btn btn-ghost shrink-0 px-1.5 text-lg sm:px-2 sm:text-xl"
            >
              FITLOG
            </Link>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden w-auto flex-none lg:flex">
          <ul className="menu menu-horizontal flex-nowrap px-1">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        {/* Navbar End */}
<div className="navbar-end w-auto flex-1 min-w-0">
  <div className="flex w-full items-center justify-end gap-2 sm:gap-4">

    {/* Plan Badge */}
    <Link
      href="/myplan"
      className="flex shrink-0 items-center gap-2 rounded-full bg-[#CCFF00] px-3 py-1.5 text-sm font-semibold text-black transition-transform hover:scale-105"
    >
      <span>Plan</span>
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/10 px-1 text-xs font-bold">
        0
      </span>
    </Link>

    {/* Saved Badge */}
    <button
      type="button"
      className="flex shrink-0 items-center gap-2 rounded-full border border-[#CCFF00] px-3 py-1.5 text-sm font-semibold text-base-content transition-colors hover:bg-[#CCFF00]/10"
    >
      <span>Saved</span>
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#CCFF00] px-1 text-xs font-bold">
        0
      </span>
    </button>

  </div>
</div>

      </div>
    </header>
  );
};

export default Navbar;