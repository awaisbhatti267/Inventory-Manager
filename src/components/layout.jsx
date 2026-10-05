import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Footer from './footer';

const Layout = () => {
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith('/settings');

  return (
    <div className="flex min-h-screen flex-col bg-[var(--page-bg)] text-[var(--text-color)]">
      <Sidebar />

      {!isSettings && <Navbar />}

      <main className="ml-0 flex-1 px-6 pb-6 pt-20 md:ml-64 md:pt-6">
        <Outlet />
      </main>

      {!isSettings && <Footer />}
    </div>
  );
};

export default Layout;