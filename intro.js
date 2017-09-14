var game;
var scene;

function setIntro(gameI, sceneI){

    this.game = gameI;
    this.scene = sceneI;
	
	setScene(sceneI);
	
	CriarIntro();
	
	transition_img = game.setTransition(scene, 'Out');
	transition_img.tl.fadeOut(game.fadeTime/2).then(function(){scene.removeChild(transition_img)});
}

function CriarIntro(){

	/********************************************************************************************/
	//Carregamento de assets
	
	var fundo_img = game.assets['imagens/intro/fundo.png'];
	var fogo_img = game.assets['imagens/intro/Fogo.png'];
	var nuclear_img = game.assets['imagens/intro/nuclear.png'];
	var mascara_img = game.assets['imagens/intro/mascara.png'];
	
	var intro_sound = game.assets['sons/musicas/Intro.mp3'];
	
	var Fundo = new Sprite(fundo_img.width, fundo_img.height);
	Fundo.image = fundo_img;
	Fundo.frame = 0;
	Fundo.x = 0;
	Fundo.y = 0;
	
	var mascara = new Sprite(mascara_img.width, mascara_img.height);
	mascara.image = mascara_img;
	mascara.frame = 0;
	mascara.x = 0;
	mascara.y = 0;
	mascara.opacity = 0.3;
	mascara.visible=false;
	
	//Bolas de Fogo
	
	var bolaF1 = new Sprite(100, 100);
	bolaF1.image = fogo_img;
	bolaF1.frame = 0;
	bolaF1.scale(0.1,0.1);
			 
	bolaF1.visible=false;
	
	var bolaF2 = new Sprite(100, 100);
	bolaF2.image = fogo_img;
	bolaF2.frame = 0;
	bolaF2.scale(0.1,0.1);
			 
	bolaF2.visible=false;
	
	var bolaF3 = new Sprite(100, 100);
	bolaF3.image = fogo_img;
	bolaF3.frame = 0;
	bolaF3.scale(0.1,0.1);
			 
	bolaF3.visible=false;
	
	var bolaF4 = new Sprite(100, 100);
	bolaF4.image = fogo_img;
	bolaF4.frame = 0;
	bolaF4.scale(0.1,0.1);	
			 
	bolaF4.visible=false;
	
	var bolaF5 = new Sprite(100, 100);
	bolaF5.image = fogo_img;
	bolaF5.frame = 0;
	bolaF5.scale(0.1,0.1);
			 
	bolaF5.visible=false;
	

	var nuclearE = new Sprite(1000, 1000);
	nuclearE.image = nuclear_img;
	nuclearE.frame = 0;
	nuclearE.x = 0;
	nuclearE.y = 0;
	nuclearE.visible=false;
	
	scene.addChild(Fundo);
	
	scene.addChild(bolaF1);
	scene.addChild(bolaF2);
	scene.addChild(bolaF3);
	scene.addChild(bolaF4);
	scene.addChild(bolaF5);
	
	scene.addChild(mascara);
	scene.addChild(nuclearE);
	
	//Configuração inicial da HUD
	
	if(game.soundOn){
		//scene.bgmI = intro_sound;
		intro_sound.play(); 
		intro_sound.volume = 0;					
	}
	
	
	var elapsedTime;
	var teste = true;
	var contador = 0;
	
	var victoryLabel;
	var victoryText = new String('');
	
	victoryText = victoryText + '  Em uma época não muito distante, a Nasa descobre um artefato<br>'
	victoryText = victoryText + '  no solo de Marte capaz de captar os poderes das constelações.<br>'
	victoryLabel = game.showMessage(scene, victoryText);
	
	var time = 0;
	
	scene.addEventListener('enterframe', function() {
		
		time = time+1;
		
		//explosoes
		if(time%(30*3)==0){
			 
			 bolaF1.y = (Math.floor(Math.random()*180)+320);
			 bolaF1.x = (Math.floor(Math.random()*800)-50);
			 
			 bolaF1.scale(0.1,0.1);
			 bolaF1.visible=true;
			 
			 bolaF1.tl.fadeIn(45).scaleTo(0.25,60).fadeOut(45);
		
		}
		
		if(time%(30*5)==0){
			 
			 bolaF2.y = (Math.floor(Math.random()*180)+320);
			 bolaF2.x = (Math.floor(Math.random()*800)-50);
			 
			 bolaF2.scale(0.1,0.1);
			 bolaF2.visible=true;
			 
			 bolaF2.tl.fadeIn(45).scaleTo(0.25,60).fadeOut(45);
		
		}
		
		if(time%(30*7)==0){
			 
			 bolaF3.y = (Math.floor(Math.random()*180)+320);
			 bolaF3.x = (Math.floor(Math.random()*800)-50);
			 
			 bolaF3.scale(0.1,0.1);
			 bolaF3.visible=true;
			 
			 bolaF3.tl.fadeIn(45).scaleTo(0.25,60).fadeOut(45);
		
		}
		
		if(time%(30*11)==0){
			 
			 bolaF4.y = (Math.floor(Math.random()*180)+320);
			 bolaF4.x = (Math.floor(Math.random()*800)-50);
			 
			 bolaF4.scale(0.1,0.1);
			 bolaF4.visible=true;
			 
			 bolaF4.tl.fadeIn(45).scaleTo(0.25,60).fadeOut(45);
		
		}
		
		if(time%(30*13)==0){
			 
			 bolaF5.y = (Math.floor(Math.random()*320)+180);
			 bolaF5.x = (Math.floor(Math.random()*800)-50);
			 
			 bolaF5.scale(0.1,0.1);
			 bolaF5.visible=true;
			 
			 bolaF5.tl.fadeIn(45).scaleTo(0.25,60).fadeOut(45);
		
		}
		
		
		//Nuclear
		
		if(time==(30*10)){
			nuclearE.visible=true;
			nuclearE.opacity=0;
			nuclearE.tl.fadeIn(120).wait(30).fadeOut(120);
		}
		
		if(time==(30*(10+4))){
			mascara.visible=true;
			
		}
		
		//Texto		
		
		if(time==(30*6)){
			
			var victoryLabel1;
			var victoryText1 = new String('');
			victoryText1 = victoryText1 + '  A humanidade passa por um período de crise devido à<br>';
			victoryText1 = victoryText1 + '  escassez de recursos. A crise se agrava gerando uma<br>';
			victoryText1 = victoryText1 + '  guerra de proporções mundiais.';
			victoryLabel1 = game.showMessage(scene, victoryText1);
			scene.addChild(victoryLabel1);
		}
		
		if(time==(30*16)){
			
			var victoryLabel2;
			var victoryText2 = new String('');
			victoryText2 = victoryText2 + '  Após vários anos de guerra, a humanidade beira a extinção;<br>';
			victoryText2 = victoryText2 + '  milhões pereceram devido à guerra e à falta de recursos.<br>';
			victoryText2 = victoryText2 + '  Grupos de sobreviventes são formados e lutam entre si.<br>';
			victoryLabel2 = game.showMessage(scene, victoryText2);
			scene.addChild(victoryLabel2);
		}
		
		if(time==(30*22)){
			
			var victoryLabel3;
			var victoryText3 = new String('');
			victoryText3 = victoryText3 + '  Um grupo extremista chamado Extinction se apossou do artefato<br>';
			victoryText3 = victoryText3 + '  e, com seus poderes, está eliminando outros sobreviventes<br>';
			victoryText3 = victoryText3 + '  para obter seus recursos e por diversão.<br>';
			victoryLabel3 = game.showMessage(scene, victoryText3);
			scene.addChild(victoryLabel3);
		}
		
		if(time==(30*28)){
			
			var victoryLabel4;
			var victoryText4 = new String('');
			victoryText4 = victoryText4 + '  Você, um ex-cientista do Extinction, conseguiu escapar após<br>'
			victoryText4 = victoryText4 + '  um confronto de um grupo rival, e que sabe a importância do<br>'
			victoryText4 = victoryText4 + '  artefato nos planos de extermínio da Humanidade.<br>'
			victoryLabel4 = game.showMessage(scene, victoryText4);
			scene.addChild(victoryLabel4);
		}
		
		if(time==(30*34)){
			
			var victoryLabel5;
			var victoryText5 = new String('');
			victoryText5 = victoryText5 + '   Só você será capaz de impedir a extinção da espécie Humana.<br>'
			victoryLabel5 = game.showMessage(scene, victoryText5);
			scene.addChild(victoryLabel5);
		}
		
		if(time>=(30*36)){
			transition_img = game.setTransition(scene, 'In');
			transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
				game.changeStages('level1');
			});
		}
		
		
		//Volume da música
		if(game.soundOn){
			if(time<(30*30) && intro_sound.volume<0.6)
				intro_sound.volume += 0.005;		
		
			if(time>=(30*32)){
				if(intro_sound.volume>=0.1)
					intro_sound.volume -= 0.005;				
				if(intro_sound.volume<0.1)
					intro_sound.stop(); 
			}
			
		}
		
		
		
	});
	
	
	scene.addChild(victoryLabel);
	
	
	
	scene.addEventListener('touchstart', function() {	
		intro_sound.stop(); 
		transition_img = game.setTransition(scene, 'In');
		transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
			game.changeStages('level1');			           
		});
    });	
	
	
	
}
	
	
    
    
    
    
 


