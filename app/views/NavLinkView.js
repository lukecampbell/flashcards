var NavLinkView = Backbone.View.extend({
  tagName: 'ul',
  className: 'nav navbar-nav',
  add: function(navLinkItem) {
    this.$el.append(navLinkItem.el);
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html();
  }
});

var NavLinkItemView = Backbone.View.extend({
  events: {
    'click' : 'onClick'
  },
  tagName: 'li',
  initialize: function(options) {
    if(options && options.href && options.label) {
      this.href = options.href;
      this.label = options.label;
      this.render();
    } else {
      console.error("Nav Link items need an href and a label");
    }
    if(options && options.onClick) {
      this.clientClick = options.onClick;
    }
  },
  onClick: function(event) {
    event.preventDefault();
    event.stopPropagation();
    app.trigger('NavLinkView:click', {href: this.href, label: this.label});
    if(this.clientClick) {
      this.clientClick({href: this.href, label: this.label});
    }
    if(this.href != '#') {
      window.location.href = this.href;
    }
  },
  render: function() {
    this.$el.html('<a href="' + this.href +'">' + this.label + '</a>');
  }
});


