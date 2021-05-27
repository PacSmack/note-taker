const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./db/db.json');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();

    let title = req.body.title;
    let text = req.body.text;
    notes.push({ title: title, text: text });
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.log(err);
        }        
    });    
    console.log(req.body);
    res.send(200);
})

















app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});