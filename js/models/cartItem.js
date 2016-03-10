app.CartItem = Backbone.Model.extend({
    
  className: "storeCartItem",
     
  initialize:function () {
   }, 
           
  defaults: {
        buyerId: "",
        name: "",
        productId: ""
    }
    
});

app.CartItemCollection = Backbone.Collection.extend({
    model: app.CartItem,
    
    localStorage: new Backbone.LocalStorage('cartItems-backbone')

});

