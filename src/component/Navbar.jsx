// src/component/Navbar.jsx
import { Popover, Transition } from "@headlessui/react";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useActiveTab } from "./ActiveTabProvider.jsx";
import { useTheme } from "./ThemeContext.jsx";

/** Nav item (desktop) */
function NavItem({ href, children, isActive, onClick }) {
  return (
    <li className="px-4">
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className={`block px-2 py-2 text-base font-bold transition ${
          isActive ? "text-cyan-400" : "text-white dark:text-gray-300 hover:text-cyan-400"
        }`}
      >
        {children}
      </a>
    </li>
  );
}

/** Theme toggle button */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getEffective = () => {
    if (theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  };

  const effective = typeof window !== "undefined" ? getEffective() : "light";

  const toggle = () => {
    const next = effective === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors duration-200"
      aria-label="Toggle theme"
      title={`Switch to ${effective === "dark" ? "light" : "dark"} mode`}
    >
      {effective === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

/** Desktop nav (visible on lg+) */
function DesktopNavigation() {
  const { activeTab, setActiveTab } = useActiveTab();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(location.pathname + location.hash);
  }, [location.pathname, location.hash, setActiveTab]);

  const go = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <nav className="hidden lg:flex tracking-wide font-poppins">
      <ul className="flex items-center -space-x-4 tracking-wider text-white text-[16px] xl:text-[20px]">
        <NavItem href="/" isActive={activeTab === "/"} onClick={() => go("/")}>
          Home
        </NavItem>

        <NavItem href="/gallery" isActive={activeTab === "/gallery"} onClick={() => go("/gallery")}>
          Gallery
        </NavItem>

        <NavItem href="/about" isActive={activeTab === "/about"} onClick={() => go("/about")}>
          About
        </NavItem>

        <NavItem href="/contact" isActive={activeTab === "/contact"} onClick={() => go("/contact")}>
          Contact
        </NavItem>
        <NavItem href="/profile" isActive={activeTab === "/profile"} onClick={() => go("/profile")}>
          Profile
        </NavItem>

        
      </ul>
    </nav>
  );
}

/** Mobile menu */
function MobileNavigation() {
  const { setActiveTab } = useActiveTab();
  const navigate = useNavigate();

  const handleNav = (href, closePopover) => {
    setActiveTab(href);
    navigate(href);
    // close popover panel if provided
    if (typeof closePopover === "function") closePopover();
  };

  return (
    <div className="lg:hidden font-poppins">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className="focus:outline-none"
              aria-label="Open menu"
              title="Open menu"
            >
              <Menu className="h-6 w-6 text-white dark:text-cyan-400" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel className="absolute top-0 left-0 w-full z-50">
                <div className="fixed inset-0 bg-gray-300 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-90" />
                <div className="relative w-full bg-gray-300 dark:bg-gray-800 p-4 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <HomeLogo />
                    <Popover.Button className="focus:outline-none" aria-label="Close menu">
                      <X className="h-6 w-6 text-cyan-400" />
                    </Popover.Button>
                  </div>

                  <nav className="mt-4">
                    <ul className="space-y-4">
                      <li>
                        <button
                          onClick={() => handleNav("/", close)}
                          className="w-full text-left px-2 py-2 text-white hover:text-cyan-400"
                        >
                          Home
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => handleNav("/gallery", close)}
                          className="w-full text-left px-2 py-2 text-white hover:text-cyan-400"
                        >
                          Gallery
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => handleNav("/about", close)}
                          className="w-full text-left px-2 py-2 text-white hover:text-cyan-400"
                        >
                          About
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => handleNav("/contact", close)}
                          className="w-full text-left px-2 py-2 text-white hover:text-cyan-400"
                        >
                          Contact
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNav("/profile", close)}
                          className="w-full text-left px-2 py-2 text-white hover:text-cyan-400"
                        >
                          Profile
                        </button>
                      </li> 

                     

                      {/* Mobile quick login/create */}
                      <li className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleNav("/login", close)}
                          className="px-3 py-2 rounded-md bg-cyan-400 text-black font-semibold"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => handleNav("/create", close)}
                          className="px-3 py-2 rounded-md border border-cyan-400 text-white"
                        >
                          Create
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

/** Logo component used in header/menu */
function HomeLogo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Go to home">
      <img
        src="/logo2.png"
        alt="Photo Gallery"
        className="h-8 w-auto object-contain filter invert dark:filter-none"
      />
      <span className="text-white font-bold text-lg" aria-hidden></span>
    </Link>
  );
}

/** User dropdown using Headless UI Popover */
function UserDropdown() {
  const { setActiveTab } = useActiveTab();

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors duration-200 focus:outline-none"
        aria-label="Open user menu"
      >
        <User className="w-5 h-5" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-1 scale-95"
      >
        <Popover.Panel className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-black dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <Link
              to="/login"
              onClick={() => setActiveTab("/login")}
              className="block px-4 py-2 text-sm text-white hover:bg-cyan-500 hover:text-black"
            >
              Login
            </Link>
            <Link
              to="/create"
              onClick={() => setActiveTab("/create")}
              className="block px-4 py-2 text-sm text-white hover:bg-cyan-500 hover:text-black"
            >
              Create
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

/** Main Navbar component */
export function Navbar() {
  const { activeTab } = useActiveTab();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <header className="fixed top-0 w-full z-50 bg-black backdrop-blur-xl bg-opacity-70">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between font-poppins">
        <HomeLogo />

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-grow justify-center">
          <DesktopNavigation />
        </div>

        <div className="flex items-center space-x-3 lg:space-x-4 lg:mr-5">
          {/* Desktop theme toggle */}
          <div className="hidden lg:flex">
            <ThemeToggle />
          </div>

          {/* User dropdown (desktop) */}
          <div className="hidden lg:flex">
            <UserDropdown />
          </div>

          {/* Mobile: show theme toggle and menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;





