"use strict";

//PersonModel from person-model.js
//PersonCollection from person-collection.js
//PersonView from person-view.js

//튜토리얼이므로 모듈들은 전역변수로 지정했습니다. 실 개발 적용시에는 좀 더 까다로운 변수관리가 필요할 것입니다.

var Application = Backbone.View.extend({
    events: {
      "submit form": "submitHandler",
      "change input[name='sort']": "sortClickHandler"
    },
    initialize: function(options){
      _.extend(this, options);
      _.bindAll(this, "render", "submitHandler", "addPerson");
      this.listEl = this.$el.find(".world");
      this.collection = new PersonCollection([
        {
          name: "Kang",
          age: 57,
          gender: "male",
          skin: "#A27B62"
        },
        {
          name: "Cavin",
          age: 32,
          gender: "male",
          skin: "#fbceb1"
        },
        {
          name: "Jun",
          age: 23,
          gender: "female",
          skin: "#F8A9A9"
        },
        {
          name: "Kate",
          age: 17,
          gender: "female",
          skin: "#A27B62"
        }
      ]);
      this.collection.on({
        "add": this.addPerson,
        "sort": this.render
      });
      this.render();
    },
    render: function(){
      this.listEl.html("");
      this.collection.each(this.addPerson);
    },
    addPerson: function(model){
      var personView = new PersonView({
        model: model
      });
      this.listEl.append(personView.render().$el);
    },
    submitHandler: function(e){
      e.preventDefault();
      var personModel = new PersonModel({
        name: this.$el.find("input[name='name']").val() || undefined,
        age: parseInt(this.$el.find("input[name='age']").val()) || undefined,
        gender: this.$el.find("input[name='gender']:checked").val(),
        skin: this.$el.find("input[name='skin']:checked").val()
      });
      this.collection.add(personModel);      
      this.$el.find("form").get(0).reset();
      this.$el.find("input[name='name']").focus();
    },
    sortClickHandler: function(){
      var sortBy = this.$el.find("input[name='sort']:checked").val();
      this.collection.comparator = sortBy;
      this.collection.sort();
    }
});
