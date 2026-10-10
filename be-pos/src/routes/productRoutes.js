import { Router } from "express";
import { getAllProducts, getOneProduct } from "../controllers/productController.js";

const router = Router ();

router.get ("/", getAllProducts);
router.get ("/:id", getOneProduct);

export default router;