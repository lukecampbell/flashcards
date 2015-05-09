var FlashcardView = Backbone.View.extend({
  events: {
    'click #card' : 'onClick'
  },
  choose: function() {
    var modelIds = this.collection.pluck('_id');
    var model = this.collection.get(modelIds[Math.floor(Math.random() * modelIds.length)]);
    this.model = model;
  },
  flip: function() {
    this.$el.find('#card').toggleClass('flipped');
  },
  setEnglishFront: function(val) {
    this.englishFront = val;
    this.render();
  },
  initialize: function() {
    _.bindAll(this, "onKey", "onSwipeLeft");
    this.englishFront = false;
    this.listenTo(app, 'app:keydown', this.onKey);
    this.listenTo(app, 'app:swipeleft', this.onSwipeLeft);
    this.listenTo(this.collection, 'reset', this.onReady)
  },
  onClick: function(e) {
    e.stopPropagation();
    this.flip();
    if(app.mobile) {
      this.show();
    }
  },
  onKey: function(e) {
    if(e.keyCode == 32 || e.keyCode == 40) {
      this.flip();
      this.show();
    } else if (e.keyCode == 13 || e.keyCode == 39) {
      this.onReady();
    }
  },
  onSwipeLeft: function(e) {
    e.preventDefault();
    this.onReady();
  },
  onReady: function() {
    this.choose();
    this.render();
  },
  render: function() {
    this.$el.html(this.template({model: this.model, englishFront: this.englishFront}));
    this.$el.find('.bottom').hide();
  },
  show: function() {
    this.$el.find('.bottom').show();
  },
  template: JST['app/partials/Flashcard.html']
});
