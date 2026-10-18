import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#222630] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/SVG.png"
            width={28}
            height={28}
            alt="FitLog Logo"
            className="h-7 w-7 object-contain"
          />

          <h4 className="text-lg font-black tracking-widest text-white">
            FIT<span className="text-[#C2F800]">LOG</span>
          </h4>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs leading-6 text-gray-400 sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library.{" "}
          <span className="text-gray-300">Train hard, log honest.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;