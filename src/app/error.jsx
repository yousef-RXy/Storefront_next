'use client';

import { ServerCrash, RotateCw } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto my-12 p-8 bg-card-bg border border-border-base rounded-2xl text-center shadow-xl text-white">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 mb-5">
        <ServerCrash className="w-8 h-8" />
      </div>

      <h2 className="text-lg font-semibold text-neutral-200 mb-2">
        Data Fetch Failed
      </h2>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        {error.message || 'An unexpected error occurred'}
      </p>

      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-4 py-2 bg-btn-bg border border-border-base hover:bg-border-base hover:border-border-high active:bg-btn-active text-neutral-200 text-sm font-medium rounded-lg transition-all cursor-pointer focus:outline-none"
      >
        <RotateCw className="w-4 h-4" />
        Retry Request
      </button>
    </div>
  );
}
