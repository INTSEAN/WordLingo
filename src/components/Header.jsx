import React from "react";

function Header() {
  return (
    <>
      <header className="flex items-center p-4 justify-between gap-4">
        <a href="/">
          <h1 className="font-medium">
            Word <span className="text-purple-400 bold">Lingo</span>
          </h1>
        </a>

        <a
          href="/"
          className="flex items-center gap-2 specialBtn px-4 py-2 text-sm rounded-lg text-purple-400"
        >
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </a>
      </header>
    </>
  );
}

export default Header;
