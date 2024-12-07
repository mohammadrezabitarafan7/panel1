import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price TEXT,
    count TEXT,
    discount TEXT,
    status TEXT,
    category TEXT,
    amazing TEXT,
    image TEXT
  )
`).run();

export async function GET() {
    try {
        const products = db.prepare('SELECT * FROM products').all();
        return new Response(JSON.stringify(products), {
        });
    } catch (error) {
        console.error("Error fetching products:", error); // لاگ خطا
        return new Response(
            JSON.stringify({ message: 'Error fetching products', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, price, count, discount, status, category, amazing, image } = body;
        
        if (!title || !price || !count || !category) {
            throw new Error("Missing required fields");
        }

        const stmt = db.prepare('INSERT INTO products (title, price, count, discount, status, category, amazing, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(title, price, count, discount, status, category, amazing, image);

        return new Response(JSON.stringify({ message: 'Product added successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error occurred:', error);  // لاگ خطا در کنسول
        return new Response(JSON.stringify({ message: 'Failed to add product', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


