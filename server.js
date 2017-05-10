var express = require("express");
var path = require("path"); //Utilities for dealing with file paths
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer( { dest: 'public/uploads/' } );

var mongoose = require("mongoose");
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
    drafts: Array,
});

mongoose.model("Pub", PubSchema);

var Pub = mongoose.model("Pub")

var pub = new Pub({
        contributor: "Your Name",
        title: "Your Title",
        type: "script",
        pubDate: "publication date",
        activeContent: "your content",
        drafts: [Draft],
})

pub.save();

var DraftSchema = new Schema({
    type: String,
    content: String,
    pub: String,
});

mongoose.model("Draft", DraftSchema);

var Draft = mongoose.model("Draft")

var draft = new Draft({
        contributor: "",
        title: "",
        pub: "",
})

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

app.post('/api/publications', function (req, res) {
    var postPub = new Pub({
        contributor:req.body.contributor,
        title:req.body.title,
        type:req.body.type,
        drafts:req.body.drafts

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
    return Pub.findById(req.params.id, function(err, pub){
        pub.title = req.body.title;
        pub.contributor = req.body.contributor;
        pub.type = req.body.type;
        pub.activeContent = req.body.activeContent;
        pub.drafts = req.body.drafts;
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

app.post('/api/drafts', function (req, res) {
            
    var newDraft = new Draft({
        type: req.body.type,
        content: req.body.content,
        pub: req.body.pub
    });

    newDraft.save(function (err) {
        if (!err) {
            return console.log('new Draft created');
        } else {
            return console.log(err);
        }
    });
    return res.send(newDraft);
});


app.put('/api/drafts/:id', function (req, res) {
    console.log(req.body)
    return Draft.findById({_id: req.body._id}, function(err, draft) {
        
        draft.type = req.body.type;
        draft.content = req.body.content;
        
        return draft.save(function(err){
            if(!err){
                console.log('Draft updated');
            } else {
                console.log(err);
            }
            return res.send(draft);
        });
    })
});

app.delete('/api/drafts/:id', function(req, res){
    console.log('Deleting draft with id: ' + req.params.id);
    return Draft.findById({_id: req.body._id}, function(err, draft){
        return draft.remove(function(err){
            if(!err){
                console.log('Draft removed');
                return res.send('');
            } else {
                console.log(err);
            }
        });
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


var port = 3000;

app.listen(port);
console.log("serve on" + port);