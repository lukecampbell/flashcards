var DictionaryTableView = Backbone.View.extend({
  events: {
    'click tr' : 'onSelect'
  },
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
  onSelect: function(e) {
    e.stopPropagation();
    var model_id = $(e.target).closest('tr').data('id');
    var model = this.collection.get(model_id);
    if(model) {
      app.trigger('TableView:select');
    }
  },
  template: JST['app/partials/DictionaryTable.html'],
  render: function() {
    this.$el.html(this.template({collection: this.collection}));
  }
});

