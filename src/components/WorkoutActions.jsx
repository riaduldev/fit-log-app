
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved-workouts";

function readItems(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function WorkoutActions({ workout }) {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const syncState = () => {
      setAdded(
        readItems(PLAN_KEY).some(
          (item) => String(item.id) === String(workout.id)
        )
      );

      setSaved(
        readItems(SAVED_KEY).some(
          (item) => String(item.id) === String(workout.id)
        )
      );
    };

    syncState();

    window.addEventListener("fitlog-updated", syncState);
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("fitlog-updated", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, [workout.id]);

  const addToPlan = () => {
    try {
      const plan = readItems(PLAN_KEY);

      const exists = plan.some(
        (item) => String(item.id) === String(workout.id)
      );

      if (exists) {
        setAdded(true);
        toast.info("This workout is already in today's plan.");
        return;
      }

      localStorage.setItem(
        PLAN_KEY,
        JSON.stringify([...plan, workout])
      );

      setAdded(true);
      window.dispatchEvent(new Event("fitlog-updated"));

      toast.success("Added to today's plan!", {
        toastId: `plan-${workout.id}`,
      });
    } catch {
      toast.error("Unable to add this workout. Please try again.");
    }
  };

  const toggleSaved = () => {
    try {
      const savedItems = readItems(SAVED_KEY);

      const exists = savedItems.some(
        (item) => String(item.id) === String(workout.id)
      );

      const updated = exists
        ? savedItems.filter(
            (item) => String(item.id) !== String(workout.id)
          )
        : [...savedItems, workout];

      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));

      setSaved(!exists);
      window.dispatchEvent(new Event("fitlog-updated"));

      if (exists) {
        toast.info("Removed from saved workouts.");
      } else {
        toast.success("Workout saved for later!", {
          toastId: `saved-${workout.id}`,
        });
      }
    } catch {
      toast.error("Unable to update saved workouts.");
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
      {/* Add to Today's Plan */}
      <button
        type="button"
        onClick={addToPlan}
        className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#C2F800] px-5 py-3 text-sm font-extrabold text-[#222630] shadow-lg shadow-[#C2F800]/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#d5ff44] hover:shadow-[#C2F800]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2F800] active:translate-y-0"
      >
        {added ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 transition-transform group-hover:rotate-90"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}

        {added ? "Added to Today's Plan" : "Add to Today's Plan"}
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={toggleSaved}
        aria-pressed={saved}
        className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2F800] ${
          saved
            ? "border-[#C2F800]/40 bg-[#C2F800]/10 text-[#C2F800]"
            : "border-white/15 bg-white/[0.03] text-white hover:border-[#C2F800]/50 hover:bg-[#C2F800]/5 hover:text-[#C2F800]"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z" />
        </svg>

        {saved ? "Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
}
