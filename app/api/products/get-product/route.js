import sqlite3 from 'better-sqlite3';
const db = new sqlite3('./mydatabase.db');
export async function GET() {
    try {
        const products = db.prepare('SELECT * FROM products').all();
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