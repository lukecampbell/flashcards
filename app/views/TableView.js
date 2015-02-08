var TableView = Backbone.View.extend({
  initialize: function() {
    var self = this;
    this.initialRender();
    this.listenTo(this.collection, "reset", function() {
      self.render();
    });
  },
  initialRender: function() {
    this.$el.html();
  },
  template: JST['app/partials/Table.html'],
  render: function() {
    this.$el.html(this.template());
  }
});
