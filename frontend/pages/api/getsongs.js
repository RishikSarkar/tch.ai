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
        const idquery = "SELECT id FROM account WHERE username = ?";
        const id = [body.username];
        const [data] = await dbconnection.execute(idquery, id);

        if (data.length > 0) {
            const songquery = "SELECT trackname, trackartists FROM songlist WHERE uid = ?";
            const uid = data[0];
            const [songList] = await dbconnection.execute(songquery, uid);
            
            res.status(200).json({ songs: songList });
            
        } else {
            res.status(401).json({ error: 'Please Login or Register!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        dbconnection.end();
    }
}