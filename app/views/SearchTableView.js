var SearchTableView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    this.$el.html(this.template({
      collection: this.collection, 
      dictionaries: app.collections.dictionaries
    }));
  },
  template: JST['app/partials/SearchTable.html']
});
