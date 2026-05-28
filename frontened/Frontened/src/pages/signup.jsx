import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Building, MapPin, Phone } from "lucide-react";
import axios from "../api/axiosinstance.js";
import { API_PATHS } from "../api/apiPath.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    address: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      // Send registration request to backend
      const response = await axios.post(API_PATHS.AUTH.REGISTER, formData);

      console.log("Registration successful!", response.data);
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMsg);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Dramatic background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-black to-black"></div>
      
      <div className="w-full max-w-6xl h-[650px] relative" style={{ perspective: '2500px' }}>
        
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
                JOIN US!
              </h1>
              <div className="h-1 bg-white mb-8" style={{ width: 0, animation: 'expandWidth 2s ease-out 3s forwards' }}></div>
              <p className="text-white text-xl text-center font-light" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 3.5s forwards' }}>
                Start managing your invoices today
              </p>
            </div>

            {/* Glowing edge effect */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-400 to-transparent opacity-50"></div>
          </div>

          {/* SignUp Form Panel (Right Side) - Dramatic 3D slide */}
          <div 
            className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-gray-950 via-black to-gray-900 shadow-2xl overflow-y-auto"
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
            
            <div className="relative z-10 flex flex-col justify-center min-h-full px-12 py-8">
              

              {/* Title */}
              <div className="text-center mb-8" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 2.8s forwards' }}>
                <h2 className="text-4xl font-bold text-white mb-3">
                  Create Account
                </h2>
                <p className="text-gray-400 text-lg">
                  Join and start managing invoices
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="bg-green-900 bg-opacity-30 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-4">
                  <p className="text-sm font-medium">✅ Account created successfully! Redirecting...</p>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 3.3s forwards' }}>

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Fu Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600 text-sm"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600 text-sm"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Business Name & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Business Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Your Company Ltd"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600 text-sm"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="9876543210"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600 text-sm"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                    <textarea
                      name="address"
                      placeholder="123 Main Street, City, State, ZIP"
                      rows="2"
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all resize-none placeholder-gray-600 text-sm"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      className="w-full pl-10 pr-12 py-3 bg-gray-900 border-2 border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-all placeholder-gray-600 text-sm"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">Must be at least 6 characters</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">⚠️ {error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-all shadow-2xl hover:shadow-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : success ? (
                    "✅ Account Created!"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 pt-6 border-t border-gray-800" style={{ opacity: 0, animation: 'fadeIn 1.5s ease-out 4s forwards' }}>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-gray-300 font-semibold hover:text-white transition"
                  >
                    Sign in
                  </Link>
                </p>
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

        /* Custom scrollbar for the form panel */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.9);
        }
      `}</style>
    </div>
  );
};

export default SignUp;