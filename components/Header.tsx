import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="RunSync Logo"
              width={120}
              height={120}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/connect"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Connect
            </Link>
            <Link
              href="/settings"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Settings
            </Link>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
