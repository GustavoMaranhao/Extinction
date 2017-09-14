var game;
var cena;

function setGameOver(game1, scene){
    this.game = game1;
    this.cena = scene;       
    
	setScene(scene);
    CriarGameOver();
}

function CriarGameOver(){
	/********************************************************************************************/
    //Carregamento dos Assets
	
	var fundo_img = game.assets['imagens/gameover/Fundo.png'];
	
	/********************************************************************************************/

		
	var Fundo = new Sprite(800, 600);
	Fundo.image = fundo_img;
	Fundo.frame = 0;
	Fundo.x = 0;
	Fundo.y = 0;		
	cena.addChild(Fundo);
		
    gameOverLabel = new Label("GAME OVER<br><br>Voltar Menu");
    gameOverLabel.x = game.width/2 - gameOverLabel.width/2;
    gameOverLabel.y = 128;
    gameOverLabel.color = 'white';
    gameOverLabel.font = '32px strong';
    gameOverLabel.textAlign = 'center';		
	cena.addChild(gameOverLabel);
	
	cena.addEventListener('touchstart', function() {	
		game.changeStages('menu');			           
    });				   
}


 
    
    
 


