const Spinner = ({ size = 'h-5 w-5' }) => {
  return (
    <span role="status" className="inline-flex items-center">
      <span
        aria-hidden="true"
        className={`${size} animate-spin rounded-full border-2 border-current border-t-transparent`}
      />
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Spinner;