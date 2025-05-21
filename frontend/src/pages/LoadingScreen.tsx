import { Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 flex flex-col items-center justify-center text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-purple-400 h-8 w-8" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">TaskNova</h1>
        </div>
        
        <div className="relative w-16 h-16">
          {/* Orbit animation */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-400/30 animate-spin"></div>
          <div className="absolute inset-1 rounded-full border-t-2 border-l-2 border-blue-400/40 animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 rounded-full border-b-2 border-r-2 border-pink-400/50 animate-spin" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <p className="mt-6 text-gray-300">Loading your workspace...</p>
      </div>
    </div>
  );
}