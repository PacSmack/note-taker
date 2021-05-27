const express = require('express');
const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"))

app.get("/api/notes", (req, res) => {
    res.send('Hello');
});

















app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});