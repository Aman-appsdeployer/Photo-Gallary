import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "./ActiveTabProvider.jsx";

export const Logo = ({ className }) => (
  <div>
    <img
      alt="Photo Gallery Logo"
      src={"/images/unnamed.jpg"}
      className={className || "h-14 w-auto p-2 object-contain"}
    />
  </div>
);

export function Footer() {
  const { activeTab, setActiveTab } = useActiveTab();
  const navigate = useNavigate();

  useEffect(() => {
    const handleHashChange = () =>
      setActiveTab(window.location.pathname + window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [setActiveTab]);

  // Navigate within SPA — handles both path and hash
  const handleNavigate = (event, target) => {
    if (event) event.preventDefault();

    // If it's an external link (starts with http), just open normally
    if (/^https?:\/\//i.test(target)) {
      window.open(target, "_blank", "noopener");
      return;
    }

    // If target is a hash-only (like "#contact") and we're on the homepage, scroll
    if (target.startsWith("#")) {
      if (window.location.pathname === "/") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
        setActiveTab(`/${target}`);
      } else {
        // navigate to homepage then add hash (causes a full route change but SPA)
        navigate(`/${target}`);
        setActiveTab(`/${target}`);
      }
      return;
    }

    // Normal SPA navigation to route (e.g. "/about" or "/contact")
    navigate(target);
    setActiveTab(target);
  };

  const isActive = (href) => activeTab === href;

  return (
    <footer className="bg-[#000] text-white font-poppins">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center  text-center text-white gap-10">
          <Logo className="h-14 w-auto" />
          <div className="flex gap-8">
            <a
              aria-label="Contact by Mail"
              className="text-cyan-400 hover:text-primary-foreground transition"
              href="mailto:support@photogallery.com"
            >
              <Mail className="w-6 h-6" />
            </a>

            <a
              aria-label="Instagram"
              className="text-cyan-400 hover:text-primary-foreground transition"
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="w-6 h-6" />
            </a>

            <a
              aria-label="Facebook"
              className="text-cyan-400 hover:text-primary-foreground transition"
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="w-6 h-6" />
            </a>

            <a
              aria-label="Linkedin"
              className="text-cyan-400 hover:text-primary-foreground transition"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center gap-10 text-base font-poppins text-center">
          <a
            href="/"
            onClick={(e) => handleNavigate(e, "/")}
            className={`${isActive("/") ? "text-cyan-400 font-bold" : "text-white hover:text-cyan-400"}`}
          >
            Home
          </a>

          <a
            href="/gallery"
          >
            Gallery
          </a>

          <a
            href="/about"
            onClick={(e) => handleNavigate(e, "/about")}
            className={`${isActive("/about") ? "text-cyan-400 font-bold" : "text-white hover:text-cyan-400"}`}
          >
            About
          </a>

          <a
            href="/contact"
            onClick={(e) => handleNavigate(e, "/contact")}
            className={`${isActive("/contact") ? "text-cyan-400 font-bold" : "text-white hover:text-cyan-400"}`}
          >
            Contact Us
          </a>
          <a
            href="/profile"
            onClick={(e) => handleNavigate(e, "/profile")}
            className={`${isActive("/profile") ? "text-cyan-400 font-bold" : "text-white hover:text-cyan-400"}`}
          >
            Profile
          </a>  
        </div>

        <div className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
          <p>
            ©{new Date().getFullYear()} Photo Gallery - All rights reserved.
            <br />
            Registered Address: (address)
            <br />
            Disclaimer: Past performance is not a guarantee of future results.
          </p>

          <p className="mt-4">
            Please visit our{" "}
            <a
              href="/disclaimer"
              onClick={(e) => handleNavigate(e, "/disclaimer")}
              className="underline underline-offset-2"
              rel="noreferrer"
            >
              Disclaimer Notice page
            </a>{" "}
            for further information.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
