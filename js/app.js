// objeto donde introducimos todas las funciones y objetos de la aplicación.
var app = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (app[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    app[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

app.Router = Backbone.Router.extend({

    routes: {
        "": "showAppList",
        "app/:id": "AppDetails",
        "deploy/:appid/:codeid/:deployid": "DeployDetails",
        "code/:appid/:codeid": "CodeDetails",
        "cat/:categoryName": "showAppCategoryList",
        "newApp": "showAppform",
        "reset": "reloadData",
        "about": "about"

    },
    initialize: function() {
        // incializa el header y el contenido. Muestra la lista de apps
        app.theHeaderView.render();
        this.$content = $("#content");
        $('.header').html(app.theHeaderView.el);
        Backbone.history.loadUrl(Backbone.history.fragment);
    },
    showAppList: function() {
        this.$content.html(new app.AppListView({
            model: app.AppList
        }).render().el);
        app.theHeaderView.selectMenuItem('');
        if (app.AppList.isEmpty()) {
            this.$content.html('<div class="well"> <strong>Parece que no hay datos!</strong><br>Puedes usar la opción\
             de Reset del menú para cargar unos datos de Demo</div>');
        }
    },
    showAppCategoryList: function(categoryName) {
        this.$content.html(new app.AppListGroupView(
            //console.log(app.AppList.groupedApps()[categoryName]);
            categoryName, app.AppList.groupedApps()[categoryName]).render().el);
        app.theHeaderView.selectMenuItem('');
    },
    AppDetails: function(id) {
        this.$content.html(new app.AppDetailsView({
            model: app.AppList.get(id)
        }).render().el);
        app.theHeaderView.selectMenuItem('');
    },
    DeployDetails: function(appid,codeid,deployid) {
        var model = app.AppList.get(appid).implementations.get(codeid).deployments.get(deployid);
        var el = $('#'+deployid);
        var form = new Backbone.Form({
            model: model,
            submitButton: 'Guardar'
        }).render();
        form.on('submit', function(e) {
            e.preventDefault();
            // validar
            var errors = form.validate();
            if (errors) {
                el.prepend(app.failFormDiv);
                $('.alert-info').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-info').alert('close');
                });
            } else {
                // guardar el modelo
                form.commit();
                model.save();
                Backbone.history.navigate('app/' + appid);
                Backbone.history.loadUrl('app/' + appid);
                el.prepend(app.successFormDiv);
                $('.alert-success').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-success').alert('close');
                });
                el.get(0).scrollIntoView();
                window.scrollBy(0,-100);
            }
        });
        el.html(form.el);
    },
    CodeDetails: function(appid, codeid) {
        var model = app.AppList.get(appid).implementations.get(codeid);
        var el = $('#'+codeid);
        var form = new Backbone.Form({
            model: model,
            submitButton: 'Guardar'
        }).render();
        form.on('submit', function(e) {
            e.preventDefault();
            // validar
            var errors = form.validate();
            if (errors) {
                el.prepend(app.failFormDiv);
                $('.alert-info').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-info').alert('close');
                });
            } else {
                // guardar el modelo
                form.commit();
                model.save();
                Backbone.history.navigate('app/' + appid);
                Backbone.history.loadUrl('app/' + appid);
                el.prepend(app.successFormDiv);
                $('.alert-success').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-success').alert('close');
                });
                el.get(0).scrollIntoView();
                window.scrollBy(0,-100);
            }
        });
        el.html(form.el);
    },
    showAppform: function() {
        Backbone.Form.editors.List.Modal.ModalAdapter = Backbone.BootstrapModal;
        var newApp = new app.AppObj();
        var form = new Backbone.Form({
            model: newApp,
            submitButton: 'Guardar',
            schema: app.AppFormSchema
        });
        form.render();
        // establecer categoria por defecto
        form.getEditor('new_category').setValue(form.getEditor('category').value);
        form.on('category:change', function(form, catEditor) {
            var v = catEditor.getValue();
            if (v == '') {
                form.getEditor('new_category').setValue();
                $('.field-new_category').show();
            } else {
                form.getEditor('new_category').setValue(v);
                $('.field-new_category').hide();
            }
        })
        form.on('submit', function(e) {
            e.preventDefault();
            // validar
            var errors = form.validate();
            if (errors) {
                $('#content').prepend(app.failFormDiv);
                $('.alert-info').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-info').alert('close');
                });
            } else {
                // guardar el modelo
                var data = (this.$el.serializeArray());
                newApp.set('name', data[0].value);
                newApp.set('description', data[1].value);
                newApp.set('category', data[3].value);
                // las imagenes por separado
                var listai = [];
                _.forEach($('.ellipsis[name=images] div'), function(item) {
                    listai.push(item.innerHTML);
                })
                newApp.set('images', listai);
                app.AppList.create(newApp);
                Backbone.history.navigate('app/' + newApp.attributes.id);
                Backbone.history.loadUrl('app/' + newApp.attributes.id);
                $('#content').prepend(app.successFormDiv);
                $('.alert-success').fadeTo(2000, 500).slideUp(500, function() {
                    $('.alert-success').alert('close');
                });

            }
        });
        this.$content.html(form.el);
    },
    about: function() {
        if (!this.aboutView) {
            this.aboutView = new app.AboutView();
        }
        this.$content.html(this.aboutView.el);
        app.theHeaderView.selectMenuItem('about');
    },
    reloadData: function() {
        if (confirm('¿Estas seguro de que quieres repoblar los datos de la aplicación?')) {
            // reset y carga de datos
            app.AppList.localStorage._clear(null);
            app.AppList.create(new app.AppObj({
                'name': 'Tu Villavesa',
                'category': 'Transporte',
                'description': 'A esta aplicación le hemos puesto imágenes a modo de Demo',
                'images': app.TuVillavesaImgs
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Provincial',
                'category': 'Transporte'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Taxi App',
                'category': 'Transporte'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Medico de guardia',
                'category': 'Salud'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Farmacias',
                'category': 'Salud'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'CinfaPlus',
                'category': 'Salud'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'El numero Pi',
                'category': 'Apps Educativas'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'WikiApp',
                'category': 'Apps Educativas'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Sabias Que',
                'category': 'Apps Educativas'
            }));
            app.AppList.create(new app.AppObj({
                'name': 'Otra App',
                'category': 'Otra Categoria'
            }));
        }
        app.AppList.fetch()
        this.navigate("", true);
    }
});


$(document).on("ready", function() {
    // No se iniciazila nada hasta que no se han cargado los datos y las plantillas
    app.AppList = new app.AppCollection();
    app.AppList.fetch().done(function() {
        app.loadTemplates(["AboutView", "HeaderView", "HeaderCategoryMenuItemView",
                "AppListItemView", "AppListGroupView", "AppDetailsView", "AppCodeView", "AppDeployView"
            ],
            function() {
                app.theHeaderView = new app.HeaderView();
                Backbone.history.start();
                app.router = new app.Router();
            });
    });
    $(document).click(function(event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
});