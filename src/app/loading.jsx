import React from 'react';

const loading = () => {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#222630] text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#C2F800]" />

      <p className="text-sm font-semibold tracking-wide text-gray-400">
        Loading workouts...
      </p>
    </div>
    );
};

export default loading;