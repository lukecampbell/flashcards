var EntryModel = Backbone.Model.extend({
  urlRoot: '/api/entry',
  idAttribute: '_id',
  defaults: {
    dictionary_id: "",
    english: "",
    title: "",
    yomi: "",
    examples: [
    ]
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

var EntrySearchCollection = Backbone.Collection.extend({
  url: '/api/search',
  model: EntryModel,
  parse: function(response) {
    if(response && response.results) {
      var results = _.map(response.results, function(result) {
        return result.obj;
      });
      return results;
    }
    return [];
  }
});
