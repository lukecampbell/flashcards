var TableView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  template: JST['app/partials/Table.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
