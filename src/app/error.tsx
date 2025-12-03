"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log error to console for now. In prod you may send this to an error tracker.
    // Keep minimal to avoid throwing during error display.
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full text-center bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">An unexpected error occurred. You can try reloading the page or come back later.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Try again
          </button>
          <Link href="/" className="px-4 py-2 border rounded-md hover:bg-gray-100">Home</Link>
        </div>
      </div>
    </div>
  );
}
