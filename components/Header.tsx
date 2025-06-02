"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { LoginResponse } from "../app/types/auth";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AUTH_EVENT } from "../app/utils/auth";

interface MenuItemProps {
  active: boolean;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLandingPage = pathname === "/";

  useEffect(() => {
    // Initial user data load
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }

    // Listen for auth state changes
    const handleAuthChange = (
      event: CustomEvent<LoginResponse["user"] | null>
    ) => {
      setUser(event.detail);
    };

    window.addEventListener(AUTH_EVENT, handleAuthChange as EventListener);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <header
      className={`w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 ${
        !isLandingPage ? "px-4" : ""
      }`}
    >
      <div
        className={`${
          isLandingPage ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : "w-full"
        }`}
      >
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="RunSync Logo"
              width={28}
              height={28}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className="ml-2 text-2xl font-medium font-gabarito text-gray-900 dark:text-white">
              RunSync
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {isLandingPage && (
              <Link
                href="https://github.com/shubhamgrg04/runsync"
                target="_blank"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito inline-flex items-center gap-2"
              >
                <Image
                  src="/github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="dark:invert"
                  priority
                />
                GitHub
              </Link>
            )}
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito">
                  <span className="mr-2">{user.first_name}</span>
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }: MenuItemProps) => (
                          <Link
                            href="/dashboard/settings"
                            className={`${
                              active
                                ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            } block px-4 py-2 text-sm`}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }: MenuItemProps) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active
                                ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            } block w-full text-left px-4 py-2 text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito"
              >
                Login
              </Link>
            )}
          </nav>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
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
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard/settings"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium font-gabarito"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
