const migrations = [
    `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `,
    `
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_token TEXT NOT NULL UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `,
    `
        CREATE TABLE IF NOT EXISTS account (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            balance REAL NOT NULL,
            bank_code TEXT,
            type TEXT,
            account_number TEXT,
            agency TEXT,
            holder_name TEXT,
            status TEXT,
            user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `,
    `
        ALTER TABLE account ADD COLUMN creation_date DATETIME;
    `
    
];

export default migrations;