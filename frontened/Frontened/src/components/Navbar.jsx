import React, { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isAuthenticated = true;

  const user = {
    name: "Alex",
    email: "alex@gmail.com",
    avatar: "",
  };

  const logout = () => {
    console.log("Logout");
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setProfileDropdownOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
         isScrolled ? "bg-black shadow-md" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center text-white">
              <FileText size={18} />
            </div>
            <span className="text-lg font-semibold text-white">
              AI Invoice App
            </span>
          </div>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-white">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#testimonials" className="hover:text-white">Testimonials</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user.avatar}
                companyName={user.name}
                email={user.email}
                onLogout={logout}
              />
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col p-6 gap-4 text-sm">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
            {!isAuthenticated ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
