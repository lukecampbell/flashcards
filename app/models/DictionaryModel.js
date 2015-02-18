var DictionaryModel = Backbone.Model.extend({
  urlRoot: '/api/dictionary',
  idAttribute: "_id",
  defaults: {
    author: "",
    display: "",
    name: "",
    entries: 0
  }
});

var DictionaryCollection = Backbone.Collection.extend({
  url: '/api/dictionary',
  model: DictionaryModel,
  parse: function(response) {
    if(response) {
      return response.dictionaries;
    }
    return [];
  }
});
