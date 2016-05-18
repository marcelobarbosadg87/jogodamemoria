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
   [1,2,3] /* a11(0,0), a12(0,1), a13(0,2) */
  ,[4,5,6] /* a21(1,0), a22(1,1), a23(1,2) */
  ,[7,8,9] /* a31(2,0), a32(2,1), a33(2,2) */
  ];

];

function distribuiMatriz(){


};
clickAlert function(){
  alert(a11,a12,a13,a21,a22,a23,a31,a32,a33); // seleciona o elemento M ixj
}
