export default function(pubModel, data, newType, type, isPublished, Controller, gc) { 
  pubModel.save(data, {
    success: function() {
      if (newType === type) {
        gc.trigger('user:home')
        gc.trigger('pubs:list')
        gc.trigger('sidebar:close')
      if (isPublished === true) {Controller.publish(pubModel)}
      } else {
        gc.trigger('pub:content:edit', pubModel.get('_id'))
      }
    }
  })
}
