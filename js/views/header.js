app.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
//        var categoryGroups = _.groupBy(app.AppList.models, function(a){return a.get('category')});
        var categoryNames = [...new Set(app.AppList.models.map(item => item.attributes.category))];
        var aux = "";
        _.each(categoryNames, function (name) {
            aux += (new app.HeaderCategoryMenuItemView(name).render().el.outerHTML);
        });
        console.log(aux);
        $(this.el).html(this.template({categories: aux}));
        return this;
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

})

app.HeaderCategoryMenuItemView = Backbone.View.extend({
    el: 'li',
    initialize:function (name) {
        this.categoryName = name;
    },
    render: function () {
        this.$el.html(this.template({category: this.categoryName}));
        return this;
    }
})