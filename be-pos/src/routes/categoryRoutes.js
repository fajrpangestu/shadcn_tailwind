import { Router } from "express";
import { createCategory, getAllCategories, getOneCategory, updateCategory, deleteCategory} from "../controllers/CategoryController.js";

const router = Router ();

router.get ("/", getAllCategories);
router.get ("/:id", getOneCategory);
router.post ("/", createCategory);
router.put ("/:id", updateCategory);
router.delete ("/:id", deleteCategory);

export default router;