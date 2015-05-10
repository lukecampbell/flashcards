var EntryTableView = Backbone.View.extend({
  events: {
    'click tr' : 'onSelect'
  },
  initialize: function() {
    var self = this;
    _.bindAll(this, 'onSelect', 'onFilter');
    this.initialRender();
    this.listenTo(this.collection, "reset", function() {
      self.render();
    });
    this.listenTo(this.collection, 'change', function() {
      self.render();
    });
    this.listenTo(app, 'app:filter', this.onFilter);
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
  onFilter: function(e) {
    var value = $(e.target).val();
    if(value === "") {
      return this.render();
    }
    var filteredCollection = this.collection.filter(function(item) {
      if(item.get('title').indexOf(value) >= 0) {
        return true;
      }
      if(item.get('english').indexOf(value) >= 0) {
        return true;
      }
      if(item.get('yomi').indexOf(value) >= 0) {
        return true;
      }
      return false;
    });
    this.$el.html(this.template({collection: new EntryCollection(filteredCollection)}));
    return this;
  },
  template: JST['app/partials/EntryTable.html'],
  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  }
});
