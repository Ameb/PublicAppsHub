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
        _.forEach(this.model.implementations.models, function(model) {
            // generar la vista de implementacion
            codeHTML += new app.AppCodeView({model: model}).render().$el.html();
        });
        if (codeHTML == "") {
            codeHTML = "Esta aplicacion no tiene ninguna implementación.";
        }
        data.implementations = codeHTML;
        this.$el.html(this.template(data));
        return this;
        
    }
});

app.AppCodeView = Backbone.View.extend({
    render: function() {
        var data = _.clone(this.model.attributes);
        var deployHTML = "";
        _.forEach(this.model.deployments.models, function(deploy) {
            console.log(deploy);
            deployHTML +=new app.AppDeployView({model: deploy}).render().$el.html();
        });
        if (deployHTML == "") {
            deployHTML = "Esta implementación no tiene ningún despliegue.";
        }
        data.deployments = deployHTML;
        this.$el.html(this.template(data));
        return this;
    }
});

app.AppDeployView = Backbone.View.extend({
    render: function() {
        var data = _.clone(this.model.attributes);
        this.$el.html(this.template(data));
        return this;
    }
});