import React, { useState } from 'react';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import API_URL from '../../config';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: 'error' });
  const [loading, setLoading] = useState(false);

  const inputStyle =
    'mt-2 w-full rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-[var(--text-color)] placeholder:text-[var(--muted-color)] outline-none focus:border-[#0969FF] focus:ring-2 focus:ring-[#0969FF]/30';

  const labelStyle =
    'block text-sm font-medium text-[var(--text-color)]';

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setMsg({ text: '', type: 'error' });

    if (newPassword !== confirmPassword) {
      setMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    const userId = localStorage.getItem('userId');

    if (!userId) {
      setMsg({ text: 'Please log in first.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setMsg({
          text: data.message || 'Password updated successfully.',
          type: 'success',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({
          text: data.message || 'Unable to update password.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      setMsg({
        text: 'Backend se connection nahi ho raha.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-6 text-[var(--text-color)] sm:p-10">
      <h2 className="text-2xl font-semibold">
        Change Password
      </h2>

      <p className="mb-6 mt-2 text-sm text-[var(--muted-color)]">
        Enter your current password and choose a new password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {msg.text && (
          <Message message={msg.text} type={msg.type} />
        )}

        <fieldset
          disabled={loading}
          className="min-w-0 space-y-4 disabled:opacity-60"
        >
          <div>
            <label htmlFor="currentpassword" className={labelStyle}>
              Current Password
            </label>
            <input
              type="password"
              id="currentpassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Current Password"
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="newpassword" className={labelStyle}>
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="New Password"
              required
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="confirmpassword" className={labelStyle}>
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm New Password"
              required
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0969FF] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#0058DD] disabled:cursor-not-allowed"
          >
            {loading && <Spinner size="h-4 w-4" />}
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default ChangePassword;