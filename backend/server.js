const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("../frontend"));

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    console.log("Received Email:", email);
    console.log("Received Password:", password);

    const sql = "SELECT * FROM Users WHERE email = ? AND password = ?";

    db.get(sql, [email, password], (err, row) => {

        console.log("SQL Error:", err);
        console.log("SQL Row:", row);

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (row) {
            return res.json({
                success: true,
                message: "Login Successful!"
            });
        }

        return res.json({
            success: false,
            message: "Invalid Email or Password."
        });

    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});