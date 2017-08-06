var SetView = Mn.Behavior.extend({

  onSetview: function() {
    var editPubContentView
    var type = pub.get('type')
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
})

export {SetView}