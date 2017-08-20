var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RhizomeSchema = new Schema({
  rhizomeName: String,
  startedBy: String,
  seedPubId: String
})

module.exports = mongoose.model('Rhizome', RhizomeSchema)
