

const fs = require('fs');
const uuid = require('../helpers/uuid');


module.exports = app => {
    let notes;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        console.log(notes)
    });

    app.get('/api/note', (req, res) => {
        res.json(notes)
    });

    app.post('/api/notes', (req, res) => {
        let newNote = {
            ...req.body,
            id: uuid(),
            
        }
        console.log(newNote);
        notes.push(newNote);
        writeNotes();
        res.json(notes)
    });

    function writeNotes() {
        fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', err => {
            if (err) throw err;
            return true;
        });
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            writeNotes();
            res.json(notes)
        });
}}