import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import API_URL from '../config';
import Spinner from './Spinner'

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  async function handleLogout() {
    if (loader) return;

    setLoader(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.removeItem('userId');
    navigate('/', { replace: true });
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('Please log in to view your profile.');
          return;
        }

        const response = await fetch(`${API_URL}/profile/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Unable to load profile.');
          return;
        }

        setUser(data.name || '');
        setEmail(data.email || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Backend se connection nahi ho raha.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-6 text-[var(--text-color)] sm:p-10">
      {/* Back to dashboard */}
      <button
        type="button"
        onClick={() => navigate('/home')}
        className="group absolute left-6 top-5 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted-color)] transition-colors hover:bg-[var(--input-bg)] hover:text-[var(--text-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <FiArrowLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
        <span>Dashboard</span>
      </button>

      <h2 className="mb-8 pt-12 text-center text-2xl font-semibold sm:pt-0">
        Profile
      </h2>

      {loading ? (
        <p className="text-center text-[var(--muted-color)]">
          Loading profile...
        </p>
      ) : error ? (
        <p className="text-center text-red-500" role="alert">
          {error}
        </p>
      ) : (
        <>
          <div className="flex flex-col items-center gap-8 sm:flex-row">
            {/* Avatar */}
            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border-color)] bg-[var(--input-bg)] text-5xl font-bold text-blue-500">
              {user.charAt(0).toUpperCase() || '?'}
            </div>

            {/* User details */}
            <div className="w-full min-w-0 flex-1">
              <dl className="space-y-5">
                <div className="flex justify-between gap-4">
                  <dt className="shrink-0 text-[var(--muted-color)]">
                    Name:
                  </dt>
                  <dd className="min-w-0 break-words text-right font-medium">
                    {user}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="shrink-0 text-[var(--muted-color)]">
                    Email:
                  </dt>
                  <dd className="min-w-0 break-all text-right text-sm">
                    {email}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--muted-color)]">
                    Role:
                  </dt>
                  <dd className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
                    User
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loader}
                className="mt-6 w-full cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-500 transition-colors hover:bg-red-500/20"

              >
                {loader && <Spinner size="h-4 w-4" />}
                {loader ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>

          <p className="mt-8 border-t border-[var(--border-color)] pt-6 text-center text-sm text-[var(--muted-color)]">
            Ask Admin for Changes
          </p>
        </>
      )}
    </section>
  );
};

export default Profile;