const express = require('express');
const fs = require('fs');
const app = express();

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

client.query(`Select * from suburb_accident_count`, (err, res) =>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})

app.listen(3001, () =>{
    console.log("Server running on port 3001");
})