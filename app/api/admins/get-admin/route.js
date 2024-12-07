import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

export async function GET(req) {
    // گرفتن id از URL
    const url = new URL(req.url);
    const id = url.searchParams.get('id');


    try {
        const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(id);
          return new Response(JSON.stringify(admin), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
