// Projeto Interdisciplinar
// Integrantes: Marcelo Barbosa, Caio Bandeira, Gustavo Soares, João Gusmão e Thullio Castro
// Nome do Projeto : Jogo da Memória
// Objetivos do Projeto: Um jogo da Memória Desenvolvido com Matrizes quadradas de número par.

// Lógica do Jogo

/*
1 - Distribui as matrizes nas variáveis a,b,c,d,e,f,g,h,i de forma que
o numero atribuido as variaveis seja metade do numero de variaveis, ou posições
das matrizes.

2 - Escolhe se uma carta e ela vira, escolhe a segunda carta e ela vira,
se a primeira carta for = a segunda carta, então as cartas permanecem viradas
senão vira-se as duas cartas de volta a posição original.

3 - Quando todas as cartes forem viradas e encontrarem suas respectivas correspondentes
a ela, exibe na tela "Você Ganhou" e o Botão, Jogar Novamente.

*/

// Referência de documentação da linguagem : https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Matrix_math_for_the_web

// Variáveis

// Funções



/*
var matrizJogo = [


  //variaveis de cada posição da matriz
  var a11 = matrizBase([0][0]); // acessa um item na matriz na posição a11
  var a12 = matrizBase([0][1]); // acessa um item na matriz na posição a12
  var a13 = matrizBase([0][2]); // acessa um item na matriz na posição a13
  var a21 = matrizBase([1][0]); // acessa um item na matriz na posição a21
  var a22 = matrizBase([1][1]); // acessa um item na matriz na posição a22
  var a23 = matrizBase([1][2]); // acessa um item na matriz na posição a23
  var a31 = matrizBase([2][0]); // acessa um item na matriz na posição a31
  var a32 = matrizBase([2][1]); // acessa um item na matriz na posição a32
  var a33 = matrizBase([2][2]); // acessa um item na matriz na posição a33

  var matrizBase = [
   [1,2,3]
  ,[4,5,6]
  ,[7,8,9]
  ];

];

function distribuiMatriz(){


};
clickAlert function(){
  alert(a11,a12,a13,a21,a22,a23,a31,a32,a33); // seleciona o elemento M ixj
}
*/
;(function($){
  
  var linhas            = 3;
  var colunas           = 4;
  var default_card_path = '/assets/images/cards';

  var App = {
    init: function() {
      console.log("Game App started");
      this.buildFrontCards( function() {
        App.sortItems(function(cards_sorted) {
          App.buildBackCards(cards_sorted);
        });
      });
      this.card_events_listener();
    },
    buildFrontCards: function( cb ) {
      console.log("Building Front Cards...");
      if( (linhas * colunas) % 2 == 0  ) {
        var html;
        var card_id = 0;
        for( var i = 0; i < linhas; i++ ) {
          html = '<div class="linha" data-linha="'+ i +'">';
            html += '<ul>';
            for( var j = 0; j < colunas; j++ ) {
                html += '<li class="card" data-id="'+ card_id +'" data-match="false" data-opened="false">';
                  html += '<div class="card-front front">';
                html += '</li>';
                card_id++;
            }
            html += '</ul>';
          html += '</div>';
          $( '.matriz' ).append( html );
        }
        return cb();
      }
      alert("O jogo não pode ser executado com estes parâmetros");
    },
    sortItems: function(cb) {
      console.log("Sorting items...");
      var combinations = ( linhas * colunas )/2;
      var itens = [ 
        'A.svg',
        'B.svg',
        'C.svg',
        'D.svg',
        'E.svg',
        'F.svg',
        'G.svg',
        'H.svg',
        'I.svg',
        'J.svg',
      ];
      var new_items = [];
      
      for( var i = 0; i < combinations; i++ ) {
        new_items.push(itens[i]);
        new_items.push(itens[i]);
      }
      this.shuffleArray( new_items );
      return cb(new_items);
    },
    buildBackCards: function( cards_sorted ) {
      console.log("Building Back Cards...");
      $.each( cards_sorted, function(i, val) {
        var back = '<div class="card-back back"">';
              back += '<img src="'+ default_card_path + '/' + val +'"></img>';
        back    += "</div>";
        $( '[data-id="'+i+'"]' ).append(back);
      });
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j    = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    },
    card_events_listener: function() {
      $( '.card' ).flip({
        axis: "y",
        reverse: false,
      });
      $( 'body' ).on( 'click', '.card', function() {
          var opened = $( this ).attr( 'data-opened' );
          if(opened == "true") {
            $( this ).flip(true);
            return false;
          }
          if( opened == "none" || opened == "true" ) return false;
          $( this ).attr( 'data-opened', "true" );
          if( $(this).attr('data-match') == "false" ) {
            if( $('[data-opened="true"]').size() == 2  && App.checkCards() ) { //Se n de abertas for 1 e forem iguais
              alert("Parabéns, você acertou!");
              $( '[data-opened="true"]' ).attr( 'data-match','true' );
              $( '[data-opened="true"]' ).off();
              $( '[data-opened="true"]' ).attr( 'data-opened','none' );
              return true;
            }
            if( $('[data-opened="true"]').size() == 2 ) {
              var card = this;
              setTimeout(function(){ $( '[data-opened="true"]' ).flip( false ); $( '.card' ).attr( 'data-opened', "false" ); }, 1500);
              return false;
            }
            if( $('[data-opened="true"]').size() > 2 ) {
              $( this ).flip( false ); $( this ).attr( 'data-opened', "false" );
            }
          }
      });
    },
    checkCards: function() {
      var elements = $( '[data-opened="true"]' );
      return $( elements[0] ).find( 'img' ).attr('src') == $( elements[1] ).find( 'img' ).attr('src');
      //if( elements[0] )
    }
  };
  
  App.init();

})(jQuery)