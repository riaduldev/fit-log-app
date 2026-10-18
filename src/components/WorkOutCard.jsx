
import Image from "next/image";
import Link from "next/link";

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const FlameIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-3.5-2.5-5.5-4.5-9-.2 2.2-1.3 3.3-2.2 4.1C11.5 7.4 10 5 8 3c.4 4-1 6.2-2.5 8.5A7 7 0 0 0 12 22Z" />
  </svg>
);

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
);

const WorkoutCard = ({ workout }) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      aria-label={`View details for ${workout.name}`}
      className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#292E39] transition-all duration-300 hover:-translate-y-1 hover:border-[#C2F800]/60 hover:shadow-[0_12px_35px_rgba(194,248,0,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2F800]"
    >
      {/* Workout Image */}
      <div className="relative h-52 overflow-hidden bg-[#191C23] sm:h-56">
        {workout.image && (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191C23] via-black/10 to-black/20" />

        {/* Category Pills */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((muscle) => (
            <span
              key={muscle}
              className="rounded-md border border-[#C2F800]/30 bg-[#191C23]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C2F800] backdrop-blur-sm"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Difficulty */}
        <span className="absolute bottom-4 right-4 rounded-md border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
          {workout.difficulty}
        </span>

        {/* Exercise Number */}
        <span className="absolute bottom-4 left-4 text-sm font-bold tracking-widest text-white/70">
          EXERCISE / {String(workout.id).padStart(2, "0")}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex h-[calc(100%-13rem)] flex-col p-4 sm:p-5">
        {/* Workout Name */}
        <h2 className="line-clamp-2 min-h-14 text-lg font-extrabold uppercase leading-7 tracking-wide text-white transition-colors group-hover:text-[#C2F800]">
          {workout.name}
        </h2>

        {/* Equipment */}
        <div className="mt-2 flex min-w-0 items-center gap-2 text-sm text-gray-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4 shrink-0 text-[#C2F800]"
            aria-hidden="true"
          >
            <path d="M6 5v14M18 5v14M3 9v6M21 9v6M6 12h12" />
          </svg>

          <span className="truncate">
            {workout.equipment || "No equipment specified"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Workout Stats */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-300">
            <span className="text-[#C2F800]">
              <ClockIcon />
            </span>
            <span className="truncate">
              {workout.duration} min
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-300">
            <span className="text-[#C2F800]">
              <FlameIcon />
            </span>
            <span className="truncate">
              {workout.caloriesBurned} kcal
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-300">
            <span className="text-[#C2F800]">
              <StarIcon />
            </span>
            <span className="truncate">
              {Number(workout.rating).toFixed(1)}
            </span>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors group-hover:text-white">
            View Workout
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#C2F800] transition-all duration-300 group-hover:bg-[#C2F800] group-hover:text-[#222630]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
