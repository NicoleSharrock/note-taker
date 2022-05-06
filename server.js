const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express();
const noteData = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// route to main page
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// route to notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// route to save all notes as json
app.get('/api/notes', (req, res) => {
    res.json(noteData.slice(1));
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
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));