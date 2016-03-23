app.AppDetailsView = Backbone.View.extend({
    // vista de la aplicacion con sus detalles e imágenes.
    className: 'col-md-8',
    initialize: function() {
    },
    render: function() {
        var data = _.clone(this.model.attributes);
        data.description = data.description;
        data.id = this.model.id;
        img = "";
        _.forEach(data.images, function(imgsrc) {
            img += ('<img class="img-responsive" src="'+imgsrc+'"><br>');
        });
        if (img == "") {
            img = "Esta aplicacion no tiene ninguna imagen.";
        }
        data.images = img;
        this.$el.html(this.template(data));
        return this;
    }
});