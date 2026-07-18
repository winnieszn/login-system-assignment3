const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

// Allow Express to read JSON data
app.use(express.json());

// Allow your frontend to access the backend
app.use(express.static("../frontend"));

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM Users WHERE username = ? AND password = ?";

    db.get(sql, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (row) {
            res.json({
                success: true,
                message: "Login Successful!"
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Username or Password."
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});