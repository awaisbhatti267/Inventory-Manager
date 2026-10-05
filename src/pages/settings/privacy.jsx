import React from 'react';

const Privacy = () => {
  const headingStyle =
    'mb-3 text-xl font-semibold text-[var(--text-color)]';

  const textStyle =
    'text-sm leading-7 text-[var(--muted-color)] sm:text-base';

  return (
    <article className="mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border-color)] bg-[var(--surface-bg)] p-6 text-[var(--text-color)] sm:p-10">
      <header className="mb-8 border-b border-[var(--border-color)] pb-6">
        <h1 className="mb-2 text-3xl font-bold">
          Privacy Policy
        </h1>
        <p className="mb-4 text-sm text-[var(--muted-color)]">
          Last updated: 2 October 2026
        </p>
        <p className={textStyle}>
          Mini Inventory Manager collects only the information needed to provide
          account access and inventory management features.
        </p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className={headingStyle}>Information We Collect</h2>
          <p className={textStyle}>
            We collect the name, email address, and password you provide when creating
            an account. We also store inventory data you enter, including product names,
            categories, prices, and stock quantities.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>How We Use Your Information</h2>
          <p className={textStyle}>
            Your information is used to manage your account, verify login credentials,
            and allow you to create, view, and manage inventory records.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Storage and Security</h2>
          <p className={textStyle}>
            Your data is stored in a MySQL database hosted on a local server. Passwords
            are hashed using bcrypt before storage. No storage or transmission method
            can guarantee complete security.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Cookies and Browser Storage</h2>
          <p className={textStyle}>
            This application stores your user ID in browser localStorage to maintain
            your session. No cookies are used. Clearing your browser storage will log
            you out.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Sharing Information</h2>
          <p className={textStyle}>
            We do not share your personal information with any third parties. Your data
            stays within this application and is not sold or distributed.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Data Retention and Deletion</h2>
          <p className={textStyle}>
            Your account and inventory data is retained as long as your account exists.
            To request deletion of your data, contact the administrator.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Policy Updates</h2>
          <p className={textStyle}>
            We may update this policy when our data practices change. The latest version
            will always be available on this page.
          </p>
        </section>

        <section>
          <h2 className={headingStyle}>Contact</h2>
          <p className={textStyle}>
            For privacy questions, contact the system administrator.
          </p>
        </section>
      </div>
    </article>
  );
};

export default Privacy;