var NavbarView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  template: JST['app/partials/Navbar.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
