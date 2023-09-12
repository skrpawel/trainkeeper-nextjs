"use client";

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import NavbarElement from "./navbar-element";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const { data: session } = useSession();

  return (
    <div className="fixed w-full bg-black bg-opacity-40">
      <div className="flex text-[#FFFCF2] justify-between items-center w-full p-6">
        <Link href="/">
          <h1 className="text-4xl font-bold text-prime">
            {process.env.appName}
          </h1>
        </Link>
        <ul className="hidden md:flex md:justify-end uppercase">
          <NavbarElement href="/" label="Home" onClick={() => {}} />
          <NavbarElement href="/calendar" label="Calendar" />
          {session?.user ? (
            <>
              <NavbarElement
                href="/login"
                label="Sign out"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <>
              <NavbarElement href="/login" label="Login" />
              <NavbarElement href="/register" label="Sign Up" />
            </>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
