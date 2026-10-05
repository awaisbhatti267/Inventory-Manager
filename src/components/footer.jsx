import React from 'react';

const Footer = () => {
  return (
    <footer className="ml-0 flex items-center justify-center border-t border-[var(--border-color)] bg-[var(--nav-bg)] p-4 text-[var(--muted-color)] md:ml-64">
      <p className="text-center text-sm">
        &copy; 2026 Mini Inventory. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;