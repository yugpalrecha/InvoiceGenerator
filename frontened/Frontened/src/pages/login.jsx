import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "../api/axiosinstance.js";
import { API_PATHS } from "../api/apiPath.js";
import { useAuth } from "../api/authcontext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    // Send login request to backend
    const response = await axios.post(
      API_PATHS.AUTH.LOGIN,
      {
        email,
        password,
      }
    );

    console.log("Login Response:", response.data);

    // Get user from backend response
    const userData = response.data.user;

    // Temporary token (until JWT is implemented)
    const userToken = "dummy-token";

    // Save login data
    login(userData, userToken);

    console.log("Login successful!");

  } catch (err) {
    console.error("Login error:", err);

    const errorMsg =
      err.response?.data?.message ||
      "Login failed. Please try again.";

    setError(errorMsg);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Dramatic background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-black to-black"></div>
      
      <div className="w-full max-w-6xl h-[600px] relative" style={{ perspective: '2500px' }}>
        
        {/* Main Container with 3D perspective */}
        <div className="relative w-full h-full">
          
          {/* Welcome Panel (Left Side) - Dramatic 3D slide */}
          <div 
            className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'slideInLeft3D 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transformOrigin: 'left center',
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
              boxShadow: '20px 0 60px rgba(0,0,0,0.8)'
            }}
          >
            {/* Decorative geometric shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-slate-600 opacity-10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500 opacity-10 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
            
            {/* Welcome Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">
              <h1 className="text-7xl font-bold text-white mb-6 tracking-wider" style={{ opacity: 0, animation: 'fadeInScale 1.5s ease-out 2s forwards' }}>
                WELCOME!
              </h1>
              <div className="h-1 bg-white mb-8" style={{ width: 0, animation: 'expandWidth 2s ease-out 3s forwards' }}></div>
              <p className="text-white text-xl text-center font-light" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 3.5s forwards' }}>
                Manage your invoices with ease
              </p>
            </div>

            {/* Glowing edge effect */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-400 to-transparent opacity-50"></div>
          </div>

          {/* Login Form Panel (Right Side) - Dramatic 3D slide */}
          <div 
            className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-gray-950 via-black to-gray-900 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'slideInRight3D 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transformOrigin: 'right center',
              clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.8)'
            }}
          >
            {/* Subtle glow effects */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-700 opacity-5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col justify-center h-full px-16 py-8">
              
              {/* Logo */}
              <div className="flex justify-center mb-8" style={{ opacity: 0, transform: 'scale(0.5)', animation: 'popIn 1s ease-out 2.2s forwards' }}>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-2xl border border-slate-600">
                  <span className="text-4xl">📄</span>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-10" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 2.8s forwards' }}>
                <h2 className="text-4xl font-bold text-white mb-3">
                  Login
                </h2>
                <p className="text-gray-400 text-lg">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 3.3s forwards' }}>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-14 py-4 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">⚠️ {error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-2xl hover:shadow-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Signup Link */}
              <div className="mt-8 pt-6 border-t border-gray-800" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 4s forwards' }}>
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-gray-300 font-semibold hover:text-white transition"
                  >
                    Create account
                  </Link>
                </p>
                {/* Signup Link */}
               <div className="mt-8 pt-6 border-t border-gray-800" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 4s forwards' }}>
               <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
               <Link 
                to="/register" 
                 className="text-gray-300 font-semibold hover:text-white transition"
               >
      Create account
    </Link>
  </p>
</div>
              </div>
            </div>
    
            {/* Glowing edge effect on left side */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-50"></div>
            
          </div>

        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes slideInLeft3D {
          0% {
            transform: translateX(-150%) translateZ(-500px) rotateY(-45deg);
            opacity: 0;
          }
          60% {
            transform: translateX(5%) translateZ(-50px) rotateY(2deg);
          }
          100% {
            transform: translateX(0) translateZ(0) rotateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight3D {
          0% {
            transform: translateX(150%) translateZ(-500px) rotateY(45deg);
            opacity: 0;
          }
          60% {
            transform: translateX(-5%) translateZ(-50px) rotateY(-2deg);
          }
          100% {
            transform: translateX(0) translateZ(0) rotateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandWidth {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 10rem;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;