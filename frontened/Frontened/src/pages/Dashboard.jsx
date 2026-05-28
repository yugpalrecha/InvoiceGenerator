import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, FileText, User, RefreshCw, Sparkles, TrendingUp, DollarSign } from "lucide-react";

import { useAuth } from "../api/authcontext.jsx";
import axios from "../api/axiosinstance.js";
import { API_PATHS } from "../api/apiPath.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------- FETCH DATA ----------------

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(API_PATHS.INVOICE.GET_ALL);
      
      console.log("API Response:", res.data);
      
      if (res.data && res.data.data) {
        setInvoices(res.data.data);
        console.log("Invoices loaded:", res.data.data);
      } else {
        setInvoices([]);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to load invoices", err);
      setError("Failed to load invoices");
      setInvoices([]);
    }
  };

  const fetchAiSummary = async () => {
    try {
      setAiLoading(true);
      const res = await axios.get(API_PATHS.AI.DASHBOARD_SUMMARY);
      
      // Handle different response structures
      const summary = res.data.summary || res.data.data?.summary || res.data.data || "AI analysis complete!";
      setAiSummary(summary);
    } catch (err) {
      console.error("Failed to load AI summary", err);
      setAiSummary("AI insights are currently unavailable. Your invoices are being processed.");
    } finally {
      setAiLoading(false);
    }
  };

  // Helper function to format AI summary text
  const formatAiSummary = (text) => {
    if (!text) return null;
    
    // Split by double asterisks for bold sections
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return (
      <div className="space-y-2">
        {parts.map((part, index) => {
          // If it's a bold section (wrapped in **)
          if (part.startsWith('**') && part.endsWith('**')) {
            const content = part.slice(2, -2);
            return (
              <div key={index} className="font-bold text-white text-lg mt-3 first:mt-0">
                {content}
              </div>
            );
          }
          
          // Split by single asterisk for bullet points
          const lines = part.split(/\n/).filter(line => line.trim());
          
          return lines.map((line, lineIndex) => {
            const trimmed = line.trim();
            
            // Bullet point line
            if (trimmed.startsWith('* ')) {
              return (
                <div key={`${index}-${lineIndex}`} className="flex gap-3 ml-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="flex-1">{trimmed.slice(2)}</span>
                </div>
              );
            }
            
            // Regular paragraph
            if (trimmed) {
              return (
                <p key={`${index}-${lineIndex}`} className="text-gray-300">
                  {trimmed}
                </p>
              );
            }
            
            return null;
          });
        })}
      </div>
    );
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchInvoices();
      await fetchAiSummary();
      setLoading(false);
    };
    loadDashboard();
  }, []);

  // ---------------- CALCULATIONS ----------------

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === "Paid");
  const pendingInvoices = invoices.filter(inv => inv.status === "Unpaid");

  const paidAmount = paidInvoices.reduce(
    (sum, inv) => sum + (inv.total || 0),
    0
  );

  const totalAmount = invoices.reduce(
    (sum, inv) => sum + (inv.total || 0),
    0
  );

  const pendingAmount = pendingInvoices.reduce(
    (sum, inv) => sum + (inv.total || 0),
    0
  );

  // ---------------- UI ----------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-800 border-t-slate-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-slate-700 opacity-20 blur-xl"></div>
          </div>
          <p className="text-gray-400 text-lg font-light">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dramatic background effects */}
      <div className="fixed inset-0 bg-gradient-radial from-gray-900 via-black to-black pointer-events-none"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-slate-800 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-slate-700 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ---------------- WELCOME HEADER ---------------- */}
        <div 
          className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 border border-slate-800"
          style={{ 
            opacity: 0, 
            animation: 'fadeInSlide 1s ease-out forwards',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">
                Welcome back, <span className="text-slate-400">{user?.name}</span>! 👋
              </h1>
              <p className="text-base sm:text-lg text-gray-400 font-light">
                {user?.businessName} — Invoice Dashboard
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 transition-all font-medium shadow-lg hover:shadow-red-900/50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* ---------------- ERROR MESSAGE ---------------- */}
        {error && (
          <div 
            className="bg-gradient-to-r from-red-950 to-red-900 border-2 border-red-700 rounded-xl p-4 mb-6 shadow-xl"
            style={{ opacity: 0, animation: 'fadeIn 0.5s ease-out forwards' }}
          >
            <p className="text-red-300 font-semibold">⚠️ Error</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
            <button 
              onClick={fetchInvoices}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* ---------------- STATS CARDS ---------------- */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
          style={{ opacity: 0, animation: 'fadeInSlide 1s ease-out 0.2s forwards' }}
        >
          {/* Total Invoices */}
          <div className="group bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 rounded-xl shadow-xl p-6 border border-blue-800/50 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-700/50 transition-all shadow-lg">
                <FileText className="text-blue-300" size={24} />
              </div>
            </div>
            <p className="text-sm text-blue-300/80 mb-1 font-medium">Total Invoices</p>
            <h3 className="text-5xl font-bold text-white mb-1">
              {totalInvoices}
            </h3>
          </div>

          {/* Unpaid Invoices */}
          <div className="group bg-gradient-to-br from-orange-900/40 via-red-950 to-slate-950 rounded-xl shadow-xl p-6 border border-orange-700/50 hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-orange-800/50 rounded-lg flex items-center justify-center group-hover:bg-orange-700/50 transition-all shadow-lg">
                <TrendingUp className="text-orange-300" size={24} />
              </div>
            </div>
            <p className="text-sm text-orange-300/80 mb-1 font-medium">Unpaid Invoices</p>
            <h3 className="text-5xl font-bold text-white mb-1">
              {pendingInvoices.length}
            </h3>
            <p className="text-xs text-orange-400/90 mt-1 font-semibold">₹{pendingAmount.toFixed(2)} pending</p>
          </div>

          {/* Paid Amount */}
          <div className="group bg-gradient-to-br from-green-900/40 via-emerald-950 to-slate-950 rounded-xl shadow-xl p-6 border border-green-700/50 hover:border-green-500 transition-all hover:shadow-2xl hover:shadow-green-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-700/50 transition-all shadow-lg">
                <DollarSign className="text-green-300" size={24} />
              </div>
            </div>
            <p className="text-sm text-green-300/80 mb-1 font-medium">Paid Amount</p>
            <h3 className="text-5xl font-bold text-white mb-1">
              ₹{paidAmount.toFixed(2)}
            </h3>
            <p className="text-xs text-green-400/90 mt-1 font-semibold">{paidInvoices.length} paid invoices</p>
          </div>

          {/* Total Revenue */}
          <div className="group bg-gradient-to-br from-violet-900/40 via-blue-950 to-slate-950 rounded-xl shadow-xl p-6 border border-violet-700/50 hover:border-violet-500 transition-all hover:shadow-2xl hover:shadow-violet-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-violet-800/50 rounded-lg flex items-center justify-center group-hover:bg-violet-700/50 transition-all shadow-lg">
                <Sparkles className="text-violet-300" size={24} />
              </div>
            </div>
            <p className="text-sm text-violet-300/80 mb-1 font-medium">Total Revenue</p>
            <h3 className="text-5xl font-bold text-white mb-1">
              ₹{totalAmount.toFixed(2)}
            </h3>
            <p className="text-xs text-violet-400/90 mt-1 font-semibold">All time</p>
          </div>
        </div>

        {/* ---------------- AI INSIGHTS ---------------- */}
        <div 
          className="bg-gradient-to-br from-purple-900/30 via-slate-900 to-slate-950 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 border border-purple-800/50 relative overflow-hidden"
          style={{ 
            opacity: 0, 
            animation: 'fadeInSlide 1s ease-out 0.4s forwards',
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15)'
          }}
        >
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-purple-800/50 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-purple-300" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white">AI Insights</h2>
              </div>
              
              <button
                onClick={fetchAiSummary}
                disabled={aiLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-800/50 text-purple-200 rounded-lg hover:bg-purple-700/50 transition-all font-medium disabled:opacity-50 border border-purple-700/50"
              >
                <RefreshCw size={18} className={aiLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
              {aiLoading ? (
                <div className="flex items-center gap-3 text-purple-200">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent"></div>
                  <span className="font-medium">Analyzing your invoices with AI...</span>
                </div>
              ) : (
                <div className="text-gray-200 text-base leading-relaxed">
                  {aiSummary ? (
                    formatAiSummary(aiSummary)
                  ) : (
                    <p className="text-gray-400 italic">
                      Click "Refresh" to generate AI insights about your invoices
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- QUICK ACTIONS ---------------- */}
        <div 
          className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 border border-slate-800"
          style={{ 
            opacity: 0, 
            animation: 'fadeInSlide 1s ease-out 0.6s forwards',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Create Invoice */}
            <button
              onClick={() => navigate("/create-invoice")}
              className="group flex items-center gap-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl hover:border-blue-600 hover:shadow-xl hover:shadow-blue-900/20 transition-all"
            >
              <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center group-hover:bg-blue-800 transition-all shadow-lg">
                <Plus className="text-blue-300" size={28} />
              </div>
              <span className="font-semibold text-gray-200 text-lg">
                Create Invoice
              </span>
            </button>

            {/* View All Invoices */}
            <button
              onClick={() => navigate("/invoices")}
              className="group flex items-center gap-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl hover:border-purple-600 hover:shadow-xl hover:shadow-purple-900/20 transition-all"
            >
              <div className="w-14 h-14 bg-purple-900 rounded-xl flex items-center justify-center group-hover:bg-purple-800 transition-all shadow-lg">
                <FileText className="text-purple-300" size={28} />
              </div>
              <span className="font-semibold text-gray-200 text-lg">
                All Invoices
              </span>
            </button>

            {/* Edit Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="group flex items-center gap-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl hover:border-green-600 hover:shadow-xl hover:shadow-green-900/20 transition-all"
            >
              <div className="w-14 h-14 bg-green-900 rounded-xl flex items-center justify-center group-hover:bg-green-800 transition-all shadow-lg">
                <User className="text-green-300" size={28} />
              </div>
              <span className="font-semibold text-gray-200 text-lg">
                Edit Profile
              </span>
            </button>
          </div>
        </div>

        {/* ---------------- RECENT INVOICES ---------------- */}
        <div 
          className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-800"
          style={{ 
            opacity: 0, 
            animation: 'fadeInSlide 1s ease-out 0.8s forwards',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Recent Invoices
            </h2>
            <button
              onClick={fetchInvoices}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-all"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-slate-600" />
              </div>
              <p className="text-gray-400 mb-6 text-lg">No invoices yet</p>
              <button
                onClick={() => navigate("/create-invoice")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 font-semibold shadow-lg hover:shadow-blue-900/50 transition-all"
              >
                Create Your First Invoice
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-slate-800">
                  <tr>
                    <th className="text-left py-4 px-4 font-medium">Invoice #</th>
                    <th className="text-left py-4 px-4 font-medium">Client</th>
                    <th className="text-right py-4 px-4 font-medium">Amount</th>
                    <th className="text-center py-4 px-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.slice(0, 5).map(inv => (
                    <tr 
                      key={inv._id} 
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/invoices/${inv._id}`)}
                    >
                      <td className="py-4 px-4 font-semibold text-white">{inv.invoiceNumber}</td>
                      <td className="py-4 px-4 text-gray-300">{inv.billTo?.clientName || inv.billTo?.email || 'N/A'}</td>
                      <td className="py-4 px-4 text-right font-bold text-white">₹{inv.total?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold ${
                            inv.status === "Paid"
                              ? "bg-green-900/50 text-green-300 border border-green-700"
                              : "bg-orange-900/50 text-orange-300 border border-orange-700"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {invoices.length > 5 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => navigate("/invoices")}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-all"
                  >
                    View All {invoices.length} Invoices →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;