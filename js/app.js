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
    "Apps/:id": "detallesApp",
    "cat/:categoryName": "showAppCategoryList",
    "newApp": "showAppform",
    "addAppToCart/:id": "addAppToCart",
    "about": "about"
  },
  initialize: function() {
    // incializa el header y el contenido. Muestra la lista de apps
    app.theHeaderView.render();
    this.$content = $("#content");
    $('.header').html(app.theHeaderView.el);
    this.showAppList();
  },
  showAppList: function() {
    this.$content.html(new app.AppListView({
      model: app.AppList
    }).render().el);
    app.theHeaderView.selectMenuItem('');
  },
  showAppCategoryList: function(categoryName) {
    app.AppList.fetch({
      reset: true
    });
    this.$content.html(new app.AppListGroupView(
      //console.log(app.AppList.groupedApps()[categoryName]);
      categoryName, app.AppList.groupedApps()[categoryName]).render().el);
    app.theHeaderView.selectMenuItem('');
  },
  detallesApp: function(id) {
    app.AppList.fetch({
      reset: true
    });
    var App = app.AppList.get(id);
    var self = this;
    App.fetch({
      success: function(data) {
        console.log(data);
        self.$content.html(new app.AppView({
          model: data
        }).render().el);
      }
    });
    app.theHeaderView.selectMenuItem('');
  },
  showAppform: function() {
    this.$content.html('<div id="form" class="form-group"></div>');
    var newApp = new app.AppObj();
    var AppForm = new Backform.Form({
      el: $("#form"),
      model: newApp,
      fields: app.AppFields(newApp), // Will get converted to a collection of Backbone.Field models
      events: {
        "submit": function(e) {
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
    $('.form-control').attr('rows', 12);
    console.log(newApp);
    app.theHeaderView.selectMenuItem('newapp');
  },
  about: function() {
    if (!this.aboutView) {
      this.aboutView = new app.AboutView();
    }
    this.$content.html(this.aboutView.el);
    app.theHeaderView.selectMenuItem('about');
  }

});


$(document).on("ready", function() {
  // No se iniciazila nada hasta que no se han cargado los datos y las plantillas
  app.AppList = new app.AppCollection();
  app.AppList.fetch().done(function() {
    app.loadTemplates(["AboutView", "HeaderView", "AppView", "HeaderCategoryMenuItemView",
        "AppListItemView", "AppListGroupView"
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
    console.log(_opened);
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
      $("button.navbar-toggle").click();
    }
  });
});