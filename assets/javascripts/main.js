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

;(function($){

  var linhas            = 3;
  var colunas           = 4;
  var default_card_path = 'assets/images/cards';

  var App = {
    init: function() {
      console.log("Game App started");
      this.buildFrontCards( function() {
        App.sortItems(function(cards_sorted) {
          App.buildBackCards(cards_sorted);
        });
      });
      this.card_events_listener();
      this.restart_bt_listener();
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
        'A.png',
        'B.png',
        'C.png',
        'D.png',
        'E.png',
        'F.png',
        'G.png',
        'H.png',
        'I.png',
        'J.png',
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
              $( ".moves-quantity" ).html( parseInt( $( ".moves-quantity" ).html() ) + 1 );
              App.itsAMatch();
              $( '[data-opened="true"]' ).attr( 'data-match','true' );
              $( '[data-opened="true"]' ).off();
              $( '[data-opened="true"]' ).attr( 'data-opened','none' );
              if( $('[data-match="true"]').size() == $( '.matriz li' ).size()) {
                App.winCelebration();
              }
              return true;
            }
            if( $('[data-opened="true"]').size() == 2 ) {
                $( ".moves-quantity" ).html( parseInt( $( ".moves-quantity" ).html() ) + 1 );
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
    },
    winCelebration: function() {
        $( '.modal-success' ).show(function() {
          $( '.modal-success' ).css({opacity:'1'});
          $( '.modal-overlay' ).addClass( 'modal-overlay-active' );
        });
    },
    itsAMatch: function() {

    },
    restart_bt_listener: function() {
        $( 'body' ).on( 'click', '.restart-bt', function() {
            $( '.modal-success' ).hide();
            $( '.modal-success' ).css({opacity:'0'});
            $( '.modal-overlay' ).removeClass( 'modal-overlay-active' );
            $( ".moves-quantity" ).html( '0' );
            $( '.matriz' ).html('');
            App.init();
        });
    }
  };

  App.init();

})(jQuery)
