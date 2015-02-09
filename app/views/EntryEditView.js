var EntryEditView = Backbone.View.extend({
  bindings: {
    '#entryTitle' : 'title',
    '#yomi' : 'yomi',
    '#english' : 'english'
  },
  events: {
    'submit' : 'onSubmit',
    'click #sidebar-close' : 'onClose',
    'click #new-example' : 'onNewExample'
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
  onNewExample: function(e) {
    e.preventDefault();
    var currentExampleSet = this.model.get('examples');
    currentExampleSet.push([
      "日本語",
      "English"
    ]);
    this.model.set('examples', currentExampleSet);
    this.render();
  },
  onSubmit: function(e) {
    var self = this;
    e.preventDefault();
    this.model.set('dictionary_id', app.models.dictionary.get('_id'));
    var newModel = this.model.isNew();
    var examples = [];
    this.$el.find('.example-set').each(function(t) {
      examples.push([
        $(this).find('#nihongo-' + t).val(),
        $(this).find('#example-' + t).val()
      ]);
    });
    this.model.set('examples', examples);
    this.model.save();
    if(newModel) {
      app.collections.entries.add(this.model);
    }
    app.trigger('app:toggleSidebar');
  },
  render: function() {
    var self = this;
    this.$el.html(this.template({model: this.model}));
    this.$el.find('.example-set').each(function(t) {
      $(this).find('#nihongo-' + t).val(self.model.get('examples')[t][0]);
      $(this).find('#example-' + t).val(self.model.get('examples')[t][1]);
    });
    this.stickit();
  },
  template: JST['app/partials/EntryEdit.html']
});
