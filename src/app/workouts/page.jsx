
import HeroSection from "../../components/HeroSection";
import WorkoutCard from "../../components/WorkOutCard";

const FITLOG_API_URL = "https://api.abcz.workers.dev/api/fitlog";

const getFitLog = async () => {
  const response = await fetch(FITLOG_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch FitLog data: ${response.status}`
    );
  }

  return response.json();
};

const WorkOutPage = async () => {
  const result = await getFitLog();

  const workouts = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : [];

  return (
    <main className="min-h-screen overflow-hidden bg-[#222630] text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Library Section */}
      <section
        id="library"
        className="relative isolate px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#C2F800]/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#C2F800]" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C2F800]">
                  Your Training Starts Here
                </p>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
                The{" "}
                <span className="text-[#C2F800]">
                  Library
                </span>
                <span className="text-[#C2F800]">.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Twelve lifts covering every major muscle
                group. Explore the exercises, build strength,
                and train with intent.
              </p>
            </div>

            {/* Workout Counter */}
            <div className="flex w-full items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:w-fit sm:min-w-56 sm:justify-start sm:p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Available Exercises
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#C2F800]">
                    {String(workouts.length).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-gray-500">
                    Workouts
                  </span>
                </div>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#C2F800]/20 bg-[#C2F800]/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-7 w-7 text-[#C2F800]"
                  aria-hidden="true"
                >
                  <path d="M6 5v14M18 5v14M3 9v6M21 9v6M6 12h12" />
                </svg>
              </div>
            </div>
          </div>

          {/* Grid Header */}
          <div className="mb-6 flex items-center justify-between border-y border-white/10 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-300 sm:text-sm">
              Exercise Collection
            </p>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#C2F800]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 sm:text-xs">
                Training Mode
              </span>
            </div>
          </div>

          {/* Workout Cards */}
          {workouts.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-16 text-center sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2F800]/10 text-[#C2F800]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-8 w-8"
                  aria-hidden="true"
                >
                  <path d="M6 5v14M18 5v14M3 9v6M21 9v6M6 12h12" />
                </svg>
              </div>

              <h2 className="mt-5 text-xl font-bold">
                No Workouts Found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                No exercises are available right now.
                Please try again later.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default WorkOutPage;
