export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-emerald text-white px-4 py-2 rounded hover:bg-blue transition"
      {...props}
    >
      {children}
    </button>
  );
}
