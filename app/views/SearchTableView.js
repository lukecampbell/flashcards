var SearchTableView = Backbone.View.extend({
  events: {
    'click tr' : 'onClick'
  },
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },
  onClick: function(e) {
    e.stopPropagation();
    var model_id = $(e.target).closest('tr').data('id');
    var model = this.collection.get(model_id);
    var dictionary = app.collections.dictionaries.get(model.get('dictionary_id'));
    window.location.href = '/entries/' + dictionary.get('name');
  },
  render: function() {
    this.$el.html(this.template({
      collection: this.collection, 
      dictionaries: app.collections.dictionaries
    }));
  },
  template: JST['app/partials/SearchTable.html']
});
