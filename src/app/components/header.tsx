"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useScrollPosition } from '@/hooks/use-scroll-position';
import LoginModal from './LoginModal'; // Adjust the import path as needed

export default function NavBarMain() {
  const { isScrolled, direction } = useScrollPosition(50);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <nav 
        className={`
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
        <div className="flex items-center justify-center px-6 pt-2">
          <div className="flex items-center justify-between w-full max-w-[1300px]">
            {/* Logo */}
            <Link href={`/`}>
              <div className="flex items-center p-1">
                <Image src="/Ailestra/logo.png" alt="Top Grey Logo" width={150} height={150} className="h-10 w-auto" />
                <Image src="/Ailestra/logo - text.png" alt="Text Logo" width={150} height={32} className="h-8 ml-1 w-auto" />
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link href={`/about`}>
                <p className="text-gray-600 font-bold text-sm">About</p>
              </Link>
              <Link href={`/courses`}>
                <p className="text-gray-600 font-bold text-sm">Courses</p>
              </Link>
              <Link href={`/StudentPortal/admission`}>
                <button className="px-3 py-2 bg-[#16007E] text-white font-bold rounded-lg text-sm">
                  Admission
                </button>
              </Link>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-2 bg-[#177A05] text-white font-bold rounded-lg text-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}