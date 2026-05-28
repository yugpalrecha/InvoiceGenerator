import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosinstance";
import { API_PATHS } from "../api/apiPath";

const DeleteInvoice = () => {
  const navigate = useNavigate();

  const [invoiceId, setInvoiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.delete(API_PATHS.INVOICE.DELETE(invoiceId));

      alert("Invoice deleted successfully");

      // redirect after delete
      navigate("/invoices");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Delete Invoice</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleDelete}>
        <input
          placeholder="Enter Invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Deleting..." : "Delete Invoice"}
        </button>
      </form>
    </div>
  );
};

export default DeleteInvoice;
