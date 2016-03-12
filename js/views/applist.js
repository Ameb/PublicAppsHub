app.AppListView = Backbone.View.extend({
  categoryGroups: {},
  initialize:function () {
    var self = this;
    this.model.on("reset", this.render, this);
    // agrupamos las aplicaciones en categorias
    this.categoryGroups = _.groupBy(app.AppList.models, function(a){return a.get('category')});
    this.model.on("add", function (appObj) {
        // añadir la aplicacion en la categoria que le corresponde
        self.$el.append(new app.AppListItemView({model:appObj}).render().el);
    });
},

render:function () {
    this.$el.empty();
        /*
        var categoryGroups = app.AppList.groupBy(function(appObj) {
            return appObj.get("category");
        });*/
        console.log(this.categoryGroups);
        _.each(this.categoryGroups, function (appCategory, key) {
            // escribimos la categoria
            console.log(key);
            this.$el.append('<h1>'+key+'</h1>');
            // y despues las apps
            _.each(appCategory, function (appObj) {
                console.log(appObj);
                this.$el.append(new app.AppListItemView({model:appObj}).render().el);    
            }, this);
        }, this);
        return this;
        /*
        _.each(this.model.models, function (appObj) {
            this.$el.append(new app.AppListItemView({model:appObj}).render().el);
            console.log(appObj);
        }, this);
        return this;
        */
    }
});
app.AppListItemView = Backbone.View.extend({

   initialize:function () {

   },
   render:function () {
    var data = _.clone(this.model.attributes);
    data.description = data.description.substring(0,200) + '...';
    data.id = this.model.id;
    this.$el.html(this.template(data));
    return this;
}
});

app.AppCategoryItemView = Backbone.View.extend({
    className: 'row',
    initialize: function () {

    },
    render: function () {
        this.$el.html()
        return this;
    }
})