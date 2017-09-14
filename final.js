var game;
var scene;

function setFinal(gameF, sceneF){

    this.game = gameF;
    this.scene = sceneF;
	
	setScene(sceneF);
	
	CriarFinal();
	
	transition_img = game.setTransition(sceneF, 'Out');
	transition_img.tl.fadeOut(game.fadeTime).then(function(){sceneF.removeChild(transition_img)});
}

function CriarFinal(){

	/********************************************************************************************/
	//Carregamento de assets
  
	fundo_img = game.assets['imagens/menu/Fundo.png'];
	terra_img = game.assets['imagens/final/terra.png'];
	mascara_img = game.assets['imagens/final/mascara.png'];
	carinha_img = game.assets['imagens/final/carinha.png'];
	floresta_img = game.assets['imagens/final/floresta.png'];
    fogo_img = game.assets['imagens/final/fogo.png'];
    raio_img = game.assets['imagens/final/raio.png'];
	parabens_img = game.assets['imagens/final/parabens.png'];
  
	
	final_sound = game.assets['sons/musicas/Final.mp3'];
	
	var fundoF = new Sprite(800, 600);
	fundoF.image = fundo_img;
	fundoF.frame = 0;
	fundoF.x = 0;
	fundoF.y = 0;
	
	var parabens = new Sprite(parabens_img.width, parabens_img.height);
	parabens.image = parabens_img;
	parabens.frame = 0;
    parabens.x = 0;
	parabens.y = 0;
	
	
	var mascara = new Sprite(mascara_img.width, mascara_img.height);
	mascara.image = mascara_img;
	mascara.frame = 0;
	mascara.x = game.width/4;
	mascara.y = 400;
	mascara.opacity = 0.5;
	mascara.scale(0.5,0.5);
	
	var terra = new Sprite(terra_img.width, terra_img.height);
	terra.image = terra_img;
	terra.frame = 0;
	terra.x = game.width/4;
	terra.y = 400;
	terra.scale(0.5,0.5);
	
	var carinha = new Sprite(32, 32);
	carinha.image = carinha_img;
	carinha.frame = 0;
	carinha.x = 385;
	carinha.y = 100;
	carinha.scale(0.1,0.1);
	carinha.visible =false;
	
	var floresta = new Sprite(floresta_img.width, floresta_img.height);
	floresta.image = floresta_img;
	floresta.frame = 0;
	floresta.x = 0;
	floresta.y = 0;
	//floresta.visible = false;
	
	var fogo = new Sprite(32, 32);
	fogo.image = fogo_img;
	fogo.frame = 0;
	fogo.x = 385;
	fogo.y = 100;
	fogo.scale(0.1,0.1);
	fogo.visible=false;
	
	var raio = new Sprite(raio_img.width, raio_img.height);
	raio.image = raio_img;
	raio.frame = 0;
	raio.x = 170;
	raio.y = -400;

	
	
	scene.addChild(fundoF);
	scene.addChild(terra);
	scene.addChild(mascara);
	
	scene.addChild(carinha);

	
	scene.addChild(floresta);
	scene.addChild(fogo);
	scene.addChild(raio);
	
	
	
	
	if(game.soundOn){
		final_sound.play(); 
		final_sound.volume = 0.5;				
	}
	
	
	var elapsedTime;
	var teste = true;
	var contador = 0;
	
	var victoryLabel;
	var victoryText = new String('');
	
	victoryText = victoryText + '       Com a derrota do grupo Extinction o perigo iminente de <br>  extinção da raça humana foi adiado, mas o planeta se torna <br>'
	victoryText = victoryText + '  cada vez mais inóspito devido à grande guerra.<br>'
	victoryLabel = game.showMessage(scene, victoryText);
	
	mascara.tl.moveTo(game.width/4,0,150);
	terra.tl.moveTo(game.width/4,0,150);
	floresta.tl.fadeOut(1);
	parabens.tl.fadeOut(1);
	
	var time = 0;
	
	scene.addEventListener('enterframe', function() {
	
		if (game.soundOn && final_sound.currentTime >= final_sound.duration){
			final_sound.play();
		}
		
		time = time+1;
		
		
		//////console.log(game.fps);
		
		if(time%30==0){
		//console.log(time/30);
		}
		
		if(time%3==0){
			if(fogo.frame==3){
				fogo.frame=0;
			}else{
				fogo.frame=fogo.frame+1;
			}
			
		}
		
		//Texto
		if(time==(30*5)){
			carinha.tl.scaleTo(1,90);
			fogo.tl.scaleTo(1,90);
		}
		
		if(time==(30*6)){
			fogo.visible=true;
			carinha.visible=true;
			var victoryLabel1;
			var victoryText1 = new String('');
			victoryText1 = victoryText1 + '  Com o artefato em mãos você libera toda a sua energia <br>  sobre o planeta.<br>'
			
			victoryLabel1 = game.showMessage(scene, victoryText1);
			scene.addChild(victoryLabel1);
		}
		if(time==(30*9)){
			raio.tl.moveTo(170,0,15);
			
		}
		if(time==(30*10)){
			fogo.visible=false;
			carinha.visible=false;
			mascara.visible=false;
			terra.visible=false;
			raio.x = 200;
			raio.tl.scaleTo(1000,90);
			
		}
		if(time==(30*12)){
			carinha.visible=true;
			terra.visible=true;
			
			var victoryLabel2;
			var victoryText2 = new String('');
			victoryText2 = victoryText2 + '  O planeta atingido pela energia cósmica do artefato é recuperado <br>  dos efeitos da guerra, a energia foi capaz de recuperar<br>'
			victoryText2 = victoryText2 + '  espécies extintas, além de florestas, rios e mares.<br>'
			
			victoryLabel2 = game.showMessage(scene, victoryText2);
			scene.addChild(victoryLabel2);
		}
		if(time==(30*13)){
			raio.tl.fadeOut(30);
			carinha.tl.scaleTo(0.01,90);
			
		}
		
		if(time==(30*17)){
			floresta.tl.fadeIn(60);
			floresta.tl.moveTo(-330,0,300);
		}
		if(time==(30*18)){
			
			var victoryLabel3;
			var victoryText3 = new String('');
			victoryText3 = victoryText3 + '  Com o planeta recuperado a quase extinta raça humana<br>'
			victoryText3 = victoryText3 + '  tem uma nova chance.<br>'
			
			victoryLabel3 = game.showMessage(scene, victoryText3);
			scene.addChild(victoryLabel3);
		}
		
		if(time==(30*26)){
			
			parabens.tl.fadeIn(60);
		
		}
		
		
		
		
	});
	
	scene.addChild(parabens);
	scene.addChild(victoryLabel);
	
	
	
	scene.addEventListener('touchstart', function() {			
		final_sound.stop(); 
		game.changeStages('gameover');			           
    });	
	
	
	
}
	
	
    
    
    
    
 


