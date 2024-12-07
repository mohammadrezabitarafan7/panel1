import sqlite3 from 'better-sqlite3';
const db = new sqlite3('./mydatabase.db');
db.prepare(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT,
    password TEXT,
    username TEXT
  )
`).run();
export async function GET() {
    const users = db.prepare('SELECT * FROM admins').all();
    return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
    });
}
export async function POST(req) {
    const body = await req.json();
    const { phone, password, username } = body;
    const stmt = db.prepare('INSERT INTO admins (phone, password, username) VALUES (?, ?, ?)');
    stmt.run(phone, password, username);
    return new Response(JSON.stringify({ message: 'Admin added successfully' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}