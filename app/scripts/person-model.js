"use strict";

var PersonModel = Backbone.Model.extend({
  defaults: {
    name: "Name",
    age: 0,
    gender: "male",
    skin: "#fbceb1",
    selected: false
  }
});