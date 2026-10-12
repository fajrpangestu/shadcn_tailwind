import { Router } from "express";
import { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router ();

router.get ("/", getAllProducts);
router.get ("/:id", getOneProduct);
router.post ("/", createProduct);
router.put ("/:id", updateProduct);
router.delete ("/:id", deleteProduct);

export default router;