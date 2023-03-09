
const notesRouter = require("express").Router();
const fs = require('fs/promises');
const uuid = require('../helpers/uuid');


//

let readNotes = async () => {
    return fs.readFile("./db/db.json", (err, data) => data);
  };
  
  notesRouter.get("/notes", async (req, res) => {
    let notes = await readNotes();
    notes = JSON.parse(notes);
   
    res.json(notes);
  });
  
  notesRouter.post("/notes", async (req, res) => {
    
    let notes = await readNotes();
   
    notes = JSON.parse(notes);
     console.log(notes)
  
    let newNote = {
      ...req.body,
      id: uuid()
    };
    notes.push(newNote);
    await writeNotes(notes);
    res.json(notes);
  });
  
  notesRouter.delete("/notes/:id", async (req, res) => {
    
    let notes = await readNotes();
    notes = JSON.parse(notes);
    let newNotes = notes.filter((note) => note.id !== req.params.id);
    await writeNotes(newNotes);
    res.json(notes);
  });
  
  async function writeNotes(notes) {
    //
    fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      return true;
    });
    //
  }
  
  module.exports = notesRouter;