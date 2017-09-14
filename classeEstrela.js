
var declinacao = 0;
var	ascencaoReta = 0;
var	brilho = 0;
var	ligadaCom = 0;
var	cor = 0;
//var	imagem = new Sprite(8,8);

function Estrela()
{
	declinacao = 0;
	ascencaoReta = 0;
	brilho = 0;
	ligadaCom = 0;
	cor = 0;
	//imagem = new Sprite(8,8);
}

/*Estrela.prototype.declinacao = 0;
Estrela.prototype.ascencaoReta = 0;
Estrela.prototype.brilho = 0;
Estrela.prototype.ligadaCom = 0;
Estrela.prototype.cor = 0;
Estrela.prototype.imagem = new Sprite(8,8);*/

function preencheEstrela(estrela, num, dec, asc, bri, ligacao, color)
{
  estrela.numero = num;
  estrela.declinacao = dec;
  estrela.ascencaoReta = asc;
  estrela.brilho = bri;
  estrela.ligadaCom = ligacao;  
  estrela.cor = color;
}