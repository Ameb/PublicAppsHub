app.AppFields = function (appObj) {
    // construimos un objeto del tipo {categoria: categoria, categoria2: categoria2,...}
    var list = [];
    var listc = app.AppList.listCategories();
    listc = _.union(listc,[appObj.defaults.category]);
    _.forEach(listc, function(item) {
        list.push({'label': item, 'value': item});
    });
    list.push({'label': 'Nueva Categoria (Elegir nombre)', 'value': null })
    var a = [{
        name: "name",
        label: "Nombre de la aplicacion",
        control: "input"
    }, {
        name: "description",
        label: "descripcion",
        control: "textarea",
        extraClasses: ["fancy textarea-big"],
        helpMessage: "Los primeros 200 caracteres se mostraran en la lista de aplicaciones."
    }, {
        name: "category",
        label: "Categoria",
        control: "select",
        options: list
    }, {
        name: "new_category",
        label: "Nueva categoria",
        control: "input",
        visible: false
    },{
        control: "button",
        label: "Guardar",
        extraClasses: ["btn-default", "btn-block"]
    }];
    return a;
}