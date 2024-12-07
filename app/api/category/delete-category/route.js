import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

export async function POST(req) {
    const body = await req.json();
    const { categoryToDelete } = body;
    db.prepare('DELETE FROM category WHERE id = ?').run(categoryToDelete);
    return new Response(JSON.stringify({ message: 'products deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
