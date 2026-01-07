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
        CREATE TABLE IF NOT EXISTS accounts (
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
            hex_color TEXT NOT NULL,
            icon_name TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            expense_favorite INTEGER,
            income_favorite INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `,
    `
        CREATE TABLE IF NOT EXISTS duplicates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,   
            issue_date DATETIME NOT NULL,
            due_date DATETIME NOT NULL,
            total_value INTEGER NOT NULL,
            description TEXT NOT NULL,
            account_id INTEGER,
            category_id INTEGER,
            movement_type TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            number_installments INTEGER NOT NULL,
            duplicate_father_id INTEGER,
            notification_id TEXT,
        FOREIGN KEY (account_id) REFERENCES accounts(id) 
        FOREIGN KEY (category_id) REFERENCES categories(id)
        FOREIGN KEY (user_id) REFERENCES users(id)
        FOREIGN KEY (duplicate_father_id) REFERENCES duplicates(id)
    );    
    `,
    `
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            value INTEGER NOT NULL,
            payment_date DATETIME NOT NULL,
            account_id INTEGER,
            destination_account_id INTERGER,
            category_id INTEGER,
            duplicate_id INTEGER,
            movement_type TEXT NOT NULL,
            transaction_father_id INTEGER,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (destination_account_id) REFERENCES accounts(id),
            FOREIGN KEY (category_id) REFERENCES categories(id),
            FOREIGN KEY (duplicate_id) REFERENCES duplicates(id)
    );
    `,
    `
        CREATE TABLE IF NOT EXISTS parameters (
            user_id INTEGER PRIMARY KEY,
            enable_transaction_notify INTEGER NOT NULL DEFAULT 1,
            enable_duplicate_notify INTEGER NOT NULL DEFAULT 1,
            enable_show_balance INTEGER NOT NULL DEFAULT 1,
            duplicate_notification_time TEXT DEFAULT '08:00',
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `
];

export default migrations;