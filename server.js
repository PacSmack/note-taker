const express = require('express');
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db.json');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

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
    req.body.id = uuidv4().toString();

    let title = req.body.title;
    let text = req.body.text;
    let id = req.body.id;

    notes.push({ title, text, id });
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(notes);
});

// app.delete('/api/notes/:id', (req, res) => {    
//     const findNotes = notes.findIndex(noteIndex => noteIndex.id === req.params.id);
//     notes.splice(findNotes, 1)    

//     fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });    
//     res.json(notes);
// });

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1)
        }
    }
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(notes);
})





















app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});