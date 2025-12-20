function FindYourAccount() {
  return (
    <div className="max-h-screen h-4/6 flex justify-center items-center">
      <div className="w-[400px] flex justify-center items-center flex-col gap-7 h-screen">
        <div>
          <h1 className="text-xl font-bold text-[#fcc735]">Find Your Account</h1>
        </div>

        <div>
          <p className="text-gray-400 text-md">
            Please enter you email address to search for you account.
          </p>
        </div>

        <div className="w-full">
          <form>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-200 text-sm"
              placeholder="riteshpatidar088@gmail.com"
            />
          </form>
        </div>
        <div className="w-full">
          <button className="w-full py-2.5 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindYourAccount;
