app.AppListView = Backbone.View.extend({
    categoryGroups: {},
    initialize: function() {
        var self = this;
        this.categoryGroups = app.AppList.groupedApps();
        this.model.on("reset", this.render, this);
        // agrupamos las aplicaciones en categorias
        this.model.on("add", function(appObj) {
            self.$el.append(new app.AppListItemView({
                model: appObj
            }).render().el);
        });
    },
    render: function() {
        this.$el.empty();
        // mostrar la vista de cada categoría
        _.each(this.categoryGroups, function(appCategory, key) {
            this.$el.append(new app.AppListGroupView(key, appCategory).render().el);
        }, this);
        return this;
    }
});
app.AppListItemView = Backbone.View.extend({
    // vista de una aplicación en la lista por categoría
    // solo muestra los 400 primeros caracteres de la descripción
    className: 'col-md-4',
    initialize: function() {
    },
    render: function() {
        var data = _.clone(this.model.attributes);
        data.description = data.description.substring(0, 400) + '...';
        data.id = this.model.id;
        this.$el.html(this.template(data));
        return this;
    }
});

app.AppListGroupView = Backbone.View.extend({
    //vista de una categoría con sus aplicaciones
    className: 'well well-sm row',
    categoryName: "",
    categoryGroup: [],
    initialize: function(categoryName, categoryGroup) {
        this.categoryName = categoryName;
        this.categoryGroup = categoryGroup;
    },
    render: function() {
        // construimos la vista de las aplicaciones de la categoría
        var applistHTML = "";
        _.each(this.categoryGroup, function(appObj) {
            applistHTML += (new app.AppListItemView({
                model: appObj
            }).render().el.outerHTML);
        });
        $(this.el).html(this.template({
            name: this.categoryName,
            apps: applistHTML
        }));
        return this;
    }
})