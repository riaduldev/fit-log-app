import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#0B0D10] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[320px] items-center gap-6 rounded-2xl border border-[#292D35] bg-[#15171C] px-6 py-8 sm:px-9 sm:py-10 md:grid-cols-[1.3fr_0.7fr] md:gap-8 lg:min-h-[380px] lg:px-12 lg:py-12">

          {/* Left Content */}
          <div className="order-2 md:order-1">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-[#C2F800]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Train with intent. Log
              <br className="hidden sm:block" /> every set.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-[#9CA3AF] sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <Link
              href="#library"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#C2F800] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#d4ff36] sm:text-sm"
            >
              BROWSE WORKOUTS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7 7l10 10M17 7v10H7" />
              </svg>
            </Link>
          </div>

          {/* Right Image */}
          <div className="order-1 flex h-full min-h-[180px] items-center justify-center md:order-2 md:min-h-[240px]">
            <Image
              src="/assets/banner.png"
              alt="Workout training illustration"
              width={600}
              height={450}
              priority
              sizes="(max-width: 767px) 80vw, (max-width: 1023px) 40vw, 35vw"
              className="h-auto max-h-[220px] w-full max-w-[260px] object-contain sm:max-h-[260px] md:max-h-[300px] lg:max-h-[320px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;