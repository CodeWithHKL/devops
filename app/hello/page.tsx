'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ApiData {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
  framework: string;
  deployment: string;
  author: string;
  api_version: string;
  uptime: number;
}

export default function HelloPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <main className="w-full max-w-2xl relative z-10">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white">API Manifest</h1>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Endpoint: /api/hello</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${loading ? 'bg-zinc-100 text-zinc-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
              {loading ? 'Polling...' : 'System Online'}
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Main Message Section */}
            <div className="mb-10 text-center md:text-left">
              <span className="text-4xl mb-4 block">🚀</span>
              <h2 className="text-5xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                {data?.message || 'Loading...'}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Backend communication established via <span className="font-mono text-blue-500">{data?.framework || '...'}</span>
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Environment</p>
                <p className="font-mono text-sm text-black dark:text-zinc-200">{data?.environment || '---'}</p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Uptime</p>
                <p className="font-mono text-sm text-black dark:text-zinc-200">{data ? `${Math.floor(data.uptime)}s` : '---'}</p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 col-span-2 md:col-span-1">
                <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Version</p>
                <p className="font-mono text-sm text-black dark:text-zinc-200">v{data?.api_version || '0.0.0'}</p>
              </div>
            </div>

            {/* Raw JSON Inspect */}
            <details className="group mb-10">
              <summary className="list-none cursor-pointer flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                INSPECT RAW PAYLOAD
              </summary>
              <div className="mt-4 p-4 bg-black rounded-xl overflow-x-auto border border-zinc-800">
                <pre className="text-[11px] text-green-400 font-mono">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </details>

            {/* Back Button */}
            <Link 
              href="/" 
              className="flex items-center justify-center w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:opacity-90 transition-all active:scale-[0.98]"
            >
              ← Back to System Dashboard
            </Link>
          </div>
        </div>

        {/* Timestamp Footer */}
        <p className="mt-6 text-center text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
          Handshake Verified: {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'Waiting for signal...'}
        </p>
      </main>
    </div>
  );
}