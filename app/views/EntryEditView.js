var EntryEditView = Backbone.View.extend({
  bindings: {
    '#entryTitle' : 'title',
    '#yomi' : 'yomi',
    '#english' : 'english'
  },
  events: {
    'submit' : 'onSubmit',
    'click #sidebar-close' : 'onClose'
  },
  initialize: function() {
    var self = this;
    this.$el.html();
    this.listenTo(app, 'app:edit', function(model) {
      self.model = model;
      self.render();
    });
  },
  onClose: function(e) {
    e.preventDefault();
    app.trigger('app:toggleSidebar');
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.model.set('dictionary_id', app.models.dictionary.get('_id'));
    var newModel = this.model.isNew();
    this.model.save();
    if(newModel) {
      console.log("New Model");
      app.collections.entries.add(this.model);
    }
    app.trigger('app:toggleSidebar');
  },
  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.stickit();
  },
  template: JST['app/partials/EntryEdit.html']
});
