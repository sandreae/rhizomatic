var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/platform");

var Schema = mongoose.Schema;

var PubSchema = new Schema ({
	id: Number,
    contributor: String,
    title: String,
    type: String,
    pubDate: String,
    contentWysiwyg: String,
    contentImage: String,
    contentScript: String,      
    activeContent: String,
});

mongoose.model("Pub", PubSchema);

var Pub = mongoose.model("Pub")

var pub = new Pub({
	id: 1,
    contributor: "Jane Doe",
    title: "Blog about something",
    type: "blog",
    pubDate: "",
    contentWysiwyg: "",
    contentImage: "",
    contentScript: "",      
    activeContent: "no content",      
});

pub.save();

var app = express();

app.use(express.static(__dirname + "/public"));

//ROUTES

app.get("/api/pubs", function(req, res) {
	Pub.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log("Recieved a GET request for pubs");
		})
		res.send(docs);

	})
})

var port = 3000;

app.listen(port);
console.log("serve on" + port);