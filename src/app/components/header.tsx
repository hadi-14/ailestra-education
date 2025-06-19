"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Menu, X } from 'lucide-react';

export default function NavBarMain() {
  const { isScrolled, direction } = useScrollPosition(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/student/admission', label: 'Admission', className: 'bg-[#16007E]' },
    { href: '/student/login', label: 'Student Portal', className: 'bg-[#177A05]' },
  ];

  // Helper function to handle navigation and menu closing
  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`
          w-screen
          fixed top-0 left-0 right-0 z-50 
          h-16 bg-[#DADADA] shadow-md 
          transition-transform duration-300 ease-out
          ${direction === 'scrolling-down' && isScrolled
            ? 'animate-stickyEntry'
            : isScrolled
              ? 'opacity-100'
              : 'translate-y-0 opacity-100'
          }
        `}
      >
        <div className="flex items-center justify-center h-full px-4 md:px-6">
          <div className="flex items-center justify-between w-full max-w-[1300px]">
            {/* Logo */}
            <Link href={`/`} onClick={handleNavigate} className="flex-shrink-0">
              <div className="flex items-center p-1">
                <Image src="/Ailestra/logo.png" alt="Top Grey Logo" width={150} height={150} className="h-10 w-auto" />
                <Image src="/Ailestra/logo - text.png" alt="Text Logo" width={150} height={32} className="h-8 ml-1 w-auto" />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center justify-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.className ? (
                    <button className={`px-4 py-2 ${link.className} text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity`}>
                      {link.label}
                    </button>
                  ) : (
                    <p className="text-gray-600 font-bold text-sm hover:text-gray-800 transition-colors">{link.label}</p>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#DADADA] shadow-lg border-t border-gray-200">
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={handleNavigate} className="w-full">
                  {link.className ? (
                    <button className={`
                      w-full px-4 py-3 
                      ${link.className} 
                      text-white font-bold rounded-lg 
                      text-base text-center
                      hover:opacity-90 transition-opacity
                      shadow-sm
                    `}>
                      {link.label}
                    </button>
                  ) : (
                    <div className="w-full px-4 py-3 text-gray-600 font-bold text-base text-center hover:bg-gray-200 rounded-lg transition-colors">
                      {link.label}
                    </div>
                  )}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="
                  w-full px-4 py-3 
                  bg-[#177A05] text-white 
                  font-bold rounded-lg 
                  text-base text-center
                  hover:opacity-90 transition-opacity
                  shadow-sm
                "
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}