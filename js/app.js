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
        "":                 "showAllApps",
        "Apps/:id":    "detallesApp",
        "cartItems":        "showAllCartItems", 
        "cartItems/:id":    "detallesCartItem",
        "addAppToCart/:id":"addAppToCart",
        "about":              "about" 
    },

    initialize: function () {  
      app.allApps = new app.AppCollection();
      app.allCartItems = new app.CartItemCollection();  
      app.theHeaderView = new app.HeaderView();
      $('.header').html(app.theHeaderView.el);
      this.$content = $("#content");
    },

    showAllApps: function () {
      app.allApps.fetch({reset:true});
      this.$content.html(new app.AppListView(
                         {model: app.allApps}).render().el);
      app.theHeaderView.selectMenuItem('');
    },
    
    detallesApp: function (id) {
        var App = app.allApps.get(id);
        var self = this;
        App.fetch({
            success: function (data) {
                console.log(data);
                self.$content.html(new app.AppView({model: data}).render().el);
            }
        });
        app.theHeaderView.selectMenuItem('');
    },
        
    showAllCartItems: function () {
      
        if (!app.aCartItemListView) {
            app.allCartItems.fetch();
            app.aCartItemListView = new app.CartItemListView({model: app.allCartItems});
        } else {
             app.aCartItemListView.delegateEvents();
        }
       app.aCartItemListView.render();     
       this.$content.html( app.aCartItemListView.el);      
       app.theHeaderView.selectMenuItem('all-CartItems-menu');
    },                  
  
    detallesCartItem: function (id) {
    //    var cartItem = new app.CartItem({id: id});
        var cartItem = app.allCartItems.get(id);
        var self = this;
        cartItem.fetch({
            success: function (data) {
                console.log(data);
                // Note that we could also 'recycle' the same instance of AppFullView
                // instead of creating new instances
                self.$content.html(new app.CartItemView({model: data}).render().el);
            }
        });
        app.theHeaderView.selectMenuItem('all-CartItems-menu');
    },
    
    addAppToCart: function (id) {
       //completa esta función
       var p = app.allApps.get(id);
       p.attributes.quantity--;
       var ci = new app.CartItem();
       ci.attributes.AppId = id;
       app.allCartItems.create(ci);
       // guardamos
       ci.save();
       p.save();
       this.showAllCartItems();
                                                 
    },
              
    about: function () {
        if (!this.aboutView) {
            this.aboutView = new app.AboutView();
        }
        this.$content.html(this.aboutView.el);
        app.theHeaderView.selectMenuItem('about-menu');
    }
    
});


$(document).on("ready", function () {

    app.loadTemplates(["AboutView","HeaderView", "AppView", 
        "AppListView", "CategoryListView"],
        function () {
            app.router = new app.Router();
            Backbone.history.start();
        });
     
});
