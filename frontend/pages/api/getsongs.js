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
        if (body.user == '' || body.user == null)
        {
            res.status(401).json({ error: 'Please Login or Register!' });
            return;
        }

        const idquery = "SELECT id FROM account WHERE username = ?";
        const user = [body.user];
        const [data] = await dbconnection.execute(idquery, user);

        if (data.length > 0) {
            const songquery = "SELECT trackname, trackartists FROM songlist WHERE uid = ?";
            const songs = [data[0].id];
            const [songList] = await dbconnection.execute(songquery, songs);

            if (songList.length > 0) {
                res.json({ songs: songList });
            }
            else {
                res.status(401).json({ error: 'No Songs Added Yet!' });
            }
        }
        else {
            res.status(401).json({ error: 'Please Login or Register!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        dbconnection.end();
    }
}