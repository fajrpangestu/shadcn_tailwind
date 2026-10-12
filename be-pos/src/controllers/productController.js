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
        if (isNaN (id)) {
            return res.status (400).json ({status: false, message: "Not a number"});
        }
        const [product] = await pool.query ("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = ?", [id]);
        if (product.length === 0) {
           return res.status (404).json ({status: false, message: "There's no data"});
       }
        return res.status (400).json ({status: false, total: product.length, data: product,});
    } catch (error) {
        return res.status (500).json ({status: false, message: error.message,});
    }
}

// create
export const createProduct = async (req, res) => {
    try {
        const {category_id, name, price, stock, description} = req.body;
        await pool.query ("INSERT INTO products (category_id, name, price, stock, description) VALUES (?,?,?,?,?)", [category_id, name, price, stock, description]);
        return res.status (201).json ({status: true, message: "Create is success",});
        
    } catch (error) {
        return res.status (500).json ({status: false, message: error.message,});
    }
}

// update
export const updateProduct = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        const {category_id, name, price, stock, description} = req.body;
        await pool.query ("UPDATE products SET category_id = ?, name = ?, price = ?, stock = ?, description = ? WHERE id = ?", [category_id, name, price, stock, description, id]);
        return res.status (200).json ({status: true, message: "Update is success",});
    
    } catch (error) {
        return res.status (500).json ({status: false, message: error.message,})
    }
}

// delete
export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt (req.params.id);
        await pool.query ("DELETE FROM products WHERE id = ?", [id]);
        return res.status (200).json ({status: true, message: "Delete is success",});

    } catch (error) {
        return res.status (500).json ({status: false, message: error.message,});
    }
}
