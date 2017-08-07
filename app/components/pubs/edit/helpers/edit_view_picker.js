import {Markdown} from '../views/markdown_view'
import {Collage} from '../views/collage_view'
import {Script} from '../views/script_view'
import {Audio} from '../views/audio_view'
import {Image} from '../views/image_view'

export default function(pub, type) {

  var editPubContentView

  if (type === 'markdown') {
    editPubContentView = new Markdown({
      model: pub
    })
  }
  if (type === 'collage') {
    editPubContentView = new Collage({
      model: pub
    })
  }
  if (type === 'script') {
    editPubContentView = new Script({
      model: pub
    })
  }
  if (type === 'audio') {
    editPubContentView = new Audio({
      model: pub
    })
  }
  if (type === 'image') {
    editPubContentView = new Image({
      model: pub
    })
  }
  return editPubContentView
}
