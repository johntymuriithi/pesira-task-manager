import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  const [count, setCount] = useState(10);
  
  useEffect(() => {
    // Countdown timer to redirect
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Redirect to home when countdown finishes
    if (count === 0) {
      window.location.href = '/';
    }
  }, [count]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 flex flex-col items-center justify-center text-white p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-xl"></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gray-800/80 rounded-full">
            <Sparkles className="text-purple-400 h-12 w-12" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold text-center mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-center mb-2">Page Not Found</h2>
        <p className="text-gray-400 text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex justify-center items-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all text-center"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-700 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors text-center"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
        
        <p className="text-gray-500 text-center text-sm mt-8">
          Redirecting to home in {count} seconds...
        </p>
      </div>
    </div>
  );
}