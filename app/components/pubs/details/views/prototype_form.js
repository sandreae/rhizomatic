var accounts = ['account1', 'account2', 'acocunt3', 'account4'];
var Form = Backbone.Form.extend({
    schema: {
        contributor: { type: 'Text', validators: ['required']},
        title: { type: 'Text', validators: ['required']},
        pubDate: 'TextArea',
        type: { type: 'Select', options: 'accounts'}
    }, submitButton: 'Submit'
})

var MarionetteFormView = Marionette.View.extend({
  events: {
    'submit': 'validate',
    'error': 'blur'
  },
  
  initialize: function(){
    this.form = Marionette.getOption(this,'form');
    this.listenTo(this.form, 'name:blur email:blur', this.blur);
  },
  render: function(){
    this.form = Marionette.getOption(this,'form');
    this.form.render();
    this.$el.html(this.form.render().el)
    return this;
  },
 
  validate: function(){
    this.form = Marionette.getOption(this,'form');
    var errs = this.form.validate();
    if (errs) event.preventDefault
  }, 
  blur: function(){
  }
});
