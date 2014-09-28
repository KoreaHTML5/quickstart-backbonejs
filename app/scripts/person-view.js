"use strict";

var PersonView = Backbone.View.extend({
  events: {
    "click .face": "faceClickHandler",
    "click .remove": "removeClickHandler"
  },
  initialize: function(options){
    _.extend(this, options);
    _.bindAll(this, "selectedChangeHandler", "modelRemoveHandler");
    this.template = _.template($("#personViewTemplate").html());
    this.model.on({
      "change:selected": this.selectedChangeHandler,
      "remove": this.modelRemoveHandler
    })
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.addClass("person");
    return this;
  },
  faceClickHandler: function(){
    var currentSelectedModel = this.model.collection.findWhere({"selected": true});
    if(currentSelectedModel && currentSelectedModel !== this.model)
      currentSelectedModel.set("selected", false);

    this.model.set("selected", !this.model.get("selected"));
  },
  removeClickHandler: function(){
    this.model.collection.remove(this.model);
  },
  selectedChangeHandler: function(){
    this.$el.toggleClass("selected", this.model.get("selected"));
  },
  modelRemoveHandler: function(){
    this.$el.remove();
  }
});