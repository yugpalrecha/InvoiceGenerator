// import {Invoice} from "../models/Invoice.js"
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const createInvoice = asyncHandler(async(req, res) => {
//     const user = req.user;
//     const {
//         invoiceNumber,
//         invoiceDate,
//         dueDate,
//         billFrom,
//         billTo,
//         items,
//         notes,
//         paymentTerms
//     } = req.body;

//     // 1️⃣ Basic validation
//     if (!invoiceNumber || !invoiceDate || !billFrom || !billTo || !items?.length) {
//         throw new ApiError(400, "Required invoice fields are missing");
//     }

//     let subtotal = 0;
//     let taxTotal = 0;
    
//     // 2️⃣ Calculate totals for each item AND add to the item object
//     const processedItems = items.map((item) => {
//         const itemTotal = item.unitPrice * item.quantity;
//         const taxPercent = item.taxPercent || 0;
//         const itemTax = (itemTotal * taxPercent) / 100;
        
//         subtotal += itemTotal;
//         taxTotal += itemTax;
        
//         // Return item with calculated total
//         return {
//             ...item,
//             total: itemTotal + itemTax  // ✅ Add total to each item
//         };
//     });

//     // 3️⃣ Final total
//     const total = subtotal + taxTotal;

//     // 4️⃣ Create invoice document
//     const invoice = await Invoice.create({
//         user: user._id,  // ✅ Pass only the user ID, not the entire object
//         invoiceNumber,
//         invoiceDate,
//         dueDate,
//         billFrom,
//         billTo,
//         items: processedItems,  // ✅ Use processed items with totals
//         notes,
//         paymentTerms,
//         subtotal,
//         taxTotal,
//         total
//     });

//     if (!invoice) {
//         throw new ApiError(500, "Invoice creation failed");
//     }

//     // 5️⃣ Send response
//     return res.status(201).json(
//         new ApiResponse(
//             201,
//             invoice,
//             "Invoice created successfully"
//         )
//     );
// });

// const updateInvoice = asyncHandler(async (req, res) => {
//     const {
//         invoiceNumber,
//         invoiceDate,
//         dueDate,
//         billFrom,
//         billTo,
//         items,
//         notes,
//         paymentTerms,
//         status
//     } = req.body;

//     const existingInvoice = await Invoice.findById(req.params.id);
    
//     if (!existingInvoice) {
//         throw new ApiError(404, "Invoice not found");
//     }

//     let subtotal = 0;
//     let taxTotal = 0;

//     if (items && items.length > 0) {
//         const processedItems = items.map((item) => {
//             const itemTotal = item.unitPrice * item.quantity;
//             const taxPercent = item.taxPercent || 0;
//             const itemTax = (itemTotal * taxPercent) / 100;
            
//             subtotal += itemTotal;
//             taxTotal += itemTax;
            
//             return {
//                 ...item,
//                 total: itemTotal + itemTax
//             };
//         });
        
//         const total = subtotal + taxTotal;

//         const updatedInvoice = await Invoice.findByIdAndUpdate(
//             req.params.id,
//             {
//                 invoiceNumber,
//                 invoiceDate,
//                 dueDate,
//                 billFrom,
//                 billTo,
//                 items: processedItems,
//                 notes,
//                 paymentTerms,
//                 status,
//                 subtotal,
//                 taxTotal,
//                 total,
//             },
//             { new: true }
//         );

//         return res.status(200).json(
//             new ApiResponse(
//                 200,
//                 updatedInvoice,
//                 "Invoice updated successfully"
//             )
//         );
//     } else {
//         const updatedInvoice = await Invoice.findByIdAndUpdate(
//             req.params.id,
//             {
//                 invoiceNumber,
//                 invoiceDate,
//                 dueDate,
//                 billFrom,
//                 billTo,
//                 notes,
//                 paymentTerms,
//                 status,
//             },
//             { new: true }
//         );

//         return res.status(200).json(
//             new ApiResponse(
//                 200,
//                 updatedInvoice,
//                 "Invoice updated successfully"
//             )
//         );
//     }
// });

// const getInvoices = asyncHandler(async(req,res) => {
//     const invoices = await Invoice.find().populate("user","name email");
//     res.status(200).json(
//         new ApiResponse(
//             200,
//             invoices,
//             "Invoices fetched successfully"
//         )
//     );
// });

// const getInvoiceById = asyncHandler(async(req,res) => {
//     const invoice = await Invoice.findById(req.params.id).populate("user","name email");
    
//     if (!invoice) {
//         throw new ApiError(404, "Invoice not found");
//     }
    
//     res.status(200).json(
//         new ApiResponse(
//             200,
//             invoice,
//             "Invoice fetched successfully"
//         )
//     );
// });
// const deleteInvoice = asyncHandler(async(req, res) => {
//     const invoice = await Invoice.findById(req.params.id);
    
//     if (!invoice) {
//         throw new ApiError(404, "Invoice not found");
//     }

//     await Invoice.findByIdAndDelete(req.params.id);

//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             null,
//             "Invoice deleted successfully"
//         )
//     );
// });
// export {createInvoice, updateInvoice, getInvoices, getInvoiceById,deleteInvoice}
import { Invoice } from "../models/Invoice.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE INVOICE

const createInvoice = asyncHandler(async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const {
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms
        } = req.body;

        let subtotal = 0;
        let taxTotal = 0;

        const processedItems = (items || []).map((item) => {
            const itemTotal =
                Number(item.unitPrice || 0) *
                Number(item.quantity || 0);

            const taxPercent =
                Number(item.taxPercent || 0);

            const itemTax =
                (itemTotal * taxPercent) / 100;

            subtotal += itemTotal;
            taxTotal += itemTax;

            return {
    name:
        item.name ||
        item.description ||
        item.itemName ||
        "Item",

    quantity:
        Number(item.quantity) || 1,

    unitPrice:
        Number(item.unitPrice) || 0,

    taxPercent:
        Number(item.taxPercent) || 0,

    total:
        itemTotal + itemTax
};
        });

        const total = subtotal + taxTotal;

        const invoice = await Invoice.create({
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items: processedItems,
            notes,
            paymentTerms,
            subtotal,
            taxTotal,
            total
        });

        return res.status(201).json({
            success: true,
            invoice
        });

    } catch (error) {
        console.log("CREATE INVOICE ERROR:", error);

        return res.status(500).json({
            message: error.message,
            error
        });
    }
});

