import Link from "next/link";

export default function NavBarMain() {
  return (
    <nav className="relative h-24 bg-[#DADADA] shadow-lg rounded-t-lg overflow-hidden">
      <div className="flex items-center justify-between px-8">
        {/* Logo */}
        <Link href={`/`}>
          <div className="flex items-center p-2.5">
            <img src="/logo.png" alt="Top Grey Logo" className="h-16" />
            <img src="/logo - text.png" alt="Text Logo" className="h-14 ml-2" />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4 md:gap-8">
          <a href="#" className="text-gray-600 font-bold">About</a>
          <a href="#" className="text-gray-600 font-bold">Courses & Curriculum</a>
          <a href="#" className="text-gray-600 font-bold">Announcements</a>
          <Link href={`/StudentPortal/admission`}>
            <button className="px-6 py-3 bg-[#16007E] text-white font-bold rounded-lg">
              Admission
            </button>
          </Link>
          <Link href={`/StudentPortal`}>

            <button className="px-6 py-3 bg-[#177A05] text-white font-bold rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>

  );
};
