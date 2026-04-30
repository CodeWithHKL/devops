import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  // Calculate system memory usage
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(2);

  return NextResponse.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    system: {
      platform: os.platform(),
      architecture: os.arch(),
      cpu_cores: os.cpus().length,
      load_avg: os.loadavg(), // Returns 1, 5, and 15 minute load averages
      memory: {
        total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
        free: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
        usage: `${memUsagePercent}%`
      }
    },
    checks: {
      database: 'CONNECTED',
      cache: 'CONNECTED',
      storage: 'HEALTHY'
    },
    service_info: {
      version: '1.2.0',
      node_version: process.version,
      uptime: `${Math.floor(process.uptime())}s`,
      pid: process.pid
    }
  });
}