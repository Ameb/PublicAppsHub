app.HeaderView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        var aux = "";
        _.each(app.AppList.listCategories(), function(name) {
            aux += (new app.HeaderCategoryMenuItemView(name).render().el.outerHTML);
        });
        $(this.el).html(this.template({
            categories: aux
        }));
        return this;
    },

    selectMenuItem: function(menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

})

app.HeaderCategoryMenuItemView = Backbone.View.extend({
    el: 'li',
    initialize: function(name) {
        this.categoryName = name;
    },
    render: function() {
        this.$el.html(this.template({
            category: this.categoryName
        }));
        return this;
    }
})