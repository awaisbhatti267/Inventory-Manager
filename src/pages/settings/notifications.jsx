import React from 'react';

const Notification = () => {
  const toggleStyle =
    'h-6 w-11 rounded-full bg-gray-400 transition-colors peer-checked:bg-[#0969FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#2693FF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-bg)]';

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-6 text-[var(--text-color)] sm:p-10">
      <h2 className="text-2xl font-semibold">
        Notifications
      </h2>

      <p className="mt-2 text-sm text-[var(--muted-color)]">
        Choose which inventory alerts you want to receive.
      </p>

      <form className="mt-8">
        <div className="divide-y divide-[var(--border-color)]">
          <div className="flex items-center justify-between gap-4 pb-6">
            <div>
              <h3 className="font-medium">
                Low Stock Alerts
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-color)]">
                Get notified when stock is 5 units or fewer.
              </p>
            </div>

            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                name="lowStock"
                aria-label="Low Stock Alerts"
                defaultChecked
                className="peer sr-only"
              />
              <span className={toggleStyle} />
              <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 py-6">
            <div>
              <h3 className="font-medium">
                Out of Stock Alerts
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-color)]">
                Get notified when a product's stock reaches zero.
              </p>
            </div>

            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                name="outOfStock"
                aria-label="Out of Stock Alerts"
                defaultChecked
                className="peer sr-only"
              />
              <span className={toggleStyle} />
              <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full cursor-pointer rounded-lg bg-[#0969FF] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0058DD] sm:w-auto"
        >
          Save Preferences
        </button>
      </form>
    </section>
  );
};

export default Notification;