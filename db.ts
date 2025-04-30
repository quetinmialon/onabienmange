import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('app.db');

const createTables = () => {
    //create tables
    try {
        db.execAsync(
            `CREATE TABLE IF NOT EXISTS history (
                product_code TEXT PRIMARY KEY NOT NULL UNIQUE,
                created_at INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS products (
                barcode TEXT PRIMARY KEY NOT NULL UNIQUE,
                name TEXT,
                brand TEXT,
                nutriscore TEXT
            );
            FOREIGN KEY (product_code) REFERENCES products(barcode)`
        );
        console.log('on mount tables created');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}
createTables();
