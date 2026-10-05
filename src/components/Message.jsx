import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

// type: 'success' | 'error' | 'info'
const Message = ({ message, type = 'error' }) => {
  if (!message) return null;

  const styles = {
    success: { bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', icon: <FiCheckCircle size={16} /> },
    error:   { bg: 'bg-red-500/10 border-red-500/30 text-red-400',             icon: <FiXCircle size={16} /> },
    info:    { bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',           icon: <FiAlertCircle size={16} /> },
  };

  const { bg, icon } = styles[type] || styles.error;

  return (
    <div className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${bg}`}>
      {icon}
      {message}
    </div>
  );
};

export default Message;
