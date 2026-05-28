import { callLLM } from "../utils/llm.js";
import { Invoice } from "../models/Invoice.js";

const parseInvoiceFromText = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const prompt = `
Convert this text into invoice JSON:
"${text}"

Return ONLY JSON with:
items, subtotal, taxTotal, total
`;

  const aiResponse = await callLLM(prompt);

  res.json({
    result: aiResponse,
  });
};

const generateReminderEmail = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const prompt = `
Write a polite payment reminder email for:
"${message}"
`;

  const aiResponse = await callLLM(prompt);

  res.json({
    email: aiResponse,
  });
};

const getDashboardSummary = async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });

  const prompt = `
Summarize this business data:
${JSON.stringify(invoices)}
`;

  const aiResponse = await callLLM(prompt);

  res.json({
    summary: aiResponse,
  });
};

export {
  parseInvoiceFromText,
  generateReminderEmail,
  getDashboardSummary,
};