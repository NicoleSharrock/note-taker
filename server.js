const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express();
// const allNotes = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});


app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});




app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));