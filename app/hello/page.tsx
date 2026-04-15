'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HelloPage() {
  const [data, setData] = useState({ message: 'Loading...' });

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start border-x border-zinc-100 dark:border-zinc-900">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <span className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
            Endpoint: /hello
          </span>
          <h1 className="text-5xl font-bold tracking-tighter text-black dark:text-zinc-50">
            {data.message}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This message was successfully retrieved from the Node.js backend API handler.
          </p>
          <Link href="/" className="text-sm font-medium underline underline-offset-4 hover:text-zinc-500">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}