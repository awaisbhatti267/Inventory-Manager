import React from 'react';
import { Outlet } from 'react-router-dom';
import Setting_links from '../components/setting_links';

const Setting = () => {
  return (
    <div className="text-[var(--text-color)]">
      <div className="mt-2 border-b border-[var(--border-color)] pb-4">
        <h1 className="mb-1 text-3xl font-bold">
          Settings
        </h1>
      </div>

      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        {/* Settings navigation */}
        <div className="w-full shrink-0 md:w-48">
          <Setting_links />
        </div>

        {/* Nested settings page */}
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Setting;