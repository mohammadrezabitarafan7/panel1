import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

export async function POST(req) {
    const body = await req.json();
    const { userIdToDelete } = body;
    db.prepare('DELETE FROM users WHERE userId = ?').run(userIdToDelete)
    return new Response(
        JSON.stringify({ message: 'User deleted successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}

// UPDATE users SET firstname = 'Ali' WHERE userId = 3;
