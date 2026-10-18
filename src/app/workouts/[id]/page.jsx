
import WorkoutActions from "../../../components/WorkoutActions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  const result = await response.json();
  const payload = result?.data ?? result?.workout ?? result;

  if (Array.isArray(payload)) {
    return payload.find((item) => String(item.id) === String(id)) ?? null;
  }

  return payload;
}

export default async function DetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout || !workout.name) {
    notFound();
  }

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment || "N/A" },
    { label: "DIFFICULTY", value: workout.difficulty || "N/A" },
    { label: "SETS", value: workout.sets ?? "N/A" },
    { label: "REPS", value: workout.reps ?? "N/A" },
    { label: "DURATION", value: `${workout.duration ?? 0} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned ?? 0} kcal` },
    { label: "RATING", value: Number(workout.rating ?? 0).toFixed(1) },
  ];

  return (
    <main className="min-h-screen bg-[#222630] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#C2F800]"
        >
          <span aria-hidden="true">←</span>
          Back to Library
        </Link>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* LEFT: Workout Visual */}
          <div className="lg:sticky lg:top-8">
            <div className="relative aspect-[4/5] min-h-[340px] max-h-[780px] overflow-hidden rounded-2xl border border-white/10 bg-[#191C23] sm:rounded-3xl">
              {workout.image ? (
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No workout image available
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#191C23] via-transparent to-black/20" />

              {/* Image Label */}
              <div className="absolute left-5 top-5">
                <span className="rounded-lg border border-[#C2F800]/30 bg-[#222630]/90 px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#C2F800] backdrop-blur">
                  FITLOG / WORKOUT
                </span>
              </div>

              {/* Image Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2F800]">
                  EXERCISE {String(workout.id).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">
                  Train with intent.
                </h2>

                <p className="mt-2 text-sm text-gray-300">
                  Build strength. Stay consistent.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Workout Details */}
          <div className="min-w-0">
            {/* Heading */}
            <div className="mb-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="h-0.5 w-8 bg-[#C2F800]" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2F800]">
                  Workout Details
                </span>
              </div>

              <h1 className="break-words text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl xl:text-5xl">
                {workout.name}
                <span className="text-[#C2F800]">.</span>
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                {workout.description ||
                  "Follow the workout specifications and instructions to train with proper technique."}
              </p>

              {/* Muscle Group Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {workout.muscleGroups?.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-md border border-[#C2F800]/25 bg-[#C2F800]/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#C2F800]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Specs */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#292E39]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
                <h2 className="text-sm font-black uppercase tracking-widest">
                  Key Specifications
                </h2>

                <span className="text-xs font-bold text-[#C2F800]">
                  07 SPECS
                </span>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex min-w-0 items-start justify-between gap-3 px-4 py-4 sm:px-5 ${
                      index % 2 === 0 ? "sm:border-r sm:border-white/10" : ""
                    } ${
                      index >= 2 ? "sm:border-t sm:border-white/10" : ""
                    } ${
                      index === 6 ? "sm:col-span-2 sm:border-r-0" : ""
                    }`}
                  >
                    <dt className="shrink-0 text-[10px] font-bold tracking-[0.15em] text-gray-500 sm:text-xs">
                      {spec.label}
                    </dt>

                    <dd className="min-w-0 break-words text-right text-sm font-semibold text-white sm:text-base">
                      {spec.label === "RATING" && (
                        <span className="mr-1 text-[#C2F800]">★</span>
                      )}
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Instructions */}
            <section className="mt-8">
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C2F800]">
                  Exercise Guide
                </p>

                <h2 className="mt-2 text-xl font-black uppercase sm:text-2xl">
                  Instructions
                </h2>
              </div>

              {workout.instructions?.length > 0 ? (
                <ol className="space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={`${index}-${instruction}`}
                      className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#C2F800]/25 sm:p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#C2F800]/20 bg-[#C2F800]/10 text-xs font-black text-[#C2F800]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-gray-300">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-gray-400">
                  Instructions are not available for this workout.
                </p>
              )}
            </section>

            {/* CTA Buttons */}
            <WorkoutActions workout={workout} />

          </div>
        </div>
      </div>
    </main>
  );
}
