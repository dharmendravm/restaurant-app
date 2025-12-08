import React from "react";
import Navbar from "@/layout/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fff6eb] text-[#1b130c]">
      {/*background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-72 w-72 rounded-full bg-[#ffe0b3]/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#ffd6e3]/40 blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-30 pb-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
