import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBox, FaCog, FaHome } from 'react-icons/fa';
import { FiBox, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('userId');
    setOpen(false);
    navigate('/', { replace: true });
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg p-2 transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-[var(--text-color)] hover:bg-[var(--input-bg)]'
    }`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--nav-bg)] px-4 text-[var(--text-color)] md:hidden">
        <div className="flex items-center gap-2 text-sm font-bold">
          <FiBox size={20} className="shrink-0 text-blue-500" />
          MINI INVENTORY
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={open}
            aria-controls="inventory-sidebar"
            className="cursor-pointer rounded-lg p-1 hover:bg-[var(--input-bg)]"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        id="inventory-sidebar"
        className={`fixed bottom-0 left-0 top-14 z-40 flex w-64 flex-col border-r border-[var(--border-color)] bg-[var(--nav-bg)] p-4 text-[var(--text-color)] transition-transform duration-300 md:top-0 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 hidden items-center justify-between border-b border-[var(--border-color)] pb-4 md:flex">
          <h3 className="flex items-center gap-2 font-bold">
            <FiBox size={24} className="text-blue-500" />
            MINI INVENTORY
          </h3>
        </div>

        <ul className="flex flex-col space-y-1">
          <li>
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <FaHome />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <FaBox />
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <FaCog />
              Settings
            </NavLink>
          </li>
        </ul>

        {/* Mobile logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex cursor-pointer items-center gap-2 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10 md:hidden"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;