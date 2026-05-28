import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, FileText } from "lucide-react";

/* ---------- Reusable Footer Link ---------- */
const FooterLink = ({ href, to, children }) => {
  const className =
    "block text-gray-400 hover:text-white transition-colors duration-200";

  if (to) {
    return <Link to={to} className={className}>{children}</Link>;
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

/* ---------- Social Icon Link ---------- */
const SocialLink = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center hover:bg-blue-900 transition"
    >
      {children}
    </a>
  );
};

/* ---------- Footer Component ---------- */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-lg">
              <FileText />
              <span>AI Invoice App</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered invoicing to help you create, manage, and get paid
              faster with smart automation.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">
              Company
            </h3>
            <ul className="space-y-2">
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <SocialLink href="#">
                <Twitter size={18} />
              </SocialLink>
              <SocialLink href="https://github.com/">
                <Github size={18} />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/yug-palrecha/">
                <Linkedin size={18} />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 AI Invoice App. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
