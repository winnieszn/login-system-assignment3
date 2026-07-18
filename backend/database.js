const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )
            `);

            db.run(
                `INSERT OR IGNORE INTO Users (username, password)
                 VALUES (?, ?)`,
                ["admin", "admin123"]
            );
        });
    }
});

module.exports = db;