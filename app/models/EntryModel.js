var EntryModel = Backbone.Model.extend({
  urlRoot: '/api/entry',
  idAttribute: '_id',
  defaults: {
    dictionary_id: "",
    english: "",
    title: "",
    yomi: "",
    examples: []
  }
});

var EntryCollection = Backbone.Collection.extend({
  url: '/api/entry',
  model: EntryModel,
  parse: function(response) {
    if(response) {
      return response.entries;
    }
    return [];
  }
});
