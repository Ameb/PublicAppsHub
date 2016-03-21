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
    "app/:id": "detallesApp",
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
  },
  showAppCategoryList: function(categoryName) {
    this.$content.html(new app.AppListGroupView(
      //console.log(app.AppList.groupedApps()[categoryName]);
      categoryName, app.AppList.groupedApps()[categoryName]).render().el);
    app.theHeaderView.selectMenuItem('');
  },
  detallesApp: function(id) {
    this.$content.html(new app.AppDetailsView({
      model: app.AppList.get(id)
    }).render().el);
    app.theHeaderView.selectMenuItem('');
  },
  showAppform: function() {
    Backbone.Form.editors.List.Modal.ModalAdapter = Backbone.BootstrapModal;
    var newApp = new app.AppObj();
    var form = new Backbone.Form({
      model: newApp,
      submitButton: 'Enviar'
    })
    form.render();
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
      console.log(newApp);
      app.AppList.create(newApp);
      //newApp.set('description', data[1].value);
    });
    this.$content.html(form.el);
    /*
    var AppForm = new Backform.Form({
      el: $("#form"),
      tagName: 'form', //no sirve
      model: newApp,
      fields: app.AppFields(newApp), // Will get converted to a collection of Backbone.Field models
      events: {
        "submit": function(e) {
          console.log('guardando');
          e.preventDefault();
          this.model.save()
            .done(function(result) {
              alert("Successful!");
            })
            .fail(function(error) {
              alert(error);
            });
          return false;
        }
      }
    });
    AppForm.render();
    $('.textarea-big').attr('rows', 12);
    // desconozco por que e formulario se guarda como <div id=form...
    // esto es un apaño
    $('#form').replaceWith('<form id="form" class="form-group">' + $('#form').html() + '</form>');

    $('#form').submit(function(e) {
      e.preventDefault();
      var data = $('#form').serializeArray();
      newApp.set('name', data[0].value);
      newApp.set('description', data[1].value);
      if (data[3].value == '') {
        newApp.set('category', data[2].value.match(/^"?([^"]*)"?$/)[1]);
      } else {
        newApp.set('category', data[3].value.match(/^"?([^"]*)"?$/)[1]);
      }
      app.AppList.create(newApp);
      AppForm.render();
      return false;
    });
    app.theHeaderView.selectMenuItem('newapp');
    */
  },
  about: function() {
    if (!this.aboutView) {
      this.aboutView = new app.AboutView();
    }
    this.$content.html(this.aboutView.el);
    app.theHeaderView.selectMenuItem('about');
  },
  reloadData: function() {
    // reset y carga de datos
    app.AppList.localStorage._clear(null);
    app.AppList.create(new app.AppObj({
      'name': 'Tu Villavesa',
      'category': 'Transporte'
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
    this.navigate("", true);
  }

});


$(document).on("ready", function() {
  // No se iniciazila nada hasta que no se han cargado los datos y las plantillas
  app.AppList = new app.AppCollection();
  app.AppList.fetch().done(function() {
    app.loadTemplates(["AboutView", "HeaderView", "AppView", "HeaderCategoryMenuItemView",
        "AppListItemView", "AppListGroupView", "AppDetailsView"
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
function encodeImageFileAsURL(cb) {
    return function(){
        var file = this.files[0];
        var reader  = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }
}