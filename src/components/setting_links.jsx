import React from 'react';
import { NavLink } from 'react-router-dom';

const Setting_links = () => {
  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? 'bg-blue-600 font-medium text-white'
        : 'text-[var(--muted-color)] hover:bg-[var(--input-bg)] hover:text-[var(--text-color)]'
    }`;

  const headingClass =
    'mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-color)]';

  return (
    <div className="space-y-4">
      <div>
        <h3 className={headingClass}>Account</h3>

        <NavLink to="/settings/profile" className={linkClass}>
          Profile
        </NavLink>

        <NavLink to="/settings/change-password" className={linkClass}>
          Password
        </NavLink>
      </div>

      <div>
        <h3 className={headingClass}>Preferences</h3>

        <NavLink to="/settings/notifications" className={linkClass}>
          Notifications
        </NavLink>

        <NavLink to="/settings/privacy" className={linkClass}>
          Privacy &amp; Policy
        </NavLink>
      </div>
    </div>
  );
};

export default Setting_links;