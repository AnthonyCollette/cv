import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import NavMenu from "./NavMenu";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container py-16 flex justify-between items-center relative z-1001">
      <Link to="/" className="text-white text-md font-secondary">
        ANTHONY COLLETTE
      </Link>
      <div>
        <button
          className="font-secondary text-md text-white cursor-pointer block relative before:content-[''] before:w-[7px] before:h-[7px] before:absolute before:bg-light-gray before:rounded-full before:right-[calc(100%+11px)] before:top-1/2 before:-translate-y-1/2 z-1001"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "menu"}
        </button>
        {createPortal(<NavMenu open={isOpen} />, document.body)}
      </div>
    </nav>
  );
};

export default Nav;
