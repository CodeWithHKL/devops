import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Hello DevOps',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    framework: 'Next.js 15',
    deployment: 'Vercel',
    author: 'HKL',
    api_version: '1.0.2',
    uptime: process.uptime(), // Returns how many seconds the server process has been running
  });
}