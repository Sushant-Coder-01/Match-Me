import { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import NavLink from "./NavLink";
import { SlMenu } from "react-icons/sl";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white text-xl  font-semibold uppercase rounded-md"
      >
        <SlMenu size={25} />
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 bg-gray-400 shadow-lg p-4 w-full flex flex-col items-center gap-2">
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink href="/members" label="Matches" />
          </div>
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink href="/lists" label="Lists" />
          </div>
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink href="/messages" label="Messages" />
          </div>
          <Button
            as={Link}
            href="/login"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Login
          </Button>
          <Button
            as={Link}
            href="/register"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
