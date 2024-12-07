
import sqlite3 from 'better-sqlite3';

const db = new sqlite3('./mydatabase.db');

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { userIdToEdit, firstName, lastName } = body;

        if (!userIdToEdit || !firstName || !lastName) {
            return new Response(
                JSON.stringify({ message: 'userIdToEdit, firstName, and lastName are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // دستور SQL برای به‌روزرسانی firstName و lastName
        const stmt = db.prepare('UPDATE users SET firstName = ?, lastName = ? WHERE userId = ?');
        const result = stmt.run(firstName, lastName, userIdToEdit);

        if (result.changes === 0) {
            return new Response(
                JSON.stringify({ message: 'No user found with the provided userIdToEdit' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: 'User updated successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'An error occurred' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
