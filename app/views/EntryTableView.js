var EntryTableView = Backbone.View.extend({
  events: {
    'click tr' : 'onSelect'
  },
  initialize: function() {
    var self = this;
    this.initialRender();
    this.listenTo(this.collection, "reset", function() {
      self.render();
    });
    this.listenTo(this.collection, 'change', function() {
      self.render();
    });
  },
  initialRender: function() {
    this.$el.html();
  },
  onSelect: function(e) {
    e.stopPropagation();
    var model_id = $(e.target).closest('tr').data('id');
    var model = this.collection.get(model_id);
    app.trigger('app:edit', model);
  },
  template: JST['app/partials/EntryTable.html'],
  render: function() {
    console.log('render');
    this.$el.html(this.template({collection: this.collection}));
  }
});
