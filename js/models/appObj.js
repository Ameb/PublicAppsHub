app.AppObj = Backbone.Model.extend({

    className: "App",

    initialize: function() {},


    defaults: {

        name: '',
        description: 'Lorem ipsum Veniam proident adipisicing officia est consequat dolor reprehenderit enim ullamco in in veniam aliquip Excepteur tempor do qui sed occaecat est dolor dolor laborum ut amet aliquip Excepteur non ad esse nulla in exercitation aute anim sit velit consectetur dolor consequat sunt ea dolore elit qui non sunt dolore eiusmod voluptate ut reprehenderit cupidatat laborum qui nisi anim fugiat occaecat qui dolor sint ea sunt laboris amet veniam sed anim dolor Excepteur proident laboris ad consequat eiusmod in dolore aliqua exercitation quis consequat deserunt elit ut voluptate minim reprehenderit Duis proident commodo pariatur in enim sit ut sit ut voluptate eiusmod cupidatat aliqua ad commodo id aute laboris veniam magna laborum esse eu exercitation tempor ut ea ad dolore tempor Ut veniam Excepteur eiusmod laboris incididunt labore adipisicing cillum sit nisi anim do do Ut est voluptate adipisicing dolore dolor pariatur fugiat cupidatat nulla quis adipisicing commodo aliquip et aliquip laborum commodo exercitation Ut ea non enim anim sed nulla ut dolor fugiat sunt aliquip exercitation commodo commodo in adipisicing officia ut veniam amet non incididunt incididunt ex sit in do eiusmod irure enim in cillum proident dolor nostrud quis ullamco tempor tempor ut mollit ut dolore in elit dolor ut veniam velit sunt in proident dolor deserunt in sit consectetur enim Excepteur voluptate adipisicing reprehenderit velit eu qui do veniam sunt laboris ut exercitation Duis aliqua fugiat anim Ut pariatur esse cupidatat nostrud voluptate elit sit qui tempor labore veniam sint quis irure qui Excepteur aute culpa nostrud consectetur labore eiusmod Duis dolor dolore do culpa reprehenderit elit id irure.',
        images: [],
        category: 'Sin Categoría'
    }

});

app.AppCollection = Backbone.Collection.extend({

    model: app.AppObj,

    localStorage: new Backbone.LocalStorage('Apps-backbone'),
    // list categories devuelve una lista de los nombres de las categorias
    listCategories: function() {
        return [...new Set(this.models.map(item => item.attributes.category))];
    },
    /* Esto es 10 veces mas lento
    listCategories2: function() {
        return _.uniq(this.pluck());
    },
    */
    // groupedApps devuelve las apps agrupadas por categoria
    groupedApps: function() {
        return _.groupBy(this.models, function(a) {
            return a.get('category')
        });
    }

});