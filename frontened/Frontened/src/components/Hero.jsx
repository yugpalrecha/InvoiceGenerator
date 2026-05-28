import { Link } from "react-router-dom";
import HERO_IMG from "../assets/image.png";

const Hero = () => {
  const isAuthenticated = false;

  return (
    <section className="relative bg-[#fbfbfb] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-black/[0.05] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950">
            AI-Powered Invoicing, Made Effortless
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mt-6 mb-8 leading-relaxed max-w-3xl mx-auto">
            Let our AI create invoices from simple text, generate payment
            reminders, and track your business finances effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                Get Started for Free
              </Link>
            )}

            <a
              href="#features"
              className="px-8 py-4 rounded-xl border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <img
            src={HERO_IMG}
            alt="Invoice App Screenshot"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;