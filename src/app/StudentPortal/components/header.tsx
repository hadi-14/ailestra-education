import Image from 'next/image'
import Link from 'next/link'

export default function NavBarStudentPortal() {
    return (
        <nav className = "relative h-24 bg-[#DADADA] shadow-lg rounded-t-lg overflow-hidden" >
            <div className="flex items-center justify-between px-8">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center p-2.5">
                        <Image
                            src="/Ailestra/logo.png"
                            alt="Top Grey Logo"
                            width={217}
                            height={65}
                            className="h-16 w-auto"
                            priority
                        />
                        <Image
                            src="/Ailestra/logo - text.png"
                            alt="Text Logo"
                            width={217}
                            height={65}
                            className="h-14 w-auto ml-2"
                            priority
                            />
                    </div>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/dashboard" className="text-gray-600 font-bold">
                        Home
                    </Link>
                    <Link href="/courses" className="text-gray-600 font-bold">
                        My Courses
                    </Link>
                    <Image
                        src="/icons/icon-circle-student.svg"
                        alt='Student Icon'
                        height={65}
                        width={65}
                        className="h-12 w-auto"
                        priority
                    />
                </div>
            </div>
        </nav >
)
}