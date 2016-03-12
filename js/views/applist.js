app.AppListView = Backbone.View.extend({
  categoryGroups: {},
  initialize:function () {
    var self = this;
    this.categoryGroups = _.groupBy(app.AppList.models, function(a){return a.get('category')});
    this.model.on("reset", this.render, this);
    // agrupamos las aplicaciones en categorias
    this.model.on("add", function (appObj) {
        // actualizar las categorias
        this.categoryGroups = _.groupBy(app.AppList.models, function(a){return a.get('category')});
        // ^ no funciona. append <-
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
            /*
            // escribimos la categoria
            console.log(key);
            this.$el.append('<h1>'+key+'</h1>');
            // y despues las apps
            _.each(appCategory, function (appObj) {
                console.log(appObj);
                this.$el.append(new app.AppListItemView({model:appObj}).render().el);    
            }, this);
            */
            // en vez de lo anterior, llamamos a la vista de la categoría para que la construya con
            // categoryGroups.
            this.$el.append(new app.AppListGroupView(key, appCategory).render().el);
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
    className: 'col-md-4',
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

app.AppListGroupView = Backbone.View.extend({
    // el: 'div',
    className: 'well well-sm row',
    categoryName: "",
    categoryGroup: [],
    initialize: function (categoryName, categoryGroup) {
        this.categoryName = categoryName;
        this.categoryGroup = categoryGroup;
    },
    render: function () {
        var applistHTML = "";
        _.each(this.categoryGroup, function(appObj) {
            applistHTML += (new app.AppListItemView({model: appObj}).render().el.outerHTML);
        });
        $(this.el).html(this.template({name: this.categoryName, apps: applistHTML}));
        return this;
    }
})