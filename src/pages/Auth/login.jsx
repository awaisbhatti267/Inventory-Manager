import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FiBox, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import API_URL from '../../config';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: 'error' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Already logged in — redirect to home
  if (localStorage.getItem('userId')) {
    return <Navigate to="/home" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMsg({ text: '', type: 'error' });

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user.id);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/home');
      } else {
        setMsg({ text: data.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setMsg({ text: 'Backend not Connected.', type: 'error' });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1b2a]">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 lg:flex-row lg:gap-0 lg:px-12">
        {/* Logo */}
        <div className="flex shrink-0 flex-col items-center justify-center gap-3 lg:w-72">
          <FiBox size={64} color="#3b82f6" />
          <span className="text-xl font-semibold text-white">Mini Inventory</span>
          <p className="mt-0.5 text-xs text-gray-400">&copy; 2026 Mini Inventory</p>
        </div>

        {/* Divider — hidden on mobile */}
        <div className="hidden lg:block w-px bg-white/20 self-stretch mx-16" />

        {/* Login form */}
        <div className="w-full max-w-md rounded-2xl border border-[#1e3a5f] bg-[#112240] p-6 sm:p-8">
          <h2 className="mb-1 text-center text-2xl font-bold text-white">Welcome back</h2>
          <p className="mb-6 text-center text-sm text-gray-400">Log in to manage your inventory</p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {msg.text && <Message message={msg.text} type={msg.type} />}
            <fieldset disabled={loading} className="space-y-4 disabled:opacity-60">

              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-gray-300">Email</label>
                <div className="flex items-center gap-2 rounded-lg border border-[#1e3a5f] bg-[#0d1b2a] px-3 py-2 focus-within:border-blue-500">
                  <FiMail className="shrink-0 text-gray-400" />
                  <input
                    type="email" id="email" name="email" autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" required
                    className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pass" className="mb-1 block text-sm text-gray-300">Password</label>
                <div className="flex items-center gap-2 rounded-lg border border-[#1e3a5f] bg-[#0d1b2a] px-3 py-2 focus-within:border-blue-500">
                  <FiLock className="shrink-0 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'} id="pass" name="password"
                    autoComplete="current-password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="shrink-0 cursor-pointer text-gray-400 hover:text-white">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <Spinner size="h-4 w-4" />}
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </fieldset>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-400 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
