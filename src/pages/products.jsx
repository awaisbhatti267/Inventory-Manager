import React, { useEffect, useState } from 'react';
import { FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import AddProducts from './add_products';
import API_URL from '../config';

const Product = () => {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchProducts() {
    setError('');

    try {
      const response = await fetch(`${API_URL}/add-product`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to load products.');
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      setError('Backend se connection nahi ho raha.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function openAdd() {
    setEditProduct(null);
    setOpen(true);
  }

  function handleEdit(product) {
    setEditProduct(product);
    setOpen(true);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;

    try {
      const response = await fetch(`${API_URL}/product/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  function closePopup() {
    setOpen(false);
    setEditProduct(null);
    fetchProducts();
  }

  return (
    <div className="text-[var(--text-color)]">
      <div className="mb-10 mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-[var(--muted-color)]">
            Manage your products and stock
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="cursor-pointer self-start rounded-lg border border-blue-500 bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 sm:self-auto"
        >
          + Add Product
        </button>
      </div>

      <section className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface-bg)]">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--input-bg)] text-[var(--muted-color)]">
              <tr>
                <th className="p-4">Products</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (PKR)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-[var(--muted-color)]"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-[var(--muted-color)]"
                  >
                    No products added yet.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const stock = Number(product.stock);

                  const statusStyle =
                    stock === 0
                      ? 'bg-red-500/10 text-red-500'
                      : stock <= 5
                      ? 'bg-amber-500/10 text-amber-600'
                      : 'bg-emerald-500/10 text-emerald-600';

                  const dotStyle =
                    stock === 0
                      ? 'bg-red-500'
                      : stock <= 5
                      ? 'bg-amber-500'
                      : 'bg-emerald-500';

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-[var(--border-color)] transition-colors hover:bg-[var(--input-bg)]"
                    >
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="whitespace-nowrap p-4">
                        {Number(product.price).toLocaleString('en-PK')}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle}`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${dotStyle}`}
                          />

                          {stock === 0
                            ? 'Out of Stock'
                            : stock <= 5
                            ? 'Low Stock'
                            : 'In Stock'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-xs font-medium text-[var(--muted-color)] transition-colors hover:bg-[var(--input-bg)] hover:text-[var(--text-color)]"
                          >
                            <FiEdit2 size={13} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10"
                          >
                            <FiTrash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit popup */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close popup"
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={editProduct ? 'Edit Product' : 'Add Product'}
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

            <AddProducts onClose={closePopup} product={editProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;