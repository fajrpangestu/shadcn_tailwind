import pool from "../config/db.js";
import { snap } from "../config/midtrans.js";

export const createTransaction = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const {order_number, user_id, payment_method, subtotal, tax, total, items} = req.body;
        const [transaction] = await pool.query ("INSERT INTO orders (order_number, user_id, payment_method, subtotal, tax, total) VALUES (?,?,?,?,?,?)", [order_number, user_id, payment_method, subtotal, tax, total]);
        
        const orderId = transaction.insertId;
        if  (items) {
            for (let item of items) {
                await pool.query ("INSERT INTO order_details (order_id, product_id, qty, price) VALUES (?,?,?,?)", [orderId, item.product_id, item.qty, item.price]);        
            }
        }

        let midtransResponse = null;

        if (payment_method === 1) {
            const parameter = {
                transaction_details: {
                    order_id: order_number,
                    gross_amount: total,
                },
                enable_payments: ['gopay'],
                item_details: items.map (item => ({
                    id: item.product_id,
                    price: item.price,
                    quantity: item.qty,
                    name: `Product ID ${item.product_id}`,
                })),
            };
            midtransResponse = await snap.createTransaction(parameter);
        }
        await connection.commit();
        connection.release();
        return res.status (201).json ({
            status: true,
            message: Number(payment_method) === 1 ? "Order success silahkan bayar dengan gopay" : "Payment cash success",
            order_id: orderId,
            order_number: order_number,
            payment_gateway: midtransResponse
            ? {
                token: midtransResponse.token,
                redirect_url: midtransResponse.redirect_url,
            }
            : null,
        });
    
    } catch (error) {
        return res.status(500).json ({
            status: false,
            message: error.message});
    }
};

export const getAllTransaction = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT
        orders.id,
        orders.order_number,
        orders.payment_method,
        order_details.product_id,
        products.name
        FROM orders
        LEFT JOIN order_details ON orders.id = order_details.order_id
        LEFT JOIN products ON order_details.product_id = products.id ORDER BY orders.id DESC`);


    const orderMap = {};
    rows.forEach((row) => {
      if (!orderMap[row.id]) {
        orderMap[row.id] = {
          id: row.id,
          order_number: row.order_number,
          payment_method: row.payment_method,
          items: [],
        };
      }
      if (row.product_id) {
        orderMap[row.id].items.push({
          product_id: row.product_id,
          name: row.name,
        });
      }
    });
    const orders = Object.values(orderMap);
    return res.status(200).json({
      status: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};