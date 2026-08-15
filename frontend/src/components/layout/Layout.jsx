import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="h-screen w-full bg-pearl-100 dark:bg-midnight-950 flex items-center justify-center p-0 md:p-4 lg:p-8 relative overflow-hidden">
      {/* Ambient Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-azure-500/10 dark:bg-azure-500/5 blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-amethyst-500/10 dark:bg-amethyst-500/5 blur-[100px] animate-float"></div>
      </div>

      {/* The Floating Bento Box Container */}
      <div className="relative z-10 w-full md:max-w-[1400px] h-full md:max-h-[900px] glass-panel rounded-none md:rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden shadow-none md:shadow-2xl shadow-midnight-900/10 dark:shadow-black/50">
        <Navbar />
        <main className="flex-1 min-w-0 h-full relative overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
