const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors')

const app = express();


const port = 3000;

// MySQL kapcsolat
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tortakadatb'
});

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Hello World végpont
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Lekérés
app.get('/tipus', async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM tipus`);

        if (result.length === 0) {
            return res.status(400).json({
                error: 'Nem található'
            });
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            error: 'Adatbázis hiba',
            err
        });
    }
});



// Lekérés
app.get('/torta', async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM torta inner join tipus 
            on torta_tipus_id=tipus.tipus_id `);

        if (result.length === 0) {
            return res.status(400).json({
                error: 'Nem található'
            });
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            error: 'Adatbázis hiba',
            err
        });
    }
});

// Lekérés
app.post('/olcsoTorta', async (req, res) => {
    const {minAr,maxAr}=req.body;
    try {
        const [result] = await pool.query(`
            SELECT * 
            FROM torta 
            inner join tipus 
            on torta_tipus_id=tipus.tipus_id 
            WHERE torta.torta_szelet_ar >= ? and torta.torta_szelet_ar <=?;`,[minAr,maxAr]);

        if (result.length === 0) {
            return res.status(400).json({
                error: 'Nem található'
            });
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            error: 'Adatbázis hiba',
            err
        });
    }
});

app.post('/torta/:id', async (req, res) => {
    const {id}=req.params;
    try {
        const [result] = await pool.query(`
            SELECT * 
            FROM torta 
            inner join tipus 
            on torta_tipus_id=tipus.tipus_id 
            WHERE torta_id=?`,[id]);

        if (result.length === 0) {
            return res.status(400).json({
                error: 'Nem található'
            });
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            error: 'Adatbázis hiba',
            err
        });
    }
});

// Szerver indítása
app.listen(port, () => {
    console.log(`Szerver fut: http://localhost:${port}`);
});