// UPDATE INVOICE
const updateInvoice = asyncHandler(
    async (req, res) => {
        const {
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
            status
        } = req.body;

        const existingInvoice =
            await Invoice.findById(req.params.id);

        if (!existingInvoice) {
            throw new ApiError(
                404,
                "Invoice not found"
            );
        }

        let subtotal = 0;
        let taxTotal = 0;

        let processedItems = [];

        if (items && items.length > 0) {
            processedItems = items.map(
                (item) => {
                    const itemTotal =
                        item.unitPrice *
                        item.quantity;

                    const taxPercent =
                        item.taxPercent || 0;

                    const itemTax =
                        (itemTotal *
                            taxPercent) /
                        100;

                    subtotal += itemTotal;
                    taxTotal += itemTax;

                    return {
                        ...item,
                        total:
                            itemTotal +
                            itemTax
                    };
                }
            );
        }

        const total =
            subtotal + taxTotal;

        const updatedInvoice =
            await Invoice.findByIdAndUpdate(
                req.params.id,
                {
                    invoiceNumber,
                    invoiceDate,
                    dueDate,
                    billFrom,
                    billTo,
                    items:
                        processedItems.length > 0
                            ? processedItems
                            : existingInvoice.items,
                    notes,
                    paymentTerms,
                    status,
                    subtotal:
                        subtotal ||
                        existingInvoice.subtotal,
                    taxTotal:
                        taxTotal ||
                        existingInvoice.taxTotal,
                    total:
                        total ||
                        existingInvoice.total
                },
                { new: true }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedInvoice,
                "Invoice updated successfully"
            )
        );
    }
);

// GET ALL INVOICES
const getInvoices = asyncHandler(
    async (req, res) => {
        const invoices =
            await Invoice.find().populate(
                "user",
                "name email"
            );

        res.status(200).json(
            new ApiResponse(
                200,
                invoices,
                "Invoices fetched successfully"
            )
        );
    }
);

// GET INVOICE BY ID
const getInvoiceById =
    asyncHandler(async (req, res) => {
        const invoice =
            await Invoice.findById(
                req.params.id
            ).populate(
                "user",
                "name email"
            );

        if (!invoice) {
            throw new ApiError(
                404,
                "Invoice not found"
            );
        }

        res.status(200).json(
            new ApiResponse(
                200,
                invoice,
                "Invoice fetched successfully"
            )
        );
    });

// DELETE INVOICE
const deleteInvoice =
    asyncHandler(async (req, res) => {
        const invoice =
            await Invoice.findById(
                req.params.id
            );

        if (!invoice) {
            throw new ApiError(
                404,
                "Invoice not found"
            );
        }

        await Invoice.findByIdAndDelete(
            req.params.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Invoice deleted successfully"
            )
        );
    });

export {
    createInvoice,
    updateInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoice
};