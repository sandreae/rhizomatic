var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var PubSchema = new Schema({
    contributor: String,
    contributorId: String,
    title: String,
    type: String,
    pubDate: String,
    activeContent: String,
    drafts: Array,
});

module.exports = mongoose.model('Pub', PubSchema);