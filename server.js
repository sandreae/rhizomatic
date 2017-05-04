var express = require("express");
var path = require("path"); //Utilities for dealing with file paths
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer( { dest: 'public/uploads/' } );


mongoose.connect("mongodb://localhost/pubs");

var Schema = mongoose.Schema;

var PubSchema = new Schema({
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
        contributor: "",
        title: "",
        type: "",
        pubDate: "",
        contentWysiwyg: "",
        contentImage: "",
        contentScript: "",   
        activeContent: "",
})

pub.save();

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//ROUTES

app.get("/api/publications", function(req, res) {
    Pub.find(function(err, docs) {
        docs.forEach(function(item) {
            console.log("Received a GET request for _id: " + item._id)
        })
        res.send(docs);
    })
});

app.get('/api/publications/:id', function(req, res){
    return Pub.findById(req.params.id, function(err, pub){
        if(!err){
            return res.send(pub);
        } else {
            return console.log(err);
        }
    });
});

app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {

  if ( !req.file.mimetype.startsWith( 'image/' ) ) {
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

  return res.status( 200 ).send( req.file );
});



app.post('/api/publications', function (req, res) {
    var postPub = new Pub({
        contributor:req.body.contributor,
        title:req.body.title,
        type:req.body.type,

    });
    postPub.save(function (err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(postPub);
});

app.put('/api/publications/:id', function(req, res){
    console.log('Updating pub ' + req.body.title);
    return Pub.findById(req.params.id, function(err, pub){
        pub.title = req.body.title;
        pub.contributor = req.body.contributor;
        pub.type = req.body.type;
        pub.contentScript = req.body.contentScript;
        pub.contentWysiwyg = req.body.contentWysiwyg;
        pub.contentImage = req.body.imageContent;
        pub.activeContent = req.body.activeContent;
        return pub.save(function(err){
            if(!err){
                console.log('pub updated');
            } else {
                console.log(err);
            }
            return res.send(pub);
        });
    });
});

app.delete('/api/publications/:id', function(req, res){
    console.log('Deleting pub with id: ' + req.params.id);
    return Pub.findById(req.params.id, function(err, pub){
        return pub.remove(function(err){
            if(!err){
                console.log('Pub removed');
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

var port = 3000;

app.listen(port);
console.log("serve on" + port);