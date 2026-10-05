import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import Message from '../components/Message';
import API_URL from '../config';

const Add_products = ({ onClose, product = null }) => {
  const isEdit = product !== null;

  const [name, setName] = useState(isEdit ? product.name : '');
  const [category, setCategory] = useState(isEdit ? product.category : '');
  const [price, setPrice] = useState(isEdit ? product.price : '');
  const [stock, setStock] = useState(isEdit ? product.stock : '');
  const [msg, setMsg] = useState({ text: '', type: 'error' });
  const [loading, setLoading] = useState(false);

  const submitting = useRef(false);

  const inputStyle =
    'mt-2 w-full rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--muted-color)] focus:border-[#0969FF]';

  const labelStyle =
    'block text-sm font-medium text-[var(--text-color)]';

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting.current) return;

    submitting.current = true;
    setLoading(true);
    setMsg({ text: '', type: 'error' });

    try {
      const url = isEdit
        ? `${API_URL}/product/${product.id}`
        : `${API_URL}/add-product`;

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          stock: Number(stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMsg({
          text: data.message || 'Something went wrong.',
          type: 'error',
        });

        submitting.current = false;
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      setMsg({
        text: data.message || 'Product saved successfully.',
        type: 'success',
      });

      setTimeout(() => onClose?.(), 3000);
    } catch (error) {
      console.error(error);
      setMsg({
        text: 'Backend se connection nahi ho raha.',
        type: 'error',
      });

      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="text-[var(--text-color)]">
      <h2 className="pr-8 text-2xl font-semibold">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h2>

      <p className="mb-6 mt-2 text-sm text-[var(--muted-color)]">
        {isEdit
          ? 'Update the product details below.'
          : 'Enter product details to update your inventory.'}
      </p>

      {msg.text && (
        <div className="mb-6">
          <Message message={msg.text} type={msg.type} />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading} className="min-w-0">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Image upload — backend pending */}
            {!isEdit && (
              <div>
                <label htmlFor="productImage" className={labelStyle}>
                  Product Image (Optional)
                </label>

                <label
                  htmlFor="productImage"
                  className={`mt-2 flex h-64 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--muted-color)] ${
                    loading
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:border-[#0969FF]'
                  }`}
                >
                  <FiUploadCloud size={40} />

                  <span className="font-medium text-[var(--text-color)]">
                    Click to upload
                  </span>
                  <span className="text-xs">PNG or JPG</span>

                  <input
                    type="file"
                    id="productImage"
                    name="image"
                    accept="image/png,image/jpeg"
                    className="sr-only"
                  />
                </label>
              </div>
            )}

            <div className={`space-y-5 ${isEdit ? 'sm:col-span-2' : ''}`}>
              <div>
                <label htmlFor="productName" className={labelStyle}>
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wireless Mouse"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="category" className={labelStyle}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className={inputStyle}
                >
                  <option value="" disabled>Select category</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Audio">Audio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className={labelStyle}>
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="stock" className={labelStyle}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    max="1000"
                    step="1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    required
                    className={inputStyle}
                  />
                </div>
              </div>

              <p className="text-xs text-[var(--muted-color)]">
                Status is calculated automatically from stock quantity.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-[var(--border-color)] pt-6">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="cursor-pointer rounded-lg border border-[var(--border-color)] px-5 py-2.5 text-sm font-medium text-[var(--text-color)] hover:bg-[var(--input-bg)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0969FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0058DD] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
              )}

              {loading
                ? 'Saving...'
                : isEdit
                ? 'Save Changes'
                : '+ Add Product'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Add_products;