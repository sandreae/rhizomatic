var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
// var cors = require('cors')
const path = require('path');

var mongoose = require('mongoose')

var address = process.env.MONGODB_URI  ||  "mongodb://localhost/pubs"

var promise = mongoose.connect(address, {
  useMongoClient: true,
  /* other options */
});

var app = express()

//////JUST FOR DEV////////
// app.use(cors())
//////////////////////////

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/dist'));

/////////////////ROUTES///////////////////////


var rhizomeRoutes = require('./server/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

// var uploadRoutes = require('./server/router/uploads')(app, express)
// app.use('/api', uploadRoutes)

var pubRoutes = require('./server/router/pub')(app, express)
app.use('/api', pubRoutes)

var userRoutes = require('./server/router/user')(app, express)
app.use('/api', userRoutes)

var fs = require("fs"),
    rimraf = require("rimraf"),
    mkdirp = require("mkdirp"),
    multiparty = require('multiparty'),
    
    // paths/constants
    fileInputName = process.env.FILE_INPUT_NAME || "qqfile",
    publicDir = process.env.PUBLIC_DIR,
    nodeModulesDir = process.env.NODE_MODULES_DIR,
    uploadedFilesPath = ("dist/uploads/"),
    chunkDirName = "chunks",
    maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited


// routes
app.post("/uploads", onUpload);
app.delete("/uploads/:uuid", onDeleteFile);


function onUpload(req, res) {
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        var partIndex = fields.qqpartindex;

        // text/plain is required to ensure support for IE9 and older
        res.set("Content-Type", "text/plain");

        if (partIndex == null) {
            onSimpleUpload(fields, files[fileInputName][0], res);
        }
        else {
            onChunkedUpload(fields, files[fileInputName][0], res);
        }
    });
}

function onSimpleUpload(fields, file, res) {
    var uuid = fields.qquuid,
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    if (isValid(file.size)) {
        moveUploadedFile(file, uuid, function() {
        	responseData.url = "uploads/" + uuid + "/" + file.name
        	responseData.file = file
        	responseData.uuid = uuid
                responseData.success = true;
                res.send(responseData);

            },
            function() {
                responseData.error = "Problem copying the file!";
                res.send(responseData);
            });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
}

function onChunkedUpload(fields, file, res) {
    var size = parseInt(fields.qqtotalfilesize),
        uuid = fields.qquuid,
        index = fields.qqpartindex,
        totalParts = parseInt(fields.qqtotalparts),
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    if (isValid(size)) {
        storeChunk(file, uuid, index, totalParts, function() {
            if (index < totalParts - 1) {
                responseData.success = true;
                res.send(responseData);
            }
            else {
                combineChunks(file, uuid, function() {
                        responseData.success = true;
                        res.send(responseData);
                    },
                    function() {
                        responseData.error = "Problem conbining the chunks!";
                        res.send(responseData);
                    });
            }
        },
        function(reset) {
            responseData.error = "Problem storing the chunk!";
            res.send(responseData);
        });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
}

function failWithTooBigFile(responseData, res) {
    responseData.error = "Too big!";
    responseData.preventRetry = true;
    res.send(responseData);
}

function onDeleteFile(req, res) {
    var uuid = req.params.uuid,
        dirToDelete = uploadedFilesPath + uuid;

    rimraf(dirToDelete, function(error) {
        if (error) {
            console.error("Problem deleting file! " + error);
            res.status(500);
        }

        res.send();
    });
}

function isValid(size) {
    return maxFileSize === 0 || size < maxFileSize;
}

function moveFile(destinationDir, sourceFile, destinationFile, success, failure) {
    mkdirp(destinationDir, function(error) {
        var sourceStream, destStream;

        if (error) {
            console.error("Problem creating directory " + destinationDir + ": " + error);
            failure();
        }
        else {
            sourceStream = fs.createReadStream(sourceFile);
            destStream = fs.createWriteStream(destinationFile);

            sourceStream
                .on("error", function(error) {
                    console.error("Problem copying file: " + error.stack);
                    destStream.end();
                    failure();
                })
                .on("end", function(){
                    destStream.end();
                    success();
                })
                .pipe(destStream);
        }
    });
}

function moveUploadedFile(file, uuid, success, failure) {
    var destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;

    moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function storeChunk(file, uuid, index, numChunks, success, failure) {
    var destinationDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        chunkFilename = getChunkFilename(index, numChunks),
        fileDestination = destinationDir + chunkFilename;

    moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function combineChunks(file, uuid, success, failure) {
    var chunksDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;


    fs.readdir(chunksDir, function(err, fileNames) {
        var destFileStream;

        if (err) {
            console.error("Problem listing chunks! " + err);
            failure();
        }
        else {
            fileNames.sort();
            destFileStream = fs.createWriteStream(fileDestination, {flags: "a"});

            appendToStream(destFileStream, chunksDir, fileNames, 0, function() {
                rimraf(chunksDir, function(rimrafError) {
                    if (rimrafError) {
                        console.log("Problem deleting chunks dir! " + rimrafError);
                    }
                });
                success();
            },
            failure);
        }
    });
}

function appendToStream(destStream, srcDir, srcFilesnames, index, success, failure) {
    if (index < srcFilesnames.length) {
        fs.createReadStream(srcDir + srcFilesnames[index])
            .on("end", function() {
                appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
            })
            .on("error", function(error) {
                console.error("Problem appending chunk! " + error);
                destStream.end();
                failure();
            })
            .pipe(destStream, {end: false});
    }
    else {
        destStream.end();
        success();
    }
}

function getChunkFilename(index, count) {
    var digits = new String(count).length,
        zeros = new Array(digits + 1).join("0");

    return (zeros + index).slice(-digits);
}
// ANY ROUTE AFTER THIS NEEDS AUTHENTICATION //

var authenticateRoutes = require('./server/router/authenticate')(app, express)
app.use('/api', authenticateRoutes)

///////////////////////////////////////////////

app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up and running!');
});
