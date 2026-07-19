const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database location
const dbPath = path.join(__dirname, "users.db");
console.log("Database path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");

        db.serialize(() => {

            // Delete old Users table (if it exists)
            db.run(`DROP TABLE IF EXISTS Users`);

            // Create new Users table
            db.run(`
                CREATE TABLE Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )
            `);

            // Insert default user
            db.run(
                `INSERT INTO Users (email, password)
                 VALUES (?, ?)`,
                ["admin@gmail.com", "admin123"],
                (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("Default user created.");
                    }
                }
            );

            // Show table structure
            db.all("PRAGMA table_info(Users)", (err, rows) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("Users table structure:");
                    console.table(rows);
                }
            });

        });
    }
});

module.exports = db;