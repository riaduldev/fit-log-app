"use client";

import React from 'react';

const Error = ({reset}) => {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center bg-[#222630] px-4 text-center text-white">
      <h2 className="text-2xl font-black">
        Something went wrong
      </h2>

      <p className="mt-3 text-sm text-gray-400">
        We could not load this page. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-[#C2F800] px-6 py-3 font-bold text-[#222630]"
      >
        Try Again
      </button>
    </div>
    );
};

export default Error;

