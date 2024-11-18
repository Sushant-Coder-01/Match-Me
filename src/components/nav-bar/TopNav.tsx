"use client";

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar
        maxWidth="full"
        className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-400"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
          ],
        }}
      >
        <NavbarBrand as={Link} href={"/"}>
          <GiSelfLove size={40} className="text-gray-200" />
          <div className="font-bold text-3xl mx-2">
            <span className="text-gray-200">MatchMe</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center" className="hidden md:flex">
          <NavLink href="/members" label="Matches" />
          <NavLink href="/lists" label="Lists" />
          <NavLink href="/messages" label="Messages" />
        </NavbarContent>
        <NavbarContent justify="end" className="hidden md:flex">
          <Button
            as={Link}
            href="/login"
            variant="bordered"
            className="text-white"
          >
            Login
          </Button>
          <Button
            as={Link}
            href="/register"
            variant="bordered"
            className="text-white"
          >
            Register
          </Button>
        </NavbarContent>
        <MobileMenu />
      </Navbar>
    </div>
  );
};

export default TopNav;
