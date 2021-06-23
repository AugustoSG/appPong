//Posição da bolinha
let xBolinha = 300;
let yBolinha = 200;

//Tamanho da bolinha
let diametro = 15;
let raio = diametro / 2;

//Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Posição da raquete do jogador
let xRaqueteJogador = 10;
let yRaqueteJogador = 150;
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;

//Tamanho das raquetes
let cRaquete = 10;
let aRaquete = 90;

//Velocidade da Raquete
let velocidadeRaquete;

//Colisão com outra Biclioteca
let colidiu = false;

//Placar
let PontosJogador = 0;
let PontosOponente = 0;

//Sons
let somPonto;
let somRaquetada;
let somTrilha;

//Oponente
let chancesDeErrar = 0;

function preload(){
  somPonto = loadSound("ponto.mp3");
  somRaquetada = loadSound ("raquetada.mp3");
  somTrilha = loadSound ("trilha.mp3")
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaqueteJogador, yRaqueteJogador);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaquete();
  //colisaoRaquete();
  colisaoRaquete2(xRaqueteJogador, yRaqueteJogador);
  colisaoRaquete2(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponente();
  incluirPlacar();
  marcarPonto()
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x,y) {
  rect(x, y, cRaquete, aRaquete);
}

function movimentarRaquete() {
  if (keyIsDown(UP_ARROW)) {
      yRaqueteJogador -= 10;
      }
  if (keyIsDown(DOWN_ARROW)) {
      yRaqueteJogador += 10;
  }
}

//function colisaoRaquete(x, y) {
//  if (xBolinha - raio < xRaqueteJogador + cRaquete && yBolinha - raio < yRaqueteJogador + //aRaquete && yBolinha - raio > yRaqueteJogador) {
//    velocidadeXBolinha *= -1;
//  }
//}

function colisaoRaquete2(x,y){
   colidiu = collideRectCircle(x, y, cRaquete, aRaquete, xBolinha, yBolinha, raio)
  
  if (colidiu) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  }
}

function movimentarRaqueteOponente(){
  velocidadeRaquete = yBolinha - yRaqueteOponente - cRaquete /2 - 30;
  yRaqueteOponente += velocidadeRaquete + chancesDeErrar
  calculaChanceDeErrar();
}

function incluirPlacar(){
  stroke (255);
  textAlign (CENTER);
  textSize (16);
  fill (color(255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255)
  text (PontosJogador, 170, 26);
  fill (color(255, 140, 0));
  rect (450, 10, 40, 20);
  fill (255)
  text (PontosOponente, 470, 26);
}

function marcarPonto() {
  if (xBolinha > 590) {
    PontosOponente += 1;
    somPonto.play();
  }
  if (xBolinha < 10) {
    PontosJogador += 1;
    somPonto.play();
  }
}

function calculaChanceDeErrar() {
  if(calculaChanceDeErrar >= PontosJogador){
    chancesDeErrar += 1;
      if (chancesDeErrar >= 40){
        chancesDeErrar = 40;
    }
    else {
      chancesDeErrar -= 1;
      if (chancesDeErrar <= 35) {
        chancesDeErrar = 35;
      }
    }
  }
}