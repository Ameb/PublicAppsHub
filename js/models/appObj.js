app.AppObj = Backbone.Model.extend({

   className: "storeApp",
       
    initialize:function () {
     },

     
    defaults: {
       
        name: "",
        description: "",
        images: []
    }
  
});

app.AppCollection = Backbone.Collection.extend({

    model: app.AppObj,
    
    localStorage: new Backbone.LocalStorage('Apps-backbone')
            
  
});
