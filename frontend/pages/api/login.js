import mysql from 'mysql2/promise';

export default async function handler(req, res) {

    const { method, body } = req;

    if (method !== 'POST') {
        res.status(400).json({ error: 'Invalid request method' });
        return;
    }

    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tchai'
    });

    try {
        if (body.username == '' || body.username == null)
        {
            res.status(401).json({ error: 'Please Enter a Valid Username!' });
            return;
        }

        const query = "SELECT * FROM account WHERE username = ?";
        const values = [body.username];
        const [data] = await dbconnection.execute(query, values);

        if (data.length > 0) {
            if (data[0].password === body.password) {
                res.status(200).json({ message: 'Successfully logged in!' });
            } else {
                res.status(401).json({ error: 'Invalid Password!' });
            }
        } else {
            const insertQuery = "INSERT INTO account (username, password) VALUES (?, ?)";
            const insertValues = [body.username, body.password];
            await dbconnection.execute(insertQuery, insertValues);

            res.status(200).json({ message: 'Successfully registered!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        dbconnection.end();
    }
}