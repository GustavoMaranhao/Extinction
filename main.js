// inicia enchant.js
enchant();

// o código abaixo será executado após o arquivo HTML ter sido completamente carregado
window.onload = function()
{
  // cria o objeto de jogo
  var game = new Core(800,600);
  //var game = new Core(460,400);
  //var game = new Core(1800,1120);		//Vista total do labirinto
  
  /********************************************************************************************/
  //Keybinds
  game.keybind(32, 'a');		//Barra de espaço
  game.keybind(81, 'b');		//Q
  game.keybind(87, 'up');		//W
  game.keybind(65, 'left');		//A
  game.keybind(83, 'down');		//S
  game.keybind(68, 'right');	//D
  
  /********************************************************************************************/
  //Preload de Assets
  
  // Fundos
  game.preload('imagens/bgs/bg_text.png');
  
  
  //Músicas
  game.preload('sons/musicas/Menu.mp3');
  game.preload('sons/musicas/Intro.mp3');
  game.preload('sons/musicas/Fase1.mp3');
  game.preload('sons/musicas/Fase2.mp3');
  game.preload('sons/musicas/Fase3.mp3');
  game.preload('sons/musicas/Final.mp3');
  
  //Sons
  game.preload('sons/randomico/Confirmar.wav');
  game.preload('sons/randomico/erro.mp3');
  game.preload('sons/randomico/estrela1.wav');
  game.preload('sons/randomico/WindowsPrintComplete.mp3');
  game.preload('sons/randomico/drop.mp3');
  game.preload('sons/randomico/cagedAnimals.mp3');
  game.preload('sons/randomico/passos-na-areia.mp3');          // Chico
  game.preload('sons/randomico/player-andando-labirinto.mp3'); // Chico
  game.preload('sons/randomico/morto-pela-armadilha.mp3');     // Chico
  game.preload('sons/randomico/armadilha-espeto-movendo.mp3'); // Chico - 2a fase, armadilhas com espetos subindo e descendo
  game.preload('sons/randomico/abrir-cadeado.mp3');            // Chico  - usado quando o personagem abre o cadeado
  game.preload('sons/randomico/explosaoBarril.mp3');           // Chico  - usado quando o barril começa a explodir no level 1
  game.preload('sons/randomico/lanternaLigando.mp3');
  game.preload('sons/randomico/terraAbrindo.mp3');
  game.preload('sons/randomico/crushing.mp3');
  game.preload('sons/randomico/keyPickup.mp3');
  
  
  //Estrelas
  game.preload('imagens/stars/estrela1.png');  
  game.preload('imagens/stars/estrela2.png');  
  game.preload('imagens/stars/estrela3.png');  
  game.preload('imagens/stars/estrela4.png');  
  game.preload('imagens/stars/estrela5.png');  
  game.preload('imagens/stars/estrela6.png'); 

  //Player
  game.preload('imagens/player/chara0.png');
  game.preload('imagens/player/exclamationMark.png');
  game.preload('imagens/player/hole.png');
  game.preload('imagens/player/shot2.png');
  game.preload('imagens/player/explosion2.png'); 
  game.preload('imagens/player/font0.png');   
  game.preload('imagens/player/icon0.png');   
  game.preload('imagens/player/pad.png');   
  game.preload('imagens/player/apad.png');   
  
  //Enemy
  game.preload('imagens/enemy/enemy.png');
  game.preload('imagens/enemy/sighted.png');
  game.preload('imagens/enemy/shot.png');
  
  //Menu
  game.preload('imagens/menu/Menu.png');
  game.preload('imagens/menu/Titulo.png');
  game.preload('imagens/menu/NovoJogo.png');
  game.preload('imagens/menu/Continuar2.png');
  game.preload('imagens/menu/Fundo.png');
  game.preload('imagens/menu/estrelacadente.png');
  game.preload('imagens/menu/estrela.png');
  game.preload('imagens/menu/SomLigado.png');
  game.preload('imagens/menu/SomDesligado.png');
  game.preload('imagens/menu/VersaoMobile.png');
  game.preload('imagens/menu/VersaoDesktop.png');
  
  //Game Over 
  game.preload('imagens/gameover/Fundo.png');
  
  //Intro 
  game.preload('imagens/intro/fundo.png');
  game.preload('imagens/intro/Fogo.png');
  game.preload('imagens/intro/nuclear.png');
  game.preload('imagens/intro/mascara.png');
  
  //Level 1
  game.preload('imagens/level1/ceuNoturno01.png');  
  game.preload('imagens/level1/DesertoAnoitecendo02.png'); 
  game.preload('imagens/level1/iPad-icon-verde2.png');     
  game.preload('imagens/level1/chaves2.png');
  game.preload('imagens/level1/escorpiaoMapa.png');
  game.preload('imagens/level1/iPad-icon-preto-scorpion2.png'); 
  game.preload('imagens/level1/armadilha.png');
  game.preload('imagens/level1/iPad-icon-preto.png');           // Chico
  game.preload('imagens/level1/barrilMarrom.png');        			
  game.preload('imagens/level1/barrilExplodindoFrames.png');   
  game.preload('imagens/level1/poço.png');  
  
  //Level 2
  game.preload('imagens/level2/labyrinth.gif');
  game.preload('imagens/level2/heart.png');
  game.preload('imagens/level2/heartPickup.png');
  game.preload('imagens/level2/scorpion.png');
  game.preload('imagens/level2/Selector.png');
  
  //Level 3
  game.preload('imagens/level3/background.jpeg');
  game.preload('imagens/level3/notebook.png');
  game.preload('imagens/level3/notebookMaior.png');
  
  //final
  game.preload('imagens/final/terra.png'); //Fernando Final
  game.preload('imagens/final/mascara.png');//Fernando Final
  game.preload('imagens/final/carinha.png');//Fernando Final
  game.preload('imagens/final/floresta.png');//Fernando Final
  game.preload('imagens/final/fogo.png');//Fernando Final
  game.preload('imagens/final/raio.png');//Fernando Final
  game.preload('imagens/final/parabens.png');//Fernando Final
  
  //Outros
  game.preload('imagens/Mascara.png');
  game.preload('imagens/MascaraMaior.png');
  game.preload('imagens/transition.png');
  game.preload('imagens/sight.png');  

  // executará o código abaixo logo que a imagem tenha sido carregada
  game.onload = function ()
  {    
    /********************************************************************************************/
	//Configurar parâmetros para outras classes
	
	var stageSize = new Sprite(800, 600);
	stageSize._width = 800;
    stageSize._height = 250;
	stageSize.x = 0;
    stageSize.y = 350;
	
	setGameVar(game);
	setPlayerGameVar(game, stageSize);
	
	game.changeStages('menu');
	
	/********************************************************************************************/
   };   
  
  game.changeStages = function changeStages(changeTo){
	  /********************************************************************************************/
	  //Criação de Cenas
		var startMenu = new Scene();    //Menu de Início
		var intro = new Scene(); 		//Introdução
		var gameOver = new Scene();
		var level1_1 = new Scene();     //Constelações no deserto à noite
		var level1_2 = new Scene();     //Primeiro labirinto
		var level1_3 = new Scene();     //Primeiro Encontrar Objeto
		var finalJogo = new Scene(); 	//Final
	  /********************************************************************************************/
		
		console.log('Changing Scenes!');
		game.popScene();
		switch(changeTo){
			case 'menu':
				game.currentScene = startMenu;
				setMenu(game, startMenu);
				game.pushScene(startMenu);
				break;   
			case 'gameover':
				game.currentScene = gameOver;
                setGameOver(game, gameOver);
                game.pushScene(gameOver);
                break; 			
			case 'intro':
				game.currentScene = intro;
				setIntro(game, intro);
				game.pushScene(intro);
				break; 
			case 'level1':	
				game.currentScene = level1_1;			
				setLevel11GameVar(game, level1_1);
				game.pushScene(level1_1);
				break;  
			case 'level2':	
				game.currentScene = level1_2;
				setLevel12GameVar(game, level1_2); 
				game.pushScene(level1_2);
				break;  
			case 'level3':
				game.currentScene = level1_3;
				setLevel13GameVar(game,level1_3);
				game.pushScene(level1_3);
				break;  
			case 'final':
				game.currentScene = finalJogo;
				setFinal(game, finalJogo);
				game.pushScene(finalJogo);
				break;
		}		
   };
   
   /********************************************************************************************/
   //Configuração das telas de transição
   game.fadeTime = 600;  
   game.setTransition = function setTransition(scene, InOut){
		var transition_img = new enchant.Sprite(game.width, game.height);
		transition_img.tl.setTimeBased();
		transition_img.image = game.assets['imagens/transition.png'];
		
		if(InOut == 'In')
			transition_img.opacity = 0;	
			
		scene.addChild(transition_img);
		
		return transition_img;
	}
	
   /********************************************************************************************/
   //Objeto de mensagem ao jogador padronizado
   game.showMessage = function showMessage(inScene, textString){
		var completeLabel = new Group();

		var bgText = new Sprite(700,100);
		bgText.image = game.assets['imagens/bgs/bg_text.png'];
		bgText.x=50;
		bgText.y= game.height-bgText.height;
		bgText.tl.setTimeBased();
		bgText.opacity=0.8;
		completeLabel.addChild(bgText);
	
		var newLabel = new Label("");		
		newLabel.text = textString;
		newLabel.font  = "14px monospace";
		newLabel.color = "grey";
		newLabel.x = 130;
		newLabel.y = game.height-bgText.height+20;
		newLabel.width = game.width;
		newLabel.opacity = 0;
		newLabel.tl.setTimeBased();	
		completeLabel.addChild(newLabel);
		
		newLabel.addEventListener('enterframe', function() {
			if(newLabel.age >= 6*game.fps){
				newLabel.clearEventListener('enterframe');
				newLabel.tl.fadeOut(game.fadeTime).then(function(){inScene.removeChild(newLabel)});	
				bgText.tl.fadeOut(game.fadeTime).then(function(){inScene.removeChild(bgText)});						
			}
		});
		newLabel.tl.delay(game.fadeTime).fadeIn(game.fadeTime);
		
		return completeLabel;
	}
	
	/********************************************************************************************/
   //Update da HUD
   game.chaves = [];
   game.updateKeys = function updateKeys(number,toScene){
		var keysCollected = number;
		var keyHUDOffset = 25;
		
		if(game.keysLabel!=null)
			toScene.removeChild(game.keysLabel);
			
		game.keysLabel = new Label("Chaves: x"+keysCollected);
		game.keysLabel.color = "lightgreen";
		game.keysLabel.x = game.width - game.keysLabel.width/4.5;
		game.keysLabel.y = 5;
		toScene.addChild(game.keysLabel);
		
		if(number>game.chaves.length){		//Adiciona
			while(number>0){			
				game.chavesSprite = new Sprite(24,22);  
				game.chavesSprite.image = game.assets['imagens/level1/chaves2.png'];
				game.chavesSprite.x =   game.width - game.chavesSprite.width - keyHUDOffset*(number-1);
				game.chavesSprite.y =  game.chavesSprite.height;
				toScene.addChild(game.chavesSprite);	
					
				game.chaves[number-1] = game.chavesSprite;
				number--;
			}
		} else {						//Remove
			if(game.chaves.length!=0){
				while(game.chaves.length>number){
					toScene.removeChild(game.chaves[game.chaves.length-1]);
					game.chaves.splice(game.chaves.length-1,1);
				}
			}
		}
		
		return keysCollected;
   }
   
   /********************************************************************************************/
   
   game.soundOn = true;
   if(window.screen.width >= 500)
	game.mobile = false;
   else
	game.mobile = true;
   game.personagem = [];   
   
   game.start();     
};
