import mysql from 'mysql2';

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "0310",
    database: "users"
}).promise();

export async function getPassword(params) {
    const [rows] = await db.query('SELECT Pword FROM login WHERE username = ?', [params]);
    return rows[0];
}
export async function insertUser(username, password) {
    await db.query('INSERT INTO login (username, Pword) VALUES (?, ?)', [username, password]);
}

export {db}

