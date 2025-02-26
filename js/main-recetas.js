const ambiente = 'produccion';
const qryString = '?vbf';

$(document).ready(function()
{
    var idReceta = obtenerVariable('idReceta');
    var urlImg = '/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/img/recetas/';
    var urlJson = '/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/json/' + idReceta + '.json' + qryString; 

    // if(ambiente == 'produccion') 
    // {
    //     urlImg = 'https://especiales.peru21.pe/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/img/recetas/';
    //     urlJson = 'https://especiales.peru21.pe/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/json/' + idReceta + '.json' + qryString; 
    // }
   
    fetch(urlJson)
        .then(function(response) {
            return response.json();
        })
        .then(function(recetaObj) {
            var recetaArray = $.makeArray(recetaObj);
            var contenidoReceta = recetaArray[0];             
            var ingredientesLength = Object.keys(contenidoReceta['ingredientes']).length;
            var ingredientes = '';            
            
            $('#titulo-receta').html(contenidoReceta['titulo']);
            $('#titulo-receta').addClass('titulo-' + contenidoReceta['color']);
            $('#subtitulo-receta').text(contenidoReceta['subtitulo']);
            $('#img-receta').attr('src',urlImg + contenidoReceta['slug'] + '.png' + qryString);
            $('#img-receta').attr('alt',contenidoReceta['alt']);
            
            for(let i = 0; i < ingredientesLength; i++)
            {
                ingredientes += '<li class="list-group-item py-1 px-0 rounded-0">' + contenidoReceta['ingredientes'][i] + '</li>'; 
            }
            
            $('#ingredientes').html(ingredientes);
            $('#texto-receta').html(contenidoReceta['preparacion']);      
            $('#btn-inicio').addClass(contenidoReceta['color']);
        });
});

function obtenerVariable(url) 
{
    url = url.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + url + "=([^&#]*)"),
    resultados = regex.exec(location.search);
    return resultados === null ? "" : decodeURIComponent(resultados[1].replace(/\+/g, " "));
}