'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HealthData {
  status: string;
  timestamp: string;
  environment: string;
  system: {
    platform: string;
    architecture: string;
    cpu_cores: number;
    load_avg: number[];
    memory: {
      total: string;
      free: string;
      usage: string;
    };
  };
  checks: {
    database: string;
    cache: string;
    storage: string;
  };
  service_info: {
    version: string;
    node_version: string;
    uptime: string;
    pid: number;
  };
}

export default function HealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = () => {
      fetch('/api/health')
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 font-sans">
      <main className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Infrastructure Health</h1>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-2xl shadow-sm">
            <span className={`w-3 h-3 rounded-full ${data?.status === 'UP' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm font-mono font-bold uppercase tracking-wider">
              System: {data?.status || 'OFFLINE'}
            </span>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Memory Usage</p>
            <p className="text-2xl font-mono font-bold">{data?.system.memory.usage || '0%'}</p>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-1000" 
                style={{ width: data?.system.memory.usage || '0%' }}
              />
            </div>
          </div>
          
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-xs font-bold text-zinc-400 uppercase mb-2">CPU Cores</p>
            <p className="text-2xl font-mono font-bold">{data?.system.cpu_cores || '--'}</p>
            <p className="text-[10px] text-zinc-500 mt-1">{data?.system.architecture} Architecture</p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Uptime</p>
            <p className="text-2xl font-mono font-bold">{data?.service_info.uptime || '--'}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Process PID: {data?.service_info.pid}</p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Node Version</p>
            <p className="text-2xl font-mono font-bold">{data?.service_info.node_version || '--'}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Env: {data?.environment}</p>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dependency Checks */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Service Checks</h2>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl divide-y divide-zinc-100 dark:divide-zinc-800">
              {data && Object.entries(data.checks).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Load Average & System Info */}
          <div className="md:col-span-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-3xl p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-6">System Load Monitor</h2>
            <div className="flex items-end gap-4 h-32 mb-6">
              {data?.system.load_avg.map((avg, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-lg transition-all duration-500" 
                    style={{ height: `${Math.min(avg * 100, 100)}%` }}
                  />
                  <span className="text-[10px] font-mono opacity-60">
                    {i === 0 ? '1m' : i === 1 ? '5m' : '15m'}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 dark:border-black/10 pt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase font-bold opacity-50">Platform</p>
                <p className="font-mono">{data?.system.platform}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-50">Last Heartbeat</p>
                <p className="font-mono text-xs">{data ? new Date(data.timestamp).toLocaleTimeString() : '--'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="pt-8 text-center">
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest animate-pulse">
            Real-time Telemetry Active • Polling Every 5s
          </p>
        </footer>
      </main>
    </div>
  );
}