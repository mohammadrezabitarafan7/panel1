import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');
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