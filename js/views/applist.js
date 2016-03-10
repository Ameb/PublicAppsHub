app.AppListView = Backbone.View.extend({
  className:'row',
 
   initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (product) {
            self.$el.append(new app.ProductListItemView({model:product}).render().el);
        });
    },
       
    render:function () {
        this.$el.empty();    
        _.each(this.model.models, function (product) {
            this.$el.append(new app.ProductListItemView({model:product}).render().el);
        }, this);
        return this;
    }
});

app.AppListItemView = Backbone.View.extend({
 className:'col-md-4',

  initialize:function () {

    },
  render:function () {
        var data = _.clone(this.model.attributes);
        data.id = this.model.id;
        this.$el.html(this.template(data));
        return this;
    }
});