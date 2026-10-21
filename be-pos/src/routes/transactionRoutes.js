import { Router } from "express";
import { createTransaction, getAllTransaction } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/middleware.js";

const router = Router ();

router.use (verifyToken);
router.post ("/", createTransaction);
router.get ("/", getAllTransaction);

export default router;