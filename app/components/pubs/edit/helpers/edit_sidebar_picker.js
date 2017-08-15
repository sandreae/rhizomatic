import {CollageSidebar} from '../views/collage_sidebar'
import {MarkdownSidebar} from '../views/markdown_sidebar'
import {ScriptSidebar} from '../views/script_sidebar'
import {AudioSidebar} from '../views/audio_sidebar'
import {ImageSidebar} from '../views/image_sidebar'

export default function(pub, type) {

  var editSidebarView

  if (type === 'markdown') {
    editSidebarView = new MarkdownSidebar({
      model: pub
    })
  }
  if (type === 'collage') {
    editSidebarView = new CollageSidebar({
      model: pub
    })
  }
  if (type === 'url') {
    editSidebarView = new ScriptSidebar({
      model: pub
    })
  }
  if (type === 'audio') {
    editSidebarView = new AudioSidebar({
      model: pub
    })
  }
  if (type === 'image') {
    editSidebarView = new ImageSidebar({
      model: pub
    })
  }
  return editSidebarView
}
