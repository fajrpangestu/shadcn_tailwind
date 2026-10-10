import pool from "../config/db.js";

// get all
export const getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.query ("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id");
        return res.status (200).json ({status: true, total: products.length, data: products,});

    } catch (error) {
        return res.status (500).json ({status: false, message: error.message,});
    }
}

// get one data
export const getOneProduct = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        const [product] = await pool.query ("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE id = ?", [id]);
        return res.status (400).json ({status: false, total: product.length, data: product,});
      
    } catch (error) {
        return req.status (500).json ({status: false, message: error.message,});
    }
}
// create
// update
// delete