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
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// route to notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.route("/api/notes")
app.get(function (req, res) {
    res.json(database);
})

app.post(function (req, res) {
    let jsonPath = path.json(__dirname, './db/db.json');
    let newNote = req.body;
    let highestId = 99;
    for (let i = 0; i < database.length; i++) {
        let oneNote = database[1];
        if (oneNote.id > highestId) {
            highestId = oneNote.id;
        }
    }

    newNote.id = highestId = 1;
    database.push(newNote)
    fs.writeFile(jsonPath, JSON.stringify(database), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Note saved!');
    });

    res.json(newNote);
})



app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Note has been deleted!");
        }
    });
    res.json(database);
});



app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));