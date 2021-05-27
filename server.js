const express = require('express');
const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"))

app.get("/", (req, res) => {
    
})

















app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});