export default function(newPub, newDraft, drafts, userID, pubsCollection, data, gc) {
  newPub.save(data, {
    success: function (pub, response) {
      newDraft.set({
        type: data.type,
        pub: pub.id
      })
      drafts.add(newDraft)
      newPub.set({
        contributorId: userID,
        drafts: drafts})
      pubsCollection.add(newPub)
      newPub.save(null, {
        success: function () {
          console.log(newPub)
          gc.trigger('sidebar:close')
          gc.trigger('pub:content:edit', pub.id)
        }
      })
    },
  })
}

