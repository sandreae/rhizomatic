import * as Entities from './../../../../entities/models/radio'
import {gc} from '../../../radio'

var drafts = new Entities.Pubs.Drafts()
var newDraft = new Entities.Pubs.Draft({
  content: 'draft content'
})
var newPub = new Entities.Pubs.PubModel()



export {drafts, newDraft, newPub}