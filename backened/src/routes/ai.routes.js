import { Router } from "express";
import {
  parseInvoiceFromText,
  generateReminderEmail,
  getDashboardSummary
} from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { callLLM } from "../utils/llm.js";
const router = Router();
// router.post("/test-qroq", async (req, res) => {
//   try {
//     const result = await callLLM("Say 'qroq AI is working'");
//     res.json({ reply: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post("/parse-invoice", verifyJWT, parseInvoiceFromText);
router.post("/reminder-email", verifyJWT, generateReminderEmail);
router.get("/dashboard-summary", verifyJWT, getDashboardSummary);

export default router;
