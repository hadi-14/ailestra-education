import Link from "next/link";

export default function NavBarMain() {
  return (
    <nav className="relative h-16 bg-[#DADADA] shadow-md rounded-t-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-2">
        {/* Logo */}
        <Link href={`/`}>
          <div className="flex items-center p-1">
            <img src="/logo.png" alt="Top Grey Logo" className="h-10" />
            <img src="/logo - text.png" alt="Text Logo" className="h-8 ml-1" />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href={`/about`}>
            <p className="text-gray-600 font-bold text-sm">About</p>
          </Link>
          <p className="text-gray-600 font-bold text-sm">Courses</p>
          {/* <p className="text-gray-600 font-bold text-sm">Announcements</p> */}
          <Link href={`/StudentPortal/admission`}>
            <button className="px-3 py-2 bg-[#16007E] text-white font-bold rounded-lg text-sm">
              Admission
            </button>
          </Link>
          <Link href={`/StudentPortal`}>
            <button className="px-3 py-2 bg-[#177A05] text-white font-bold rounded-lg text-sm">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};