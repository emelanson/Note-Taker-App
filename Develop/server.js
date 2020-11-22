var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"), (err, data) => {
        if (err) throw err;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"), (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});