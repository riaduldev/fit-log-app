"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved-workouts";
const DONE_KEY = "fitlog-completed-workouts";

const MAX_DAILY_WORKOUTS = 5;

// Safely read arrays from localStorage
function readItems(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Safely save data to localStorage
function writeItems(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch {
    toast.error("Unable to save changes. Please try again.");
    return false;
  }
}

function getId(item) {
  return String(item?.id ?? item?._id ?? "");
}

function getName(item) {
  return item?.name ?? item?.title ?? item?.exerciseName ?? "Untitled Workout";
}

function getImage(item) {
  return item?.image ?? item?.imageUrl ?? item?.thumbnail ?? "";
}

function getNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const match = String(value ?? "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function getDuration(item) {
  const duration = item?.duration ?? item?.durationMinutes ?? 0;

  if (typeof duration === "string" && /min|hour|hr/i.test(duration)) {
    return duration;
  }

  return `${duration || 0} min`;
}

// Support common API response structures
function extractWorkouts(body) {
  const candidates = [
    body?.data,
    body?.workouts,
    body?.items,
    body,
  ];

  return candidates.find(Array.isArray) ?? [];
}

function mergeLatestData(storedItems, latestWorkouts) {
  return storedItems.map((item) => {
    const latest = latestWorkouts.find(
      (workout) => getId(workout) === getId(item)
    );

    return latest ? { ...item, ...latest } : item;
  });
}

function dispatchUpdate() {
  window.dispatchEvent(new Event("fitlog-updated"));
}

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read local data, then refresh workout details from the API.
  useEffect(() => {
    let cancelled = false;

    const syncFromStorage = () => {
      setPlan(readItems(PLAN_KEY));
      setSaved(readItems(SAVED_KEY));
      setDoneIds(readItems(DONE_KEY).map(String));
    };

    const loadWorkouts = async () => {
      setLoading(true);

      // Show locally stored information as soon as it is available.
      syncFromStorage();

      try {
        const response = await fetch(API_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not fetch workouts.");
        }

        const body = await response.json();
        const latestWorkouts = extractWorkouts(body);

        // Read again in case another component changed the plan.
        const currentPlan = readItems(PLAN_KEY);
        const currentSaved = readItems(SAVED_KEY);

        const updatedPlan = mergeLatestData(
          currentPlan,
          latestWorkouts
        );

        const updatedSaved = mergeLatestData(
          currentSaved,
          latestWorkouts
        );

        if (!cancelled) {
          setPlan(updatedPlan);
          setSaved(updatedSaved);

          // Keep the stored entries updated with the latest API data.
          writeItems(PLAN_KEY, updatedPlan);
          writeItems(SAVED_KEY, updatedSaved);
        }
      } catch {
        // The page still works if the API is temporarily unavailable.
        if (!cancelled) {
          syncFromStorage();
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    window.addEventListener("fitlog-updated", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);

    loadWorkouts();

    return () => {
      cancelled = true;
      window.removeEventListener("fitlog-updated", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  // Metrics always reflect Today's Plan, even when Saved is active.
  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + getNumber(workout.duration ?? workout.durationMinutes),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + getNumber(workout.caloriesBurned ?? workout.calories),
    0
  );

  const currentItems = activeTab === "plan" ? plan : saved;

  // Remove a workout from the active list.
  const removeWorkout = (workout) => {
    const id = getId(workout);

    if (activeTab === "plan") {
      const updatedPlan = readItems(PLAN_KEY).filter(
        (item) => getId(item) !== id
      );

      if (!writeItems(PLAN_KEY, updatedPlan)) return;

      // Removing a workout also clears its completed status.
      const updatedDoneIds = readItems(DONE_KEY)
        .map(String)
        .filter((doneId) => doneId !== id);

      writeItems(DONE_KEY, updatedDoneIds);

      setPlan(updatedPlan);
      setDoneIds(updatedDoneIds);

      toast.success("Removed from today's plan.");
    } else {
      const updatedSaved = readItems(SAVED_KEY).filter(
        (item) => getId(item) !== id
      );

      if (!writeItems(SAVED_KEY, updatedSaved)) return;

      setSaved(updatedSaved);
      toast.info("Removed from saved workouts.");
    }

    dispatchUpdate();
  };

  // Mark an exercise as completed.
  const markAsDone = (workout) => {
    const id = getId(workout);

    if (!id) {
      toast.error("Workout ID is missing.");
      return;
    }

    const currentDoneIds = readItems(DONE_KEY).map(String);

    if (currentDoneIds.includes(id)) {
      toast.info("This workout is already completed.");
      return;
    }

    const updatedDoneIds = [...currentDoneIds, id];

    if (!writeItems(DONE_KEY, updatedDoneIds)) return;

    setDoneIds(updatedDoneIds);

    toast.success("Workout completed. Great work!");
    dispatchUpdate();
  };

  // Add a saved workout to Today's Plan.
  const addSavedToPlan = (workout) => {
    const id = getId(workout);
    const currentPlan = readItems(PLAN_KEY);

    if (currentPlan.some((item) => getId(item) === id)) {
      toast.info("This workout is already in today's plan.");
      return;
    }

    if (currentPlan.length >= MAX_DAILY_WORKOUTS) {
      toast.warning("Your daily plan is limited to five workouts.");
      return;
    }

    const updatedPlan = [...currentPlan, workout];

    if (!writeItems(PLAN_KEY, updatedPlan)) return;

    setPlan(updatedPlan);

    toast.success("Added to today's plan!");
    dispatchUpdate();
  };

  return (
    <main className="min-h-screen bg-[#222630] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <header className="mb-9">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-[#C2F800]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C2F800]">
              Your workout tracker
            </p>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                MY <span className="text-[#C2F800]">PLAN</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                Cap of five lifts for today. Finish them, then load more.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-gray-400">Daily capacity</span>
              <span className="font-black text-[#C2F800]">
                {plan.length}/{MAX_DAILY_WORKOUTS}
              </span>
            </div>
          </div>
        </header>

        {/* Metrics Summary */}
        <section
          aria-label="Today's plan summary"
          className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <MetricCard
            label="Exercises"
            value={plan.length}
            unit="lifts planned"
            icon="dumbbell"
          />

          <MetricCard
            label="Minutes"
            value={totalMinutes}
            unit="estimated duration"
            icon="clock"
          />

          <MetricCard
            label="Calories"
            value={totalCalories.toLocaleString()}
            unit="estimated burn"
            icon="flame"
          />
        </section>

        {/* Tabs */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
            <div className="flex gap-6 sm:gap-8">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`relative pb-4 text-sm font-bold transition sm:text-base ${
                  activeTab === "plan"
                    ? "text-[#C2F800]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Today&apos;s Plan
                <span className="ml-2 rounded-md bg-white/10 px-2 py-1 text-xs">
                  {plan.length}
                </span>

                {activeTab === "plan" && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C2F800]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`relative pb-4 text-sm font-bold transition sm:text-base ${
                  activeTab === "saved"
                    ? "text-[#C2F800]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Saved
                <span className="ml-2 rounded-md bg-white/10 px-2 py-1 text-xs">
                  {saved.length}
                </span>

                {activeTab === "saved" && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C2F800]" />
                )}
              </button>
            </div>

            <p className="pb-4 text-xs text-gray-500">
              {activeTab === "plan"
                ? "YOUR DAILY WORKOUTS"
                : "WORKOUTS SAVED FOR LATER"}
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#C2F800]" />

              <p className="text-sm font-medium text-gray-400">
                Loading workouts…
              </p>
            </div>
          ) : currentItems.length === 0 ? (
            /* Empty state */
            <EmptyState />
          ) : (
            /* Workout cards */
            <div className="space-y-4">
              {currentItems.map((workout, index) => {
                const id = getId(workout);
                const name = getName(workout);
                const image = getImage(workout);
                const rating = getNumber(workout.rating);
                const isDone = doneIds.includes(id);

                return (
                  <article
                    key={id || `${name}-${index}`}
                    className="group rounded-2xl border border-white/10 bg-[#292e39] p-4 transition duration-300 hover:border-[#C2F800]/40 sm:p-5"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                      {/* Thumbnail */}
                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#20242d] sm:h-28 sm:w-36">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : null}

                        <div className="absolute inset-0 -z-0 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-10 w-10 text-[#C2F800]/60"
                            aria-hidden="true"
                          >
                            <path
                              d="M6 9v6m-3-4v2m18-2v2m-3-4v6M6 12h12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        {isDone && activeTab === "plan" && (
                          <span className="absolute left-2 top-2 rounded-md bg-[#C2F800] px-2 py-1 text-[10px] font-black uppercase text-[#222630]">
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Workout information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                              {workout?.muscleGroups
                                ? Array.isArray(workout.muscleGroups)
                                  ? workout.muscleGroups.join(" / ")
                                  : workout.muscleGroups
                                : `WORKOUT ${String(index + 1).padStart(2, "0")}`}
                            </p>

                            <h2 className="text-lg font-black uppercase leading-tight tracking-wide text-white sm:text-xl">
                              {name}
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                              Equipment:{" "}
                              <span className="font-medium text-gray-200">
                                {workout?.equipment || "No equipment"}
                              </span>
                            </p>
                          </div>

                          {activeTab === "plan" && (
                            <span
                              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                                isDone
                                  ? "bg-[#C2F800]/10 text-[#C2F800]"
                                  : "bg-white/5 text-gray-400"
                              }`}
                            >
                              {isDone ? "DONE" : "IN PROGRESS"}
                            </span>
                          )}
                        </div>

                        {/* Stats row */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.07] pt-4">
                          <StatItem
                            icon="clock"
                            text={getDuration(workout)}
                          />

                          <StatItem
                            icon="flame"
                            text={`${getNumber(
                              workout?.caloriesBurned ?? workout?.calories
                            )} kcal`}
                          />

                          <div
                            className="flex items-center gap-1.5"
                            aria-label={`Rating ${rating} out of 5`}
                          >
                            <div className="flex text-sm leading-none">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={
                                    star <= Math.round(rating)
                                      ? "text-[#C2F800]"
                                      : "text-white/20"
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {rating ? rating.toFixed(1) : "N/A"}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap items-center gap-2.5">
                          <Link
                            href={`/workouts/${encodeURIComponent(id)}`}
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#C2F800] px-4 py-2 text-xs font-black text-[#222630] transition hover:bg-[#d8ff4d]"
                          >
                            View Details
                            <span aria-hidden="true">↗</span>
                          </Link>

                          {activeTab === "plan" ? (
                            <button
                              type="button"
                              disabled={isDone}
                              onClick={() => markAsDone(workout)}
                              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold transition ${
                                isDone
                                  ? "cursor-not-allowed border-[#C2F800]/20 bg-[#C2F800]/10 text-[#C2F800]"
                                  : "border-white/10 bg-white/5 text-gray-200 hover:border-[#C2F800]/40 hover:text-[#C2F800]"
                              }`}
                            >
                              {isDone ? "✓ Completed" : "Mark as Done"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addSavedToPlan(workout)}
                              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-200 transition hover:border-[#C2F800]/40 hover:text-[#C2F800]"
                            >
                              + Add to Plan
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => removeWorkout(workout)}
                            aria-label={`Remove ${name}`}
                            title="Remove workout"
                            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m18 6-12 12M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom note */}
        {!loading && plan.length > 0 && activeTab === "plan" && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#C2F800]/15 bg-[#C2F800]/[0.04] p-4">
            <span className="text-lg text-[#C2F800]">✦</span>
            <p className="text-xs leading-5 text-gray-400">
              Consistency beats intensity. Complete your planned lifts, track
              your progress, and come back when you&apos;re ready for more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value, unit, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#292e39] p-5 transition hover:border-[#C2F800]/30 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
          {label}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2F800]/10 text-[#C2F800]">
          <MetricIcon name={icon} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">{unit}</p>
    </div>
  );
}

function MetricIcon({ name }) {
  const common = "h-5 w-5";

  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "flame") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path
          d="M12 22c4.2 0 7-3 7-7 0-3.2-2-5.8-4.5-8.5-.1 2-1 3-2 3.5C12.8 6.5 10 3.8 8 2c.5 4-1 5.5-2.5 8C4.5 11.6 4 13.2 4 15c0 4 3 7 8 7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path
        d="M6 9v6m-3-4v2m18-2v2m-3-4v6M6 12h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 7v10m8-10v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <MetricIcon name={icon} />
      <span>{text}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C2F800]/20 bg-[#C2F800]/[0.07]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-9 w-9 text-[#C2F800]"
          aria-hidden="true"
        >
          <path
            d="M6 9v6m-3-4v2m18-2v2m-3-4v6M6 12h12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 7v10m8-10v10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2F800]">
        Your next rep starts here
      </p>

      <h2 className="text-2xl font-black tracking-wide sm:text-3xl">
        NOTHING HERE YET
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#C2F800] px-6 py-3 text-sm font-black text-[#222630] transition hover:bg-[#d8ff4d]"
      >
        Go to workouts
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}