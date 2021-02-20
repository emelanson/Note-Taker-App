const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const host = '0.0.0.0';
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

const writeNotesToDb = () => {
    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
}


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"), (err) => {
        if (err) throw err;
    });
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"), (err) => {
        if (err) throw err;
    });
});

app.get("/api/notes", function (req, res) {
    res.json(notes);
});

app.post("/api/notes", function (req, res) {
    newNote = req.body;
    noteID = notes.length + 1;

    newNote.id = noteID;
    notes.push(newNote);

    writeNotesToDb();
    res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
    let delNote = req.params.id;

    notes = notes.filter(note => note.id != delNote);

    writeNotesToDb();
    res.json(notes);
});


app.listen(PORT, host, function () {
    console.log("App listening on PORT " + PORT);
});