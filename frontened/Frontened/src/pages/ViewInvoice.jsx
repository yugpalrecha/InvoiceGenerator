import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, Trash2, Search, Filter } from "lucide-react";
import axios from "../api/axiosinstance.js";
import { API_PATHS } from "../api/apiPath.js";

const ViewAllInvoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [searchTerm, statusFilter, invoices]);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(API_PATHS.INVOICE.GET_ALL);
      if (res.data?.data) {
        setInvoices(res.data.data);
        setFilteredInvoices(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load invoices", err);
    } finally {
      setLoading(false);
    }
  };

  const filterInvoices = () => {
    let filtered = invoices;

    if (statusFilter !== "All") {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(inv =>
        inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.billTo?.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.billTo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInvoices(filtered);
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await axios.delete(`${API_PATHS.INVOICE.DELETE}/${id}`);
      setInvoices(invoices.filter(inv => inv._id !== id));
      alert("Invoice deleted successfully");
    } catch (err) {
      console.error("Failed to delete invoice", err);
      alert("Failed to delete invoice");
    }
  };

  const downloadPDF = async (id) => {
    try {
      const res = await axios.get(`${API_PATHS.INVOICE.DOWNLOAD_PDF}/${id}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download PDF", err);
      alert("Failed to download PDF");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white">All Invoices</h1>
          <p className="text-white/70 mt-2">
            {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'} found
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by invoice number, client name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-950"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-950 appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        {filteredInvoices.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm || statusFilter !== "All" 
                ? "No invoices match your filters" 
                : "No invoices found"}
            </p>
            <button
              onClick={() => navigate("/create-invoice")}
              className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900"
            >
              Create Your First Invoice
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-950 text-white">
                  <tr>
                    <th className="text-left py-4 px-6">Invoice #</th>
                    <th className="text-left py-4 px-6">Client</th>
                    <th className="text-left py-4 px-6">Date</th>
                    <th className="text-right py-4 px-6">Amount</th>
                    <th className="text-center py-4 px-6">Status</th>
                    <th className="text-center py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{inv.invoiceNumber}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{inv.billTo?.clientName || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{inv.billTo?.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(inv.invoiceDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold">
                        ₹{inv.total?.toFixed(2) || '0.00'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          inv.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/invoice/${inv._id}`)}
                            className="p-2 text-blue-950 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => downloadPDF(inv._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => deleteInvoice(inv._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y">
              {filteredInvoices.map((inv) => (
                <div key={inv._id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-lg">{inv.invoiceNumber}</p>
                      <p className="text-sm text-gray-600">{inv.billTo?.clientName || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{inv.billTo?.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      inv.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-600"
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-600">
                      {new Date(inv.invoiceDate).toLocaleDateString()}
                    </p>
                    <p className="font-bold text-lg">₹{inv.total?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/invoice/${inv._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-blue-950 text-blue-950 rounded hover:bg-blue-950 hover:text-white"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => downloadPDF(inv._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white"
                    >
                      <Download size={16} />
                      PDF
                    </button>
                    <button
                      onClick={() => deleteInvoice(inv._id)}
                      className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewAllInvoices;