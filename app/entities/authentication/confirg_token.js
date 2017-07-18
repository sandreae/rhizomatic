import {Globals} from './globals'

export default $.ajaxSetup({
  statusCode: {
    401: function () {
      console.log('AJAX Handler - 401 Error Received')
    },

    403: function () {
      console.log('AJAX Handler - 403 Error Received')
    }
  },

  beforeSend: function (xhr) {
    var token = window.localStorage.getItem(Globals.auth.TOKEN_KEY)
    xhr.setRequestHeader('x-access-token', token)
  }
})
