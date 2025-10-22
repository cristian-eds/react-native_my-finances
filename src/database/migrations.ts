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
            creation_date DATETIME,
            user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `,
    `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            movement_type TEXT NOT NULL,
            hex_color TEXT NOT NULL,
            icon_name TEXT NOT NULL,
            user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `,
    `
        CREATE TABLE IF NOT EXISTS duplicate (
            id INTEGER PRIMARY KEY AUTOINCREMENT,   
            issued_date DATETIME NOT NULL,
            due_date DATETIME NOT NULL,
            total_value INTEGER NOT NULL,
            description TEXT,
            account_id INTEGER NOT NULL,
            category_id INTEGER,
            movement_type TEXT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES account(id) 
        FOREIGN KEY (category_id) REFERENCES category(id)
    );    
    `,
    `
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            value INTEGER NOT NULL,
            payment_date DATETIME NOT NULL,
            account_id INTEGER NOT NULL,
            destination_account_id INTERGER,
            category_id INTEGER,
            duplicate_id INTEGER,
            movement_type TEXT NOT NULL,
            transaction_father_id INTEGER,
            FOREIGN KEY (account_id) REFERENCES account(id),
            FOREIGN KEY (destination_account_id) REFERENCES account(id),
            FOREIGN KEY (category_id) REFERENCES category(id),
            FOREIGN KEY (duplicate_id) REFERENCES duplicate(id),
            FOREIGN KEY (transaction_father_id) REFERENCES transactions(id)
    );
    `,
];

export default migrations;