import express, { json, query } from 'express';
import cors from 'cors';
import {db, getPassword } from './database.js';

const app = express();
app.use(cors());
app.use(json());


app.get('/', async (req, res) =>{
    const [row] = await db.query('select Pword from login');
    res.json(row[0]=="0000"? "Yes" : "22");
})
app.get('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const storedPassword = await getPassword(username);

        if (storedPassword == password) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/signin', async (req, res) =>{

})

app.listen(8081, () => {
    console.log("Listening....");
});
