var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PubSchema = new Schema({
  contributor: String,
  contributorId: String,
  title: String,
  type: String,
  activeContent: Schema.Types.Mixed,
  drafts: Array,
  tags: Array,
  invitedByContrib: String,
  invitedByPubId: String,
  directedAt: Array,
  published: String,
  inRhizome: String
})

module.exports = mongoose.model('Pub', PubSchema)
