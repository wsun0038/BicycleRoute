const express = require('express');
const fs = require('fs');
const app = express();
const router = express.Router();

const {Client} = require('pg')

const sslCert = fs.readFileSync('./ca-certificate.crt').toString(); 
// Replace with the actual path to your CA certificate

const client = new Client({
    host: "db-postgresql-syd1-69145-do-user-17358236-0.g.db.ondigitalocean.com",
    user: "doadmin",
    port: 25060,
    password: "AVNS_ZoaDpgdOo04ZvXmHFE0",
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true, // Set to false if you're not verifying the CA certificate
        ca: sslCert
    },
})

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

router.get('/suburb/:name', async (req, res) => {
    const suburbName = req.params.name;

    try {
        const result = await client.query('SELECT * FROM suburb_accident_count WHERE upper(suburb) = $1', [suburbName]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/suburb_counts', async (req, res) => {
    try {
        const result = await client.query('SELECT suburb, lga_name, postcode_crash, count FROM suburb_accident_count');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;