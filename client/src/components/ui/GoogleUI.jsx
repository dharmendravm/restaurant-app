export const GoogleLoginUI = () => {
  return (
    <button
      className="w-full bg-white text-gray-800 font-medium py-2.5 px-4 rounded-lg
      flex items-center justify-center gap-3 border border-gray-300
      hover:bg-gray-100 active:scale-[.98] transition shadow-sm"
    >
      <img src="google.png" alt="Google" className="w-5 h-5" />
      <span className="text-sm font-semibold">Sign in with Google</span>
    </button>
  );
};
