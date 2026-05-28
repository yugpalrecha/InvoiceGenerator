import { Router } from "express";
import {
    createInvoice,
    updateInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoice
} from "../controllers/invoice.controller.js";

const router = Router();

router.route("/create").post(createInvoice);
router.route("/").get(getInvoices);
router.route("/:id").get(getInvoiceById);
router.route("/:id").put(updateInvoice);
router.route("/:id").delete(deleteInvoice);

export default router;