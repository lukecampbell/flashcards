var NavbarView = Backbone.View.extend({
  add: function(subview) {
    this.subviews.push(subview);
    this.$el.find('#navbar-collapse').append(subview.el);
  },
  initialize: function() {
    this.subviews = [];
    this.render();
  },
  template: JST['app/partials/Navbar.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
