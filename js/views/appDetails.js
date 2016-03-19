app.AppDetailsView = Backbone.View.extend({
    className: 'col-md-8',
    initialize: function() {
    },
    render: function() {
        var data = _.clone(this.model.attributes);
        data.description = data.description;
        data.id = this.model.id;
        this.$el.html(this.template(data));
        return this;
    }
});