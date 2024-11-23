"use client";

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";

const TopNav = () => {
  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-400"
    >
      <NavbarBrand as={Link} href={"/"}>
        <GiSelfLove size={40} className="text-gray-200" />
        <div className="font-bold text-3xl mx-2">
          <span className="text-gray-200">MatchMe</span>
        </div>
      </NavbarBrand>
      
      {/* Desktop Links */}
      <NavbarContent justify="center" className="hidden md:flex">
        <NavLink href="/members" label="Matches" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      
      {/* Desktop Login/Register Buttons */}
      <NavbarContent justify="end" className="hidden md:flex">
        <Button
          as={Link}
          href="/login"
          className="text-white border-none"
        >
          Login
        </Button>
        <Button
          as={Link}
          href="/register"
          className="text-white border-none"
        >
          Register
        </Button>
      </NavbarContent>

      {/* Mobile Menu */}
      <MobileMenu />
    </Navbar>
  );
};

export default TopNav;
