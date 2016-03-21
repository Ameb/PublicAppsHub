var tem = _.template('<div><input id="inputFileToLoad" type="file" onchange="app.encodeImageFileAsURL();" />\
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
    <strong>Bien!</strong> La app se ha guardado satisfactoriamente.\
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
    //category: {type: 'Select', options: []},
    images: {
        title: 'Imágenes',
        type: 'List',
        itemType: 'Object',
        editorClass: 'ellipsis',
        //addLabel: '+',
        // template: test,
        editorAttrs: {},
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