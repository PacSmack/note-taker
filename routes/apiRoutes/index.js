const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');
const fs = require('fs');


router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post("/notes", (req, res) => {
    req.body.id = uuidv4().toString();

    let title = req.body.title;
    let text = req.body.text;
    let id = req.body.id;

    notes.push({ title, text, id });
    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(notes);
});

router.delete('/notes/:id', (req, res) => {    
    const findNotes = notes.findIndex(noteIndex => noteIndex.id === req.params.id);
    notes.splice(findNotes, 1)    

    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });    
    res.json(notes);
});

// router.delete('/api/notes/:id', (req, res) => {
//     let id = req.params.id;

//     for (let i = 0; i < notes.length; i++) {
//         if (notes[i].id === id) {
//             notes.splice(i, 1)
//         }
//     }
//     fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
//     res.json(notes);
// })

module.exports = router;