import sqlite3 from 'better-sqlite3';

// اتصال به دیتابیس
const db = new sqlite3('./mydatabase.db');

// ایجاد جدول اگر وجود نداشته باشد
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    email TEXT,
    password TEXT,
    username TEXT,
    phone TEXT,
    city TEXT,
    address TEXT,
    number TEXT
  )
`).run();

export async function GET() {
    try {
        const users = db.prepare('SELECT * FROM users').all();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching users', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstname, lastname, email, password, username, phone, city, address, number } = body;

        if (!firstname || !lastname || !email || !password || !username) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const stmt = db.prepare('INSERT INTO users (firstname, lastname, email, password, username, phone, city, address, number) VALUES (?,?,?,?,?,?,?,?,?)');
        stmt.run(firstname, lastname, email, password, username, phone, city, address, number);

        return new Response(
            JSON.stringify({ message: 'User added successfully' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Error adding user:", error);
        return new Response(
            JSON.stringify({ message: 'Failed to add user', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
