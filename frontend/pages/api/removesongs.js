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
            const containsquery = "SELECT * FROM songlist WHERE uid = ? AND trackname = ? AND trackartists = ?";
            const song = [data[0].id, body.trackname, body.trackartists];
            const [songexists] = await dbconnection.execute(containsquery, song);

            if (songexists.length > 0) {
                const songquery = "DELETE FROM songlist WHERE uid = ? AND trackname = ? AND trackartists = ?";
                const song = [data[0].id, body.trackname, body.trackartists];
                await dbconnection.execute(songquery, song);
                res.status(200).json({ message: 'Song successfully removed!' });
            }
            else {
                res.status(401).json({ error: 'Song Is Not In Playlist!' });
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