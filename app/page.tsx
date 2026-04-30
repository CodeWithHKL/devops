import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen p-6">
      <main className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full mb-4">
              System Live
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-zinc-50">
              Hi, Welcome to Haikal App!
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">
              CSEB5143 Project @ Semester 2 2025/2026
            </p>
          </div>
          <Image
            className="dark:invert opacity-20 md:opacity-100 object-contain"
            src="/HLogoNoBG.png"
            alt="Haikal App Logo"
            width={100}
            height={100}
            priority
          />
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Feature Card - Hello Preview */}
          <Link 
            href="/hello" 
            className="md:col-span-2 group relative overflow-hidden p-8 bg-black dark:bg-zinc-50 rounded-3xl transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 dark:bg-zinc-200 rounded-xl mb-4 group-hover:animate-bounce">
                <span className="text-xl">👋</span>
              </div>
              <h2 className="text-2xl font-bold text-white dark:text-black">Preview Hello</h2>
              <p className="text-zinc-400 dark:text-zinc-600 mt-2 max-w-xs">
                Access the /Hello endpoint to call the api and returns Hello message.
              </p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
               <div className="w-32 h-32 bg-white dark:bg-black rounded-full" />
            </div>
          </Link>

          {/* Health Card - Now Darkened */}
          <Link 
            href="/health" 
            className="group p-8 bg-zinc-900 dark:bg-zinc-100 border border-zinc-800 dark:border-zinc-200 rounded-3xl flex flex-col justify-between transition-all hover:scale-[1.02]"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 dark:bg-zinc-200 rounded-2xl mb-4 group-hover:rotate-12 transition-transform">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white dark:text-black">System Health</h2>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">Check Kubernetes Pods & Logs</p>
            </div>
          </Link>

          {/* GitHub Card */}
          <a 
            href="https://github.com/CodeWithHKL" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-zinc-100 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-3xl flex items-center gap-4 transition-all"
          >
            <Image 
              src="/github.png" 
              alt="GitHub" 
              width={40} 
              height={40} 
              className="dark:invert"
            />
            <div className="flex flex-col">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">GitHub Repo</span>
              <span className="font-bold text-black dark:text-white">CodeWithHKL</span>
            </div>
          </a>

          {/* DevOps Stack Card */}
          <div className="md:col-span-2 p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">The Pipeline</h3>
            <div className="flex flex-wrap gap-3">
              {['Git','Jenkins','Node', 'Npm', 'Docker', 'Kubernetes', 'Minikube', 'Vercel'].map((tool) => (
                <span key={tool} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-mono rounded-lg border border-zinc-200 dark:border-zinc-700">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-zinc-500 font-mono">
          <p>Developed by 
            <a 
              href="https://hklxportfolio.vercel.app/" 
              className="ml-1 text-black dark:text-white underline decoration-zinc-400 hover:decoration-black transition-all"
            >
              HKL
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}