import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');
export async function POST(req) {
  const body = await req.json();
  const { phone } = body;
  try {
    const user = db.prepare('SELECT * FROM admins WHERE phone = ?').get(phone);
    if (user) {
      return new Response(JSON.stringify(user), {
        status: 200
         });
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid phone' }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An error occurred while logging in' }),
      {
        status: 500,
      }
    );
  }
}
