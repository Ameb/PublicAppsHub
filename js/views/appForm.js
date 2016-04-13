// Contiene lo necesario para construir el formulario de nueva aplicación
// No es una vista de BB como tal
var tem = _.template('<div><p>Inserta aqui la imagen. La convertimos a base64 (string) y la guardamos como tal</p>\
    <input id="inputFileToLoad" type="file" onchange="app.encodeImageFileAsURL();" />\
    <br><div class="output "><textarea id= "b64ta" class="form-control"></textarea><br>\
    <img class="img-responsive"></div>\
    <script>\
        $("#inputFileToLoad").change(app.encodeImageFileAsURL(function(base64Img){\
            $(".output").find("textarea").val(base64Img).end()\
            .find("img").attr("src", base64Img);\
        }))\
    </script>\
</div>');
app.successFormDiv = '<div class="alert alert-success fade in">\
    <a href="#" class="close" data-dismiss="alert">&times;</a>\
    <strong>Bien!</strong> Guardado satisfactoriamente.\
</div>';
app.failFormDiv = '<div class="alert alert-info fade in">\
    <a href="#" class="close" data-dismiss="alert">&times;</a>\
    <strong>Formulario incompleto</strong> Por favor, revísalo.\
</div>';
app.encodeImageFileAsURL = function encodeImageFileAsURL(cb) {
  return function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      cb(reader.result);
    }
    reader.readAsDataURL(file);
  }
}
app.AppFormSchema = {
    name: {
        title: 'Nombre de la aplicación',
        type: 'Text',
        validators: ['required']
    },
    description: {
        title: 'Descripción',
        type: 'TextArea',
        editorAttrs: {
            rows: 15
        },
        validators: ['required']
    },
    category: {
        title: 'Categoría',
        type: 'Select',
        options: function(callback, editor) {
            var list = [];
            var listc = app.AppList.listCategories();
            listc = _.union(listc, ['Sin Categoría']);
            _.forEach(listc, function(item) {
                list.push({
                    'val': item,
                    'label': item
                });
            });
            list.push({
                'val': '',
                'label': 'Nueva Categoria (Escribir nombre)'
            });
            callback(list);
        }
    },
    new_category: {
        title: 'Nombre de la nueva categoría',
        type: 'Text',
        fieldAttrs: {
            style: 'display: none'
        },
        validators: ['required']
    },
    images: {
        title: 'Imágenes',
        type: 'List',
        itemType: 'Object',
        editorClass: ['ellipsis'],
        editorAttrs: {class: 'form-control ellipsis', disabled:true},
        itemToString: function() {
            return $('#b64ta').val();
        },
        subSchema: {
            image: {
                type: 'Text',
                template: tem
            }
        }
    }
}