import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await handleLogin({ email, password });
    console.log("Submitting login for:", email);
    if (success) {
      navigate('/');
    } else {
      setError('Login failed. If you do not have an account yet, please register first.');
    }
  };

  if (loading) {
    return (<main><h1>Loading.....</h1></main>);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-foreground relative bg-background font-sans select-none overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-accent rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col items-center gap-10 z-10">

        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-transparent border-2 border-accent border-opacity-60 shadow-[0_0_15px_1px_rgba(96,165,250,0.4)]">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-xs uppercase tracking-widest text-white/90 font-medium">INTERVIEWAI</span>
        </div>

        {/* Glassmorphism Card */}
        <div className="w-full rounded-3xl p-10 bg-background/70 border border-input-border backdrop-blur-xl shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.05),0_4px_20px_0_rgba(0,0,0,0.5)]">

          <h1 className="text-4xl font-extralight tracking-tight mb-3  text-white">Welcome back</h1>
          <p className="text-base text-muted/80 mb-10">Sign in to continue your interview prep.</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm text-rose-100 shadow-[0_10px_30px_-20px_rgba(244,63,94,0.65)]">
                <p className="font-semibold text-rose-100 mb-1">Unable to sign in</p>
                <p>{error}</p>
                <p className="mt-3 text-white/80">
                  Don&apos;t have an account yet? <Link className="font-semibold text-white underline" to="/register">Register now</Link>.
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted/70 block">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className="w-full p-4 rounded-xl text-lg font-light bg-input-bg border border-input-border text-white placeholder:text-muted/50 focus:ring-2 focus:ring-emerald-shadow focus:ring-opacity-40 focus:border-emerald-shadow transition duration-200 outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase tracking-wider text-muted/70 block">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••••••" 
                className="w-full p-4 rounded-xl text-lg font-light bg-input-bg border border-input-border text-white placeholder:text-muted/50 focus:ring-2 focus:ring-emerald-shadow focus:ring-opacity-40 focus:border-emerald-shadow transition duration-200 outline-none"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end pt-1">
              <a href="#forgot" className="text-sm text-muted hover:text-accent transition duration-150">Forgot password?</a>
            </div>

            {/* Primary Button */}
            <button type="submit" className="w-full p-4 rounded-xl text-lg font-semibold bg-primary text-primary-foreground group flex items-center justify-center gap-3 transition duration-150 hover:bg-primary/90 hover:shadow-[0_0_25px_1px_rgba(16,185,129,0.7)] cursor-pointer">
              Sign in
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

          </form>

          <div className='pt-3 font-serif'>
             <p className='text-blue-300'>Don't have an Account? <Link to={"/register"}>Register</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}