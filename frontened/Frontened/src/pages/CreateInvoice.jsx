import { useState } from "react";
import axios from "../api/axiosinstance";
import { API_PATHS } from "../api/apiPath";

const CreateInvoice = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    billFrom: { businessName: "", email: "", address: "", phone: "" },
    billTo: { clientName: "", email: "", address: "", phone: "" },
    items: [{ name: "", quantity: 1, unitPrice: 0, taxPercent: 0 }],
    notes: "",
    paymentTerms: "Net 15"
  });

  // ---------- INPUT HANDLERS ----------
  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (section) {
      setForm({
        ...form,
        [section]: { ...form[section], [name]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...form.items];
    updated[index][name] = value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: 1, unitPrice: 0, taxPercent: 0 }]
    });
  };

  const removeItem = (index) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(API_PATHS.INVOICE.CREATE, form);
      setMessage("✅ Invoice created successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating invoice");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-10">
      <div className="w-full max-w-4xl bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center">Create Invoice</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Invoice Info */}
          <div className="grid grid-cols-3 gap-4">
            <input name="invoiceNumber" placeholder="Invoice Number"
              className="inputStyle" onChange={handleChange} required />
            <input type="date" name="invoiceDate"
              className="inputStyle" onChange={handleChange} required />
            <input type="date" name="dueDate"
              className="inputStyle" onChange={handleChange} />
          </div>

          {/* Bill From */}
          <h3 className="sectionTitle">Bill From</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="businessName" placeholder="Business Name"
              className="inputStyle" onChange={(e)=>handleChange(e,"billFrom")} />
            <input name="email" placeholder="Email"
              className="inputStyle" onChange={(e)=>handleChange(e,"billFrom")} />
            <input name="address" placeholder="Address"
              className="inputStyle col-span-2" onChange={(e)=>handleChange(e,"billFrom")} />
            <input name="phone" placeholder="Phone"
              className="inputStyle" onChange={(e)=>handleChange(e,"billFrom")} />
          </div>

          {/* Bill To */}
          <h3 className="sectionTitle">Bill To</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="clientName" placeholder="Client Name"
              className="inputStyle" onChange={(e)=>handleChange(e,"billTo")} />
            <input name="email" placeholder="Email"
              className="inputStyle" onChange={(e)=>handleChange(e,"billTo")} />
            <input name="address" placeholder="Address"
              className="inputStyle col-span-2" onChange={(e)=>handleChange(e,"billTo")} />
            <input name="phone" placeholder="Phone"
              className="inputStyle" onChange={(e)=>handleChange(e,"billTo")} />
          </div>

          {/* Items */}
          <h3 className="sectionTitle">Items</h3>

          {form.items.map((item, i) => (
            <div key={i} className="grid grid-cols-5 gap-3 items-center">
              <input name="name" placeholder="Item"
                className="inputStyle" onChange={(e)=>handleItemChange(i,e)} />
              <input name="quantity" type="number" placeholder="Qty"
                className="inputStyle" onChange={(e)=>handleItemChange(i,e)} />
              <input name="unitPrice" type="number" placeholder="Price"
                className="inputStyle" onChange={(e)=>handleItemChange(i,e)} />
              <input name="taxPercent" type="number" placeholder="Tax %"
                className="inputStyle" onChange={(e)=>handleItemChange(i,e)} />

              {form.items.length > 1 && (
                <button type="button"
                  onClick={()=>removeItem(i)}
                  className="bg-red-600 px-3 py-2 rounded">
                  ✕
                </button>
              )}
            </div>
          ))}

          <button type="button"
            onClick={addItem}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
            + Add Item
          </button>

          {/* Notes */}
          <textarea name="notes" placeholder="Notes"
            className="inputStyle" onChange={handleChange} />

          {/* Submit */}
          <button disabled={loading}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-800 py-3 rounded-xl font-semibold text-lg hover:from-slate-600 hover:to-slate-700 transition">
            {loading ? "Creating Invoice..." : "Create Invoice"}
          </button>

          {message && (
            <p className="text-center mt-3 text-green-400">{message}</p>
          )}

        </form>
      </div>

      {/* reusable styles */}
      <style>{`
        .inputStyle {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: #111827;
          border: 1px solid #374151;
          color: white;
        }

        .inputStyle:focus {
          outline: none;
          border-color: #64748b;
          box-shadow: 0 0 0 1px #64748b;
        }

        .sectionTitle {
          font-weight: 600;
          margin-top: 10px;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default CreateInvoice;
