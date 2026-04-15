import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start border-x border-zinc-100 dark:border-zinc-900">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          {/* Requirement: Must show "Hello DevOps" at / endpoint  */}
          <h1 className="text-5xl font-bold tracking-tighter text-black dark:text-zinc-50">
            Hello DevOps
          </h1>
          
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            CSEB5143 DevOps Project: Build, Containerize, and Deploy. 
            Automating the lifecycle with Jenkins, Docker, and Kubernetes.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-10 w-full sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-white dark:bg-zinc-50 dark:text-black transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[180px] font-medium"
            href="/hello"
          >
            Preview Hello
          </Link>

          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black dark:border-white px-5 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black md:w-[180px] font-medium"
            href="/health"
          >
            System Health
          </Link>
        </div>

        <footer className="mt-20 text-sm text-zinc-500 font-mono">
          Developed by{" "}
          <a 
            href="https://hklxportfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline decoration-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
          >
            HKL
          </a>
          <br />
          [Semester 2 2025/2026] 
        </footer>
      </main>
    </div>
  );
}