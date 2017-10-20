import {CollageSidebar} from '../views/collage_sidebar'
import {MarkdownSidebar} from '../views/markdown_sidebar'
import {ScriptSidebar} from '../views/script_sidebar'
import {AudioSidebar} from '../views/audio_sidebar'
import {ImageSidebar} from '../views/image_sidebar'
import {VideoSidebar} from '../views/video_sidebar'
import {CodeSidebar} from '../views/code_sidebar'

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
  if (type === 'video') {
    editSidebarView = new VideoSidebar({
      model: pub
    })
  }
  if (type === 'code') {
    editSidebarView = new CodeSidebar({
      model: pub
    })
  }
  return editSidebarView
}
