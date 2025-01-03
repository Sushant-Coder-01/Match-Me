"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { CgMenu } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { getUserInfoForNav } from "@/app/actions/userActions";
import FiltersWrapper from "./FiltersWrapper";

type Data = {
  image: string | null;
  name: string | null;
} | null;

const TopNav = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<Data>(null);

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfoForNav();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 z-50"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
          ],
        }}
      >
        {/* Navbar Logo */}
        <NavbarBrand as={Link} href={"/"}>
          <GiSelfLove size={40} className="text-gray-200" />
          <div className="font-bold text-3xl mx-2">
            <span className="text-gray-200">MatchMe</span>
          </div>
        </NavbarBrand>

        {/* Navbar Content */}
        {status === "loading" ? (
          <div className="hidden sm:flex gap-2">
            <div className="w-20 h-10 rounded-md animate-pulse bg-gradient-to-br from-gray-300/50 via-gray-50/90 to-gray-300/50"></div>
            <div className="w-20 h-10 rounded-md animate-pulse bg-gradient-to-br from-gray-300/50 via-gray-50/90 to-gray-300/50"></div>
          </div>
        ) : session ? (
          <>
            {/* When Logged In */}
            <NavbarContent
              justify="center"
              className="hidden md:flex md:space-x-10"
            >
              {session.user.role === "ADMIN" ? (
                <NavLink href="/admin/moderation" label="Photo Moderation" />
              ) : (
                <>
                  <NavLink href="/members" label="Matches" />
                  <NavLink href="/lists" label="Lists" />
                  <NavLink href="/messages" label="Messages" />
                </>
              )}
            </NavbarContent>
            <NavbarContent justify="end" className="hidden md:flex">
              <span className="text-white">
                Welcome, {userInfo?.name || session.user?.name || "User"}
              </span>
            </NavbarContent>
            <UserMenu user={userInfo || session.user} />
          </>
        ) : (
          <>
            {/* When Not Logged In */}
            <NavbarContent justify="end" className="hidden md:flex">
              <Button as={Link} href="/login" variant="bordered">
                Login
              </Button>
              <Button as={Link} href="/register" variant="bordered">
                Register
              </Button>
            </NavbarContent>
          </>
        )}

        {/* Mobile Menu Toggle */}
        {!session && (
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-lg font-bold"
          >
            {isMenuOpen ? (
              <MdCancel size={30} color="white" />
            ) : (
              <CgMenu size={30} color="white" />
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && !session && (
          <NavbarMenu className="fixed inset-0 flex items-center justify-center md:hidden">
            <NavbarMenuItem className=" w-full flex flex-col items-center space-y-5">
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="w-full text-center py-3 px-6 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={handleLinkClick}
                className="w-full text-center py-3 px-6 rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        )}
      </Navbar>
      <FiltersWrapper />
    </>
  );
};

export default TopNav;
