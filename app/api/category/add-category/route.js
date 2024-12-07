import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT
    )
`).run();

export async function GET() {
    try {
        const products = db.prepare('SELECT * FROM category').all();
        return new Response(JSON.stringify(products), {
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching products', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, description, status } = body;
        const stmt = db.prepare('INSERT INTO category (title, description, status) VALUES (?,?,?)');
        stmt.run(title, description, status);

        return new Response(JSON.stringify({ message: 'Product added successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error occurred:', error);
        return new Response(JSON.stringify({ message: 'Failed to add product', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


