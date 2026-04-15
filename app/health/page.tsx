'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HealthPage() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start border-x border-zinc-100 dark:border-zinc-900">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            System Status Check
          </span>
          <h1 className="text-5xl font-bold tracking-tighter text-black dark:text-zinc-50">
            Health Report
          </h1>
          
          <div className="w-full mt-8 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 font-mono text-sm">
            {status ? (
              <div className="space-y-3">
                <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-green-600 font-bold">{status.status}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="text-zinc-500">Timestamp:</span>
                  <span className="text-zinc-400">{status.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Environment:</span>
                  <span className="text-zinc-400">{status.environment}</span>
                </div>
              </div>
            ) : (
              <p className="animate-pulse">Analyzing system vitals...</p>
            )}
          </div>

          <Link href="/" className="mt-6 text-sm font-medium underline underline-offset-4 hover:text-zinc-500">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}