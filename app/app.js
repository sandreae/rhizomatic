import * as Behaviors from './entities/behaviors/behaviors'
import Layout from './theme/layout/layout'
import {gc} from './components/radio'
import Keen from 'keen-tracking';

var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {
    this.Regions = new Layout()

    const client = new Keen({
      projectId: '59be28fec9e77c0001095e78',
      writeKey: 'CDE12502085A8F310E5B23E48195B66A2701E68ED83A68B8B9A9DAF98AD70BD54B91EF6A92CFC9EBE976C55B58F5736BE7EBC661D695C27FF88848DE9B2D13C0A7AB15E595E1A2DCBCAD5D534D3AC72A7E60CBB2353C0278F38F3F8D0486FDD8'
    });
    const helpers = Keen.helpers;
    const utils = Keen.utils;
    
    client.extendEvents(() => {
      return {
        geo: {
          info: { /* Enriched */ },
          ip_address: '${keen.ip}',
        },
        page: {
          info: { /* Enriched */ },
          title: document.title,
          url: document.location.href
        },
        referrer: {
          info: { /* Enriched */ },
          url: document.referrer
        },
        tech: {
          browser: helpers.getBrowserProfile(),
          info: { /* Enriched */ },
          user_agent: '${keen.user_agent}'
        },
        time: helpers.getDatetimeIndex(),
        keen: {
          addons: [
            {
              name: 'keen:ip_to_geo',
              input: {
                ip: 'geo.ip_address'
              },
              output : 'geo.info'
            },
            {
              name: 'keen:ua_parser',
              input: {
                ua_string: 'tech.user_agent'
              },
              output: 'tech.info'
            },
            {
              name: 'keen:url_parser',
              input: {
                url: 'page.url'
              },
              output: 'page.info'
            },
            {
              name: 'keen:referrer_parser',
              input: {
                referrer_url: 'referrer.url',
                page_url: 'page.url'
              },
              output: 'referrer.info'
            }
          ]
        }
      }
    });
    client.recordEvent('pageview', {});
  },

  onStart: function() {
    var self = this
    var initPromise = gc.request('user:init')
    initPromise.then(function(){
      if (Backbone.history) {
        Backbone.history.start()
        if (self.getCurrentRoute() === '') {
          gc.trigger('pubs:list')
        }
      }
    })
    gc.trigger('headers:list')
    gc.trigger('sidebar:show:welcome')
  }
})

var Platform = new App()
window.Platform = Platform
Platform.Behaviors = Behaviors

export {Platform}

