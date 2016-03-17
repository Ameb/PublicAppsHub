var testApp = new app.AppObj();
testApp.set('name','Aplicacion');
testApp.set('description','Lorem ipsum Veniam proident adipisicing officia est consequat dolor reprehenderit enim ullamco in in veniam aliquip Excepteur tempor do qui sed occaecat est dolor dolor laborum ut amet aliquip Excepteur non ad esse nulla in exercitation aute anim sit velit consectetur dolor consequat sunt ea dolore elit qui non sunt dolore eiusmod voluptate ut reprehenderit cupidatat laborum qui nisi anim fugiat occaecat qui dolor sint ea sunt laboris amet veniam sed anim dolor Excepteur proident laboris ad consequat eiusmod in dolore aliqua exercitation quis consequat deserunt elit ut voluptate minim reprehenderit Duis proident commodo pariatur in enim sit ut sit ut voluptate eiusmod cupidatat aliqua ad commodo id aute laboris veniam magna laborum esse eu exercitation tempor ut ea ad dolore tempor Ut veniam Excepteur eiusmod laboris incididunt labore adipisicing cillum sit nisi anim do do Ut est voluptate adipisicing dolore dolor pariatur fugiat cupidatat nulla quis adipisicing commodo aliquip et aliquip laborum commodo exercitation Ut ea non enim anim sed nulla ut dolor fugiat sunt aliquip exercitation commodo commodo in adipisicing officia ut veniam amet non incididunt incididunt ex sit in do eiusmod irure enim in cillum proident dolor nostrud quis ullamco tempor tempor ut mollit ut dolore in elit dolor ut veniam velit sunt in proident dolor deserunt in sit consectetur enim Excepteur voluptate adipisicing reprehenderit velit eu qui do veniam sunt laboris ut exercitation Duis aliqua fugiat anim Ut pariatur esse cupidatat nostrud voluptate elit sit qui tempor labore veniam sint quis irure qui Excepteur aute culpa nostrud consectetur labore eiusmod Duis dolor dolore do culpa reprehenderit elit id irure.');
app.AppList.create(testApp);
//
app.AppList.create([
	new app.AppObj({'name': 'Aplicacion03','category':'Categoria0'}),
	new app.AppObj({'name': 'Aplicacion04','category':'Categoria0'}),
	new app.AppObj({'name': 'Aplicacion05','category':'Categoria0'}),
	new app.AppObj({'name': 'Aplicacion06','category':'Categoria1'}),
	new app.AppObj({'name': 'Aplicacion07','category':'Categoria1'}),
	new app.AppObj({'name': 'Aplicacion08','category':'Categoria1'}),
	new app.AppObj({'name': 'Aplicacion09','category':'Categoria1'}),
	new app.AppObj({'name': 'Aplicacion010','category':'Categoria2'}),
	new app.AppObj({'name': 'Aplicacion011','category':'Categoria2'}),
	new app.AppObj({'name': 'Aplicacion012','category':'Categoria2'})
]);
//
app.AppList.create(new app.AppObj({'name': 'Aplicacion03','category':'Categoria0'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion04','category':'Categoria0'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion05','category':'Categoria0'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion06','category':'Categoria1'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion07','category':'Categoria1'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion08','category':'Categoria1'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion09','category':'Categoria1'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion010','category':'Categoria2'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion011','category':'Categoria2'}));
app.AppList.create(new app.AppObj({'name': 'Aplicacion012','category':'Categoria2'}));

//
var testApp2 = new app.AppObj({
	name: 'Aplicacion2',
	description: 'Lorem ipsum Veniam proident adipisicing officia est consequat dolor reprehenderit enim ullamco in in veniam aliquip Excepteur tempor do qui sed occaecat est dolor dolor laborum ut amet aliquip Excepteur non ad esse nulla in exercitation aute anim sit velit consectetur dolor consequat sunt ea dolore elit qui non sunt dolore eiusmod voluptate ut reprehenderit cupidatat laborum qui nisi anim fugiat occaecat qui dolor sint ea sunt laboris amet veniam sed anim dolor Excepteur proident laboris ad consequat eiusmod in dolore aliqua exercitation quis consequat deserunt elit ut voluptate minim reprehenderit Duis proident commodo pariatur in enim sit ut sit ut voluptate eiusmod cupidatat aliqua ad commodo id aute laboris veniam magna laborum esse eu exercitation tempor ut ea ad dolore tempor Ut veniam Excepteur eiusmod laboris incididunt labore adipisicing cillum sit nisi anim do do Ut est voluptate adipisicing dolore dolor pariatur fugiat cupidatat nulla quis adipisicing commodo aliquip et aliquip laborum commodo exercitation Ut ea non enim anim sed nulla ut dolor fugiat sunt aliquip exercitation commodo commodo in adipisicing officia ut veniam amet non incididunt incididunt ex sit in do eiusmod irure enim in cillum proident dolor nostrud quis ullamco tempor tempor ut mollit ut dolore in elit dolor ut veniam velit sunt in proident dolor deserunt in sit consectetur enim Excepteur voluptate adipisicing reprehenderit velit eu qui do veniam sunt laboris ut exercitation Duis aliqua fugiat anim Ut pariatur esse cupidatat nostrud voluptate elit sit qui tempor labore veniam sint quis irure qui Excepteur aute culpa nostrud consectetur labore eiusmod Duis dolor dolore do culpa reprehenderit elit id irure.'
});

// borrar
// app.AppList.localStorage._clear(null)
