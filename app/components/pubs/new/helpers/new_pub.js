import * as Entities from './../../../../entities/models/radio'
import {gc} from '../../../radio'

var drafts = new Entities.Pubs.Drafts()
var newDraft = new Entities.Pubs.Draft({
  content: 'draft content'
})
var newPub = new Entities.Pubs.PubModel()

var user = gc.request('user:get')

export {drafts, newDraft, newPub, user}