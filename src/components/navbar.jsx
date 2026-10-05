import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
import ThemeToggle from './ThemeToggle';
import Spinner from './Spinner';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const dropdownRef = useRef(null);
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchName() {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`${API_URL}/profile/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.name || '');
        }
      } catch (error) {
        console.error('Error fetching navbar profile:', error);
      }
    }

    fetchName();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  async function handleLogout() {
    if (loader) return;
    setLoader(true)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    localStorage.removeItem('userId');
    setOpen(false);
    navigate('/', { replace: true });
  }

  const words = userName.trim().split(/\s+/);
  const firstName = words[0] || '';
  const firstTwoWords = words.slice(0, 2).join(' ');
  const initial = firstName.charAt(0).toUpperCase() || 'U';

  return (
    <header className="ml-64 hidden items-center justify-between gap-4 border-b border-[var(--border-color)] bg-[var(--nav-bg)] px-6 py-4 text-[var(--text-color)] md:flex">
      {/* Welcome message */}
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0969FF] to-[#6C3EFF] text-white shadow-lg shadow-blue-900/20">
          <FiUser size={20} />
        </div>

        <div>
          <p className="text-lg font-bold tracking-wide">
            Welcome back, {firstTwoWords || '...'}!
          </p>
          <p className="mt-0.5 text-xs tracking-wide text-[var(--muted-color)]">
            Track, manage and update your inventory in one place.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <ThemeToggle />

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="profile-dropdown"
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-color)] p-2 hover:bg-[var(--input-bg)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0969FF] text-sm font-semibold text-white">
              {initial}
            </span>

            <span>{firstName || '...'}</span>

            <FiChevronDown
              size={18}
              className={`transition-transform ${open ? 'rotate-180' : ''
                }`}
            />
          </button>

          {open && (
            <div
              id="profile-dropdown"
              className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--surface-bg)] shadow-lg"
            >
              <button
                type="button"
                onClick={() => {
                  navigate('/settings/profile');
                  setOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm hover:bg-[var(--input-bg)]"
              >
                <FiUser size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loader}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-[var(--input-bg)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loader ? <Spinner size="h-4 w-4" /> : <FiLogOut size={16} />}
                {loader ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;