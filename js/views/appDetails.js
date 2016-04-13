app.AppDetailsView = Backbone.View.extend({
    // vista de la aplicacion con sus detalles e imágenes.
    className: 'col-md-8',
    initialize: function() {
    },
    render: function() {
        var data = _.clone(this.model.attributes);
        var imgHTML = "";
        _.forEach(data.images, function(imgsrc) {
            imgHTML += ('<img class="img-responsive" src="'+imgsrc+'"><br>');
        });
        if (imgHTML == "") {
            imgHTML = "Esta aplicacion no tiene ninguna imagen.";
        }
        data.images = imgHTML;
        var codeHTML = "";
        _.forEach(data.implementations, function(code) {
            // generar la vista de implementacion
            codeHTML += "implementacion - " + code.name;
        });
        if (codeHTML == "") {
            codeHTML = "Esta aplicacion no tiene ninguna implementación.";
        }
        data.implementations = codeHTML;
        this.$el.html(this.template(data));
        return this;
        
    }
});
/*
app.AppCodeView = Backbone.View.extend({
    className: 'col-md-8',
    initialize: function() {
    },
    render: function() {
        var data = _.clone(this.model.attributes);
        data.description = data.description;
        data.id = this.model.id;
        var imgHTML = "";
        _.forEach(data.images, function(imgsrc) {
            imgHTML += ('<img class="img-responsive" src="'+imgsrc+'"><br>');
        });
        if (imgHTML == "") {
            imgHTML = "Esta aplicacion no tiene ninguna imagen.";
        }
        data.images = imgHTML;
        var codeHTML = "";
        _.forEach(data.images, function(imgsrc) {
            imgHTML += ('<img class="img-responsive" src="'+imgsrc+'"><br>');
        });
        if (imgHTML == "") {
            imgHTML = "Esta aplicacion no tiene ninguna imagen.";
        }
        this.$el.html(this.template(data));
        return this;
    }
});
*/