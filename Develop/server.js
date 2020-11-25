const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var noteDatabase = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

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
    res.json(noteDatabase);
});

app.post("/api/notes", function (req, res) {

    noteDatabase.push(req.body);

    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(noteDatabase), (err) => {
        if (err) console.log(err);
    });
    res.redirect("/notes");
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});