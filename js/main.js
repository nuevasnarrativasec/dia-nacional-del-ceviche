const ambiente = 'desarrollo';
const qryString = '?ssg';

$(document).ready(function()
{
   var urlImg = 'img/';
   var urlJson = 'json/recetas.json' + qryString; 
   var urlReceta = 'receta.html?idReceta=';
   
   // if(ambiente == 'produccion') 
   // {
   //     urlImg = 'https://especiales.peru21.pe/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/img/';
   //     urlJson = 'https://especiales.peru21.pe/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/json/recetas.json' + qryString;
   //     urlReceta = 'https://especiales.peru21.pe/dia-nacional-del-ceviche-recetas-para-preparar-mejor-ceviche-peruano-nndd-p21visual/receta.html&idReceta=';
   // }
   
    fetch(urlJson)
        .then(function(response) {
            return response.json();
        })
        .then(function(recetasObj) {
            var recetasArray = $.makeArray(recetasObj);
            var filasRecetas = recetasArray[0];             
            var recetasLength = Object.keys(filasRecetas).length;            
            var recetas = '';
            var filaCuadricula = '';
            var aperturaFila = '<div class="row mx-auto py-3 align-items-end">';            
            var cierreFila = '</div>\n';
            var divisor = '<div class="row">\n' +
                        '<div class="col text-center">\n' +
                            '<img class="img-fluid" src=' + urlImg + 'separador.png' + qryString + '" alt="Separador">\n' +
                        '</div>\n' +
                    '</div>\n';
            
            for (i = 1; i <= recetasLength; i++) 
            {
                var fila = filasRecetas[i];
                var filaLength = Object.keys(fila).length;                
            
                for (j = 1; j <= filaLength; j++) 
                {
                    recetas +=
                        '<div class="col-6">\n' +
                            '<div class="py-2 text-center">\n' +
                                '<a href="' + urlReceta + fila[j].id + '">\n' +
                                    '<img class="img-fluid" src="' + urlImg + 'portada/' + fila[j].slug + '.png' + qryString + '" alt="' + fila[j].titulo + '">\n' +
                                '</a>\n' +
                            '</div>\n' +
                            '<div class="py-2 text-center">\n' +
                                '<a class="btn btn-receta text-white ' + fila[j].color + '" href="' + urlReceta + fila[j].id + '" target="_blank">' + fila[j].titulo + '</a>\n' +
                            '</div>\n' +
                        '</div>\n';
                }            
                console.log(i);
                
                if((i % 2 == 0) && (i < recetasLength))
                {
                    filaCuadricula += aperturaFila + recetas + cierreFila + divisor;
                }   
                else
                {
                    filaCuadricula += aperturaFila + recetas + cierreFila;
                }
                
                recetas = '';

                $('#recetas').html(filaCuadricula);
            }
        });
});
