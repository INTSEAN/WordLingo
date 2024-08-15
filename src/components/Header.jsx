import React from "react";

function Header() {
  return (
    <>
      <header className="flex items-center p-4 justify-between gap-4">
        <h1 className="font-medium">
          Word <span className="text-purple-400 bold">Lingo</span>
        </h1>
        <button className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-purple-400">
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
      </header>
    </>
  );
}

export default Header;
