var NavbarView = Backbone.View.extend({
  events: {
    'click button' : 'onSubmit'
  },
  initialize: function() {
    this.render();
  },
  onSubmit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var value = this.$el.find('#search-field').val();
    this.$el.find('form').find('input[type=text]').val('');
    window.location.href = '/search?' + $.param({q: value});
  },
  template: JST['app/partials/Navbar.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
