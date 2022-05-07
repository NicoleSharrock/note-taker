const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

const express = require('express')
const app = express();

const noteData = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// route to save all notes as json
app.get('/api/notes', (req, res) => {
    res.json(noteData.slice(1));
});


// route to main page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// route to notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, noteData);
    res.json(newNote);
});


app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// function deleteNote(id, notesArray) {
//     for (let i = 0; i < notesArray.length; i++) {
//         let note = notesArray[i];

//         if (note.id == id) {
//             notesArray.splice(i, 1);
//             fs.writeFileSync(
//                 path.join(__dirname, './db/db.json'),
//                 JSON.stringify(notesArray, null, 2)
//             );

//             break;
//         }
//     }
// }

// app.delete('/api/notes/:id', (req, res) => {
//     deleteNote(req.params.id, noteData);
//     res.json(true);
// });


app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));