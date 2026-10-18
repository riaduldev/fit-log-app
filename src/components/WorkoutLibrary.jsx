"use client";

import { useState } from "react";
import WorkoutCard from "./WorkOutCards";

const WorkoutLibrary = ({ workouts = [] }) => {
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "calories") {
      return Number(b.caloriesBurned) - Number(a.caloriesBurned);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  return (
    <div>
      {/* Sorting Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
          Showing {sortedWorkouts.length} Exercises
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="workout-sort"
            className="whitespace-nowrap text-sm font-medium text-gray-400"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="workout-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-44 appearance-none rounded-xl border border-white/10 bg-[#2B303B] px-4 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#C2F800]"
            >
              <option value="duration">Duration (Low to High)</option>
              <option value="calories">Calories (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C2F800]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Workout Cards */}
      {sortedWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-16 text-center">
          <h2 className="text-xl font-bold">No Workouts Found</h2>
          <p className="mt-2 text-sm text-gray-400">
            No exercises are available right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutLibrary;