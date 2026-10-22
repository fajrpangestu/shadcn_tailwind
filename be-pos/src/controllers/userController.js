import pool from "../config/db.js";

export const getAllUser = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
        return res.status(200).json({
            status: true,
            message: "Fetch user success",
            total: rows.length,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Fail fetch user",
            error: error.message,
        })
    }
}

export const getUserById = async (req, res) => {
try {
    const id = parseInt (req.params.id);
    const [user] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id = ?", [id]);
    if (!user) {
        res.status(404).json({
            status: false,
            message: "User not found",
        });
    } 
    
    res.status(200).json({
        status: true,
        message: "User found",
        data: user,
    });

} catch (error) {
    return res.status(500).json({
            status: false,
            message: "Fail fetch user",
            error: error.message,
    });
    }
}

export const createUser = async (req, res) => {
    const {name, email, password} = req.body;

try {    
    const [user] = await pool.query ("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password])
    return res.status (201).json ({
        status: true,
        message: "Create user success",
        data: {id: user.insertId, name, email}
    });

} catch (error) {
    return res.status(500).json({
        status: false,
        message: "Create user failed",
        error: error.message
    });
    }
};

export const updateUser = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const {name, email, password, is_active} = req.body;
    let update = "";

    if (!password) {
        update = await pool.query ("UPDATE users SET name = ?, email = ?, is_active = ? WHERE id = ?", [name, email, is_active, id]);
    } else {
        update = pool.query ("UPDATE users SET name = ?, email = ?, password = ?, is_active = ? WHERE id = ?", [name, email, password, is_active, id])
    }

    const [data] = await pool.query (`SELECT * FROM user WHERE id = ?`, [id]);

    return res.status(200).json({
        status: true,
        message: "Update user success",
        data: data[0]
    });
    
} catch (error) {
    return res.status(500).json({
        status: false,
        message: "Update user failed",
        error: error.message
    });
}
}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        return res.status(200).json({
            status: true,
            message: "Delete is success",
        }); 
        
    } catch (error) {
        return res.status(500).json({
        status: false,
        message: "Update user failed",
        error: error.message,
    });
    }
}

    // const userIndex = USERS.findIndex((u) => u.id === id);

    // if (userIndex === -1) {
    //     return res.status(404).json({
    //         status: false,
    //         message: "User not found",
    //     });
    // }

//     const deletedUser = USERS.splice (userIndex, 1)[0];
//     return res.status (200).json ({
//         status: true,
//         message: "Delete user success",
//     });
// }