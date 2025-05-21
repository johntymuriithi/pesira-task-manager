import { useState, FormEvent, useContext } from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Mountain, Sun } from 'lucide-react';
import UserContext from '@/context/UserContext';
import { LoginFormElements, SignUpFormElements} from '@/types/usersTypes';


export default function HomePage() {
  const [activePage, setActivePage] = useState('login');
  const [userType, setUserType] = useState('user'); // Default user type
  const { login, signup } = useContext(UserContext)

  const handleLogin = async (e: FormEvent<LoginFormElements>) => {
    e.preventDefault();
    const username = e.currentTarget.elements.emailLogin.value;
    const password = e.currentTarget.elements.passWord.value;

    login({username, password})
  };

  const handleSignup = async (e: FormEvent<SignUpFormElements>) => {
    e.preventDefault();

    const email = e.currentTarget.elements.emailSignup.value;
    const password = e.currentTarget.elements.confirmPassword.value;
    const status = userType;
    const username = e.currentTarget.elements.username.value;

    console.log(signup({ email, password, status, username}))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-10 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">TaskNova</span>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setActivePage('login')}
              className="px-6 py-2 rounded-full transition-all hover:bg-white/10"
            >
              Login
            </button>
            <button 
              onClick={() => setActivePage('signup')}
              className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              Sign Up
            </button>
          </div>
        </nav>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Reimagine Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">Productivity</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              TaskNova transforms how you manage tasks with an immersive, intuitive interface that adapts to your workflow.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <CheckCircle2 className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Smart Prioritization</h3>
                  <p className="text-sm text-gray-400">Focus on what matters most</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Time Tracking</h3>
                  <p className="text-sm text-gray-400">Measure and optimize</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Mountain className="text-pink-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Goal Setting</h3>
                  <p className="text-sm text-gray-400">Visualize your progress</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Sun className="text-amber-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Daily Insights</h3>
                  <p className="text-sm text-gray-400">Learn from your patterns</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/10 p-8 shadow-xl">
              {activePage === 'login' ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="emailLogin" className="block text-sm font-medium mb-1">Username</label>
                      <input 
                        type="text"
                        id="emailLogin"
                        name="emailLogin" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="john doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="passWord" className="block text-sm font-medium mb-1">Password</label>
                      <input 
                        type="password"
                        id="passWord"
                        name="passWord" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex justify-center items-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
                      
                    >
                      Login <ArrowRight size={16} />
                    </button>
                  </form>
                  <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActivePage('signup')}
                      className="text-purple-400 hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Create Account</h2>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                      <input 
                        type="text"
                        id="username"
                        name="username" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="JohnDoe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="emailSignup" className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email"
                        id="emailSignup"
                        name="emailSignup" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Password</label>
                      <input 
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Account Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="formRadio"
                            value="user"
                            checked={userType === 'user'}
                            onChange={() => setUserType('user')}
                            className="mr-2"
                          />
                          User
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="formRadio"
                            value="admin"
                            checked={userType === 'admin'}
                            onChange={() => setUserType('admin')}
                            className="mr-2"
                          />
                          Admin
                        </label>
                      </div>
                    </div>
                   
                    <button 
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex justify-center items-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
                      
                    >
                      Create Account' <ArrowRight size={16} />
                    </button>
                  </form>
                  <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActivePage('login')}
                      className="text-purple-400 hover:underline"
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

