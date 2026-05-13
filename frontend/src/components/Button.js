const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
