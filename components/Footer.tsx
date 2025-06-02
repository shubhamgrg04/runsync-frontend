import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social & Copyright */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/shubhamgrg04/runsync"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Image src="/github.svg" alt="GitHub" width={20} height={20} />
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} RunSync
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
