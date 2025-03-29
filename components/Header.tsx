"use client";
import Image from "next/image";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
  const board = useBoardStore((state) => state.board);

  React.useEffect(() => {
    if (!board || board.columns.size === 0) {
      console.log("Board is empty or uninitialized.");
    }
  }, [board]);

  return (
    <header
      style={{
        color: "black",
        textAlign: "center"
      }}
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-10"></div>

      {/* Header Content */}
      <div className="flex flex-col md:flex-row items-center p-5 rounded-2xl">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Flow_Sharp.png"
          alt="Flow Logo"
          width={300}
          height={300}
          className="w-24 md:w-40 h-auto object-contain"
        />
        <div className="flex items-center space-x-5 w-full justify-end rounded-2xl">
          <form className="flex items-center space-x-5 rounded-3xl flex-1 md:flex-initial bg-transparent px-2">
            <MagnifyingGlassCircleIcon className="w-10 h-10 text-[#7ABDF8]" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2 rounded-3xl bg-blue-950 text-blue-400"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
