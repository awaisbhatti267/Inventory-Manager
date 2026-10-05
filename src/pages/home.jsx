import React, { useEffect, useState } from 'react';
import {
  FiBox,
  FiX,
  FiPackage,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import AddProducts from './add_products';
import API_URL from '../config';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchLatestProducts() {
    setError('');

    try {
      const response = await fetch(`${API_URL}/add-product`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to load products.');
        return;
      }

      setAllProducts(data);
      setLatestProducts(data.slice(0, 6));
    } catch (error) {
      console.error(error);
      setError('Backend se connection nahi ho raha.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  function closePopup() {
    setOpen(false);
    fetchLatestProducts();
  }

  const totalProducts = allProducts.length;
  const inStock = allProducts.filter(
    (p) => Number(p.stock) > 5
  ).length;
  const lowStock = allProducts.filter(
    (p) => Number(p.stock) > 0 && Number(p.stock) <= 5
  ).length;
  const outOfStock = allProducts.filter(
    (p) => Number(p.stock) === 0
  ).length;

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: <FiPackage size={22} />,
      color: 'from-[#0969FF] to-[#6C3EFF]',
      text: 'text-blue-500',
    },
    {
      label: 'In Stock',
      value: inStock,
      icon: <FiCheckCircle size={22} />,
      color: 'from-emerald-600 to-emerald-400',
      text: 'text-emerald-600',
    },
    {
      label: 'Low Stock',
      value: lowStock,
      icon: <FiAlertTriangle size={22} />,
      color: 'from-amber-600 to-amber-400',
      text: 'text-amber-600',
    },
    {
      label: 'Out of Stock',
      value: outOfStock,
      icon: <FiXCircle size={22} />,
      color: 'from-red-700 to-red-500',
      text: 'text-red-500',
    },
  ];

  return (
    <div className="mt-3 text-[var(--text-color)]">
      {/* Dashboard heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--muted-color)]">
            Manage your products and stock
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer self-start rounded-lg border border-blue-500 bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 sm:self-auto"
        >
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-5 sm:flex-row sm:items-center sm:gap-4"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="mb-0.5 text-xs text-[var(--muted-color)]">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.text}`}>
                {loading ? '—' : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest six products */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Latest Products
        </h2>

        {loading ? (
          <p className="text-[var(--muted-color)]">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-red-500" role="alert">
            {error}
          </p>
        ) : latestProducts.length === 0 ? (
          <p className="text-[var(--muted-color)]">
            No products added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface-bg)] transition-colors hover:border-blue-500"
              >
                {/* Product image */}
                <div className="flex h-44 items-center justify-center bg-[var(--input-bg)]">
                  {product.image ? (
                    <img
                      src={`${API_URL}/${product.image.replace(/^\/+/, '')}`}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[var(--muted-color)]">
                      <FiBox size={40} />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="p-5">
                  <p className="mb-1 text-xs text-[var(--muted-color)]">
                    {product.category}
                  </p>

                  <h3
                    className="truncate text-lg font-semibold"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-bold text-blue-500">
                    Rs. {Number(product.price).toLocaleString('en-PK')}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted-color)]">
                      Stock: {product.stock}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        Number(product.stock) === 0
                          ? 'bg-red-500/10 text-red-500'
                          : Number(product.stock) <= 5
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-emerald-500/10 text-emerald-600'
                      }`}
                    >
                      {Number(product.stock) === 0
                        ? 'Out of Stock'
                        : Number(product.stock) <= 5
                        ? 'Low Stock'
                        : 'In Stock'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Add Product popup */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close add product popup"
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add Product"
            onKeyDown={(e) => {
              if (e.key === 'Escape') closePopup();
            }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-6 text-[var(--text-color)] sm:p-8"
          >
            <button
              type="button"
              autoFocus
              aria-label="Close"
              onClick={closePopup}
              className="absolute right-4 top-4 cursor-pointer rounded-lg p-2 text-[var(--muted-color)] hover:bg-[var(--input-bg)] hover:text-[var(--text-color)]"
            >
              <FiX size={22} />
            </button>

            <AddProducts onClose={closePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;