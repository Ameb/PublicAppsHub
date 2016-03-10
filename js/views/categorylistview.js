app.CategoryListView = Backbone.View.extend({

   className:'row',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (cartItem) {
            self.$el.append(new app.CartItemListItemView({model:cartItem}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (cartItem) {
            this.$el.append(new app.CartItemListItemView({model:cartItem}).render().el);
        }, this);
        return this;
    }
});

app.CartItemListItemView = Backbone.View.extend({

 className:'col-md-4',

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        var data = _.clone(this.model.attributes);
        data.id = this.model.id;   
        this.$el.html(this.template(data));
        return this;
    }

});