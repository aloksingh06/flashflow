import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 text-[#7472f2] ">
      <h1 className=" text-2xl font-bold">FlashFlow</h1>
      <ul className="flex space-x-6">
        <Link href="/Home" className=" hover:text-gray-400 cursor-pointer">Home</Link>
        <Link href="/about" className=" hover:text-gray-400 cursor-pointer">About</Link>
        <Link href="/contact" className=" hover:text-gray-400 cursor-pointer">Contact</Link>
      </ul>
    </div>
  );
};

export default Navbar;
