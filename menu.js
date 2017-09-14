var game;
var cena;

function setMenu(game1, scene){
    this.game = game1;
    this.cena = scene;       
    
	setScene(scene);
    CriarMenu();
}

function CriarMenu(){
	/********************************************************************************************/
	//Carregamento de assets
	
	menu_img = game.assets['imagens/menu/Menu.png'];
	titulo_img = game.assets['imagens/menu/Titulo.png'];
	
	novoJogo_img = game.assets['imagens/menu/NovoJogo.png'];
	continuar_img = game.assets['imagens/menu/Continuar2.png'];
	
	estrelaC_img = game.assets['imagens/menu/estrelacadente.png'];
	estrelaN_img = game.assets['imagens/menu/estrela.png'];
	
	somLigado_img = game.assets['imagens/menu/SomLigado.png'];
	somDesligado_img = game.assets['imagens/menu/SomDesligado.png'];
	
	VMobile_img = game.assets['imagens/menu/VersaoMobile.png'];
	VDesktop_img = game.assets['imagens/menu/VersaoDesktop.png'];
	
	menu_sound = game.assets['sons/musicas/Menu.mp3'];
	confirmar_sound = game.assets['sons/randomico/Confirmar.wav'];
	error_sound = game.assets['sons/randomico/erro.mp3'];
	
	/********************************************************************************************/	
	//criação do sprite do céu
	var Menu = new Sprite(800, 600);
	Menu.image = menu_img;
	Menu.frame = 0;
	Menu.x = 0;
	Menu.y = 0;	
		
	var estrelaC = new Sprite(298, 184);	
	estrelaC.image = estrelaC_img;
	estrelaC.frame = 0;
	estrelaC.x = -400;
	estrelaC.y = -284;
		
	var estrelaN = new Sprite(50, 50);	
	estrelaN.image = estrelaN_img;
	estrelaN.frame = 0;
	estrelaN.x = 520;
	estrelaN.y = 0;
		
	var Titulo = new Sprite(273, 57);
	Titulo.image = titulo_img;
	Titulo.frame = 0;
	Titulo.x = game.width/2 - Titulo.width/2;
	Titulo.y = 0;
		
	var NovoJogo = new Sprite(230, 57);
	NovoJogo.image = novoJogo_img;
	NovoJogo.frame = 0;
	NovoJogo.x = game.width/2 - 0.9*NovoJogo.width/2;
	NovoJogo.y = 200;
	NovoJogo.scale(0.85,0.85);
	
	var soundControl = new Sprite(213,29);
	soundControl.image = somLigado_img;
	soundControl.x = game.width - 1.1*soundControl.width/1.3;
	soundControl.y = game.height - soundControl.height;
	soundControl.scale(0.65,0.65);
	
	var versao = new Sprite(213,29);
	if(game.mobile)
		versao.image = VMobile_img;
	else
		versao.image = VDesktop_img;
	versao.x = game.width - 1.1*VDesktop_img.width/1.3;
	versao.y = game.height - soundControl.height - VDesktop_img.height;
	versao.scale(0.65,0.65);
		
	var Continuar = new Sprite(230, 57);		
	//if(CookieSetado){
		//Continuar.image = game.assets['imagens/menu/Continuar.png'];
	//}else{
		Continuar.image = continuar_img;
	//}				
	Continuar.frame = 0;
	Continuar.x = game.width/2 - 0.9*Continuar.width/2;
	Continuar.y = 257;
	Continuar.scale(0.85,0.85);	
		 
	cena.addChild(Menu);
	cena.addChild(estrelaC);
	cena.addChild(estrelaN);
	cena.addChild(Titulo);
	cena.addChild(NovoJogo);
	cena.addChild(Continuar);
	cena.addChild(soundControl);
	cena.addChild(versao);
	
	// Background music
	if(game.soundOn){
		cena.bgm = menu_sound;
		cena.bgm.play();
		cena.bgm.volume = 1;		 		
	} else {
		cena.bgm = menu_sound;
		cena.bgm.play(); 
		cena.bgm.volume = 0;		
		soundControl.image = somDesligado_img;
	}
		
	var continua = true;
	var movimento = 0;
	var esta = false;
	
	estrelaN.tl.setTimeBased();
		
	cena.addEventListener('enterframe', function() {
		if (game.soundOn && cena.bgm.currentTime >= this.bgm.duration){
			cena.bgm.play();
		}
			
		if(esta==false){
			estrelaN.tl.fadeOut(1000);
			esta = true;
		}else{
			if(1==Math.floor(Math.random()*50)){
				estrelaN.y = Math.floor(Math.random()*300);
				estrelaN.x = Math.floor(Math.random()*750);
				estrelaN.tl.fadeIn(1000);
				esta =false;
			}				
		}
			
		estrelaC.y = estrelaC.y+10;
		estrelaC.x = estrelaC.x+30;
			
		var num = Math.floor(Math.random()*1000)*1000;
		if(num<estrelaC.x){
			estrelaC.x = -400;
			estrelaC.y = -284;
		}
		
		if(continua){				
			movimento = movimento +1;
			Titulo.y += 1.2;
				
			if(movimento>80){
				continua = false;		
			}
		}
	});
	
	NovoJogo.addEventListener('touchstart', function() {	
		if(game.soundOn){
			cena.bgm = menu_sound;
			cena.bgm.stop();
			cena.bgmN = confirmar_sound;
			cena.bgmN.play();
		}
		transition_img = game.setTransition(scene, 'In');
		transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
			game.changeStages('intro');	
		});
    });
		
	// Continuar.addEventListener('touchstart', function() {
		// if(game.soundOn){
			// cena.bgmC = error_sound;
			// cena.bgmC.play();
		// }
		// game.changeStages('gameover');	
    // });
	
	soundControl.addEventListener('touchend', function(){
		if(this.image == somDesligado_img){
			this.image = somLigado_img;
			game.soundOn = true;
			cena.bgm.volume = 1;
		} else {
			this.image = somDesligado_img;
			game.soundOn = false;
			cena.bgm.volume = 0;
		}
	});
	
	versao.addEventListener('touchend', function(){
		if(this.image == VDesktop_img){
			this.image = VMobile_img;
			game.mobile = true;
		} else {
			this.image = VDesktop_img;
			game.mobile = false;
		}
	});
	
}
   

    
    
    
    
    
 


