const express = require('express');
const app = express();
const suburbsRoute = require('./routes/suburbs');

app.use('/api', suburbsRoute);

app.listen(3001, () =>{
    console.log("Server running on port 3001");
})