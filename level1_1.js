var game;
var scene;

var bVictory = false;
var bHaveKeys = false;
var personagem;

var img_excl;
var img_hole;

var mapa;				// Chico
var iPadSobMapa;        // Chico 
var connectedLabel;

var sound_excl;
var hole_sound;

function setLevel11GameVar(game, scene){
    this.game = game;
    this.scene = scene;
    
    setScene(scene);
    configScene();
		
	transition_img = game.setTransition(scene, 'Out');
	transition_img.tl.fadeOut(game.fadeTime).then(function(){scene.removeChild(transition_img)});
}

function afastarPersonagem() {
	var timer = new Entity();
	timer.addEventListener('enterframe', function(){		
		if(this.age <= 2 && personagem.x > 0 && personagem.x < game.width && personagem.y > 203 && personagem.y < game.height)
			switch(personagem.direction){
				case 1: //Esquerda
					personagem.vx = 7;
					break;
				case 2:	//Direita
					personagem.vx = -7;
					break;
				case 3:	//Cima
					personagem.vy = 7;
					break;
				case 0:	//Baixo
					personagem.vy = -5;
					break;	
			}
		else{
			this.clearEventListener('enterframe');
		}
	});
	scene.addChild(timer);
}


var configScene = function configScene(){
    /********************************************************************************************/
    // Assets da fase   
    var img_ceu = game.assets['imagens/level1/ceuNoturno01.png'];
    var img_deserto = game.assets['imagens/level1/DesertoAnoitecendo02.png'];     
    var img_iPad_verde = game.assets['imagens/level1/iPad-icon-verde2.png'];     
    var img_chaves = game.assets['imagens/level1/chaves2.png'];
    var img_mapa = game.assets['imagens/level1/escorpiaoMapa.png'];
    var img_mapaAnim = game.assets['imagens/level1/iPad-icon-preto-scorpion2.png'];
	var img_iPad_preto = game.assets['imagens/level1/iPad-icon-preto.png'];
	var img_armadilha = game.assets['imagens/level1/armadilha.png'];
	var img_poco = game.assets['imagens/level1/poço.png'];
	var img_barril = game.assets['imagens/level1/barrilMarrom.png']; 
	var img_barril_explodindo = game.assets['imagens/level1/barrilExplodindoFrames.png'];
	img_excl = game.assets['imagens/player/exclamationMark.png'];
	img_hole = game.assets['imagens/player/hole.png'];
	
	var fase1_sound = game.assets['sons/musicas/Fase1.mp3'];
	sound_excl = game.assets['sons/randomico/WindowsPrintComplete.mp3'];
	hole_sound = game.assets['sons/randomico/terraAbrindo.mp3'];
	var trap_sound = game.assets['sons/randomico/crushing.mp3'];
	var barrel_sound = game.assets['sons/randomico/explosaoBarril.mp3'];
	var key_sound = game.assets['sons/randomico/keyPickup.mp3'];
    
    /********************************************************************************************/
    //Criação de itens estáticos
        
    //criação do sprite do céu
    var imagemCeu = new Sprite(800, 600);
    imagemCeu.image = img_ceu;
    imagemCeu.frame = 0;
    imagemCeu.x = 0;
    imagemCeu.y = 0;
    scene.addChild(imagemCeu);
    
    var imagemDeserto = new Sprite(800, 310);
    imagemDeserto.image = img_deserto;
    imagemDeserto.frame = 0;
    imagemDeserto.x = 0;
    imagemDeserto.y = 310;
    imagemDeserto.opacity = 1.0;        
    scene.addChild(imagemDeserto); 	
      
    /********************************************************************************************/
    //Criação dos itens de cena	 
	
	// personagem = createPlayer(0, 320);
    // scene.addChild(personagem);
	
	var iPad = new Sprite(13,13);  
    iPad.image = img_iPad_verde;
    iPad.frame = 0;
	iPad.x = 530;
    iPad.y = 380;
    iPad.opacity=1.0;
    scene.addChild(iPad);
	
	iPadSobMapa = new Sprite(215,193);
    iPadSobMapa.image = img_iPad_preto;
    iPadSobMapa.frame = 0;
    iPadSobMapa.opacity=0.6;
    
    var chaves = new Sprite(24,22);  
    chaves.image = img_chaves;
    chaves.frame = 0;
    //chaves.scale(0.05,0.05);
    chaves.x = 150;
    chaves.y = 420;
    chaves.opacity=1.0;
    scene.addChild(chaves);
	
	//////////////////////////////////////////////////////////////////////////////////////
	// 22/06 - Chico
	// removi os códigos da variável armadilha, criei armadilha1 e armadilha2
	// coloquei as armadilhas aqui para que o player passe sobre nao abaixo delas, mudei suas coordenadas
	var armadilha1 = new Sprite(56,72);  
    armadilha1.image = img_armadilha;
    armadilha1.frame = 0;
    armadilha1.x = 90;
    armadilha1.y = 385;
    armadilha1.opacity=1.0;
    scene.addChild(armadilha1);
    
	var armadilha2 = new Sprite(56,72);  
    armadilha2.image = img_armadilha;
    armadilha2.frame = 0;
    armadilha2.x = 177;
    armadilha2.y = 391;
    armadilha2.opacity=1.0;
    scene.addChild(armadilha2);
	personagem = createPlayer(0, 400);
    scene.addChild(personagem);
	
	var poco = new Sprite(27,50);  
    poco.image = img_poco;
    poco.frame = 0;
    poco.x = 770;
    poco.y = 310;
    poco.opacity=1.0;
    scene.insertBefore(poco,personagem);

	var barril1 = new Sprite(44,34);  
    barril1.image = img_barril;
    barril1.frame = 0;
    barril1.x = 330;
    barril1.y = 530;
    barril1.opacity=1.0;
    scene.addChild(barril1);
	
	var barril2  = new Sprite(64,128);  
    barril2.image = img_barril_explodindo;
    barril2.frame = 0;
    barril2.x = 450;
    barril2.y = 360;
    barril2.opacity=1.0;
    scene.addChild(barril2);
	//////////////////////////////////////////////////////////////////////////////////////

    
    /********************************************************************************************/
	//Criação das constelações
    
    var sagitarius = constellations();
    sagitarius = createConstellation('Sagittarius');    
    sagitarius.connected = CONSTELACOES.Sagittarius.ConnectedStars; 

    var scorpion = constellations();
    scorpion = createConstellation('Scorpion');  
    scorpion.connected = CONSTELACOES.Scorpion.ConnectedStars; 
    
    var miniscorpion = constellations();
    miniscorpion = createConstellation('MiniScorpion');
    connectConstelations(scorpion, miniscorpion); 
	
	var lupus = constellations();
	lupus = createConstellation('Lupus');
	lupus.connected = CONSTELACOES.Lupus.ConnectedStars;
    
	var centaurus = constellations();
	centaurus = createConstellation('Centaurus');
	centaurus.connected = CONSTELACOES.Centaurus.ConnectedStars;
	
	var crux = constellations();
	crux = createConstellation('Crux');
	crux.connected = CONSTELACOES.Crux.ConnectedStars;

    var correctConst = scorpion; 
    
    /********************************************************************************************/
    //Configuração inicial da HUD
    
	var keysCollected = game.updateKeys(0,scene);
	var keysLabel = game.keysLabel;
	
	welcomeText = new String("");
	welcomeText = welcomeText + '    Para continuar você terá que decifrar o enigma das constelações, <br>comece'
	welcomeText = welcomeText + '  procurando por pistas no solo arenoso.<br>'
	
	var welcomeLabel = game.showMessage(scene, welcomeText);	
	scene.addChild(welcomeLabel);
	
	if(game.mobile){
		var pad = new Pad();
		pad.x = 30;
		pad.y = 470;
		pad.scale(1.5,1.5);
		scene.addChild(pad);
	}
    
    /********************************************************************************************/
    //Coleta de itens
	
	var touchedBarrel = false;		// Chico ; tocar barril dispara animação de explosão
	var touchedTrap1 = false;
	var touchedTrap2 = false;
    
    var touchedPad = false;
    var touchedKeys = false;    
    var mapa = new Sprite(147,136);
    var cont = 0;
    var blinkSpeed = 9;
    var connectedStars = [];
    
	// Background music
	if(game.soundOn){
		scene.bgm = fase1_sound;
		scene.bgm.play();
		scene.bgm.volume = 0.1;		
	}
		
    scene.addEventListener('enterframe', function() {  
		if (game.soundOn && scene.bgm.currentTime >= this.bgm.duration){
			scene.bgm.play();
		}
			
        if(personagem.intersect(iPad)) {
            touchedPad = true;                       
        }
		
		if(personagem.within(barril1,24)) {           
			switch(personagem.direction){
				case 1: //Esquerda
					if(barril1.x > barril1.width/2 - 8)
						barril1.x -= 4;
					break;
				case 2:	//Direita
					if(barril1.x < (game.width - barril1.width - 8))
						barril1.x += 4;
					break;
				case 3:	//Cima	
					if(barril1.y > (330 + barril1.height + 8))
						barril1.y -= 4;
					break;
				case 0:	//Baixo
					if(barril1.y < (game.height - barril1.height - 8))
						barril1.y += 4;
					break;	
			}
        }
		
        if(personagem.within(barril2,24)) {
            touchedBarrel = true;
        }
        
        if(personagem.intersect(chaves)) {
			scene.removeChild(chaves);
			chaves = null;
            touchedKeys = true;
			bHaveKeys = true;
			touchedPad = false;
			if(bVictory) Victory();
			//Victory();			
        }
		
		if(personagem.within(armadilha1,16)) {
            touchedTrap1 = true;                
        }

        if(personagem.within(armadilha2,16)) {
            touchedTrap2 = true;                       
        }
		
		if(touchedTrap1){		
			if(armadilha1.frame == 0) {
				if(game.soundOn){
					trap_sound.play();
					trap_sound.volume = 0.2;					
				}
				afastarPersonagem();

			}
			if (armadilha1.age % 4 == 0) {	// tempo					
				armadilha1.frame++;
				if(armadilha1.frame > 12){   
					armadilha1.frame = 0;  // barril explodido espalhado no chão
					touchedTrap1 = false;
				}  
			}
        }

		if(touchedTrap2){		
			if(armadilha2.frame == 0) {
				if(game.soundOn){
					trap_sound.play();
					trap_sound.volume = 0.2;					
				}
				afastarPersonagem();

			}
			if (armadilha2.age % 4 == 0) {	// tempo					
				armadilha2.frame++;
				if(armadilha2.frame > 12){   
					armadilha2.frame = 0;  // barril explodido espalhado no chão
					touchedTrap2 = false;
				}  
			}
        }
		
		//////////////////////////////////////////////////////////////////////////////////////
		// 22/06 - Chico
		if(touchedBarrel){		
			if(barril2.frame == 0) {
				if(game.soundOn){
					barrel_sound.play();
					barrel_sound.volume = 0.1;					
				}
				var timer = new Entity();
				timer.addEventListener('enterframe', function(){
					if(this.age <= 2)
						switch(personagem.direction){
							case 1: //Esquerda
								personagem.vx = 7;
								break;
							case 2:	//Direita
								personagem.vx = -7;
								break;
							case 3:	//Cima
								personagem.vy = 7;
								break;
							case 4:	//Baixo
								personagem.vy = -7;
								break;	
						}
					else{
						this.clearEventListener('enterframe');
					}
				});
				scene.addChild(timer);
			}
			if (barril2.age % 4 == 0) {	// tempo					
				barril2.frame++;
				if(barril2.frame > 25){   
					barril2.frame = 25;  // barril explodido espalhado no chão
					touchedBarrel = false;
				}  
				var timer2 = new Entity();
				timer2.addEventListener('enterframe', function(){
					if(this.age>=200)
						barril2.opacity -= 0.01;
					if(barril2.opacity<=0){
						scene.removeChild(barril2);
						this.clearEventListener('enterframe');
					}
				});
				scene.addChild(timer2);
			}
        }
//////////////////////////////////////////////////////////////////////////////////////    
        
        if(touchedPad){		
            checkPad(true);
			iPad.width = 215;
			iPad.height = 213;
            iPad.image = img_mapaAnim;
			if(iPad.scaleX == 1){
				iPad.scale(0.07,0.07);
				iPad.x -= img_mapaAnim.width/2;
				iPad.y -= img_mapaAnim.height/2;
				iPad.opacity = 0.5;
			}
            iPad.scale(1.05,1.05);
			iPad.moveBy(3.5,2.4);
            // iPad.x += 1.8;
            // iPad.y += 1;
			//afastarPersonagem();
			if(iPad.scaleX >= 1 && iPad.opacity != 0){   
				var helpText = String('');
				helpText = helpText + '     Parece algum tipo de mapa estelar e estes controles devem<br>' // Chico
				helpText = helpText + '     responder a algo aqui por perto.<br>' 
				helpText = game.showMessage(scene, helpText);
				this.scene.insertBefore(helpText,pad);
		
				iPad.opacity = 0;	
				
                mapa.image = img_mapa;
                mapa.x = iPad.x - mapa.width/2 + img_mapaAnim.width/2;
                mapa.y = iPad.y - mapa.height/2 + img_mapaAnim.height/2;
                mapa.frame = 0;
                mapa.opacity=0.5;
				
				iPadSobMapa.x = mapa.x - 35;
				iPadSobMapa.y = mapa.y - 30;
				this.scene.insertBefore(iPadSobMapa,personagem);
				
                this.scene.insertBefore(mapa,personagem);
                this.scene.removeChild(iPad);
								
				connectedLabel = new Label();
				connectedLabel.color = 'lightGreen';
				connectedLabel.text = 'Estrelas Conectadas: '+connectedStars.length+'/'+correctConst.connected;
				connectedLabel.x = iPad.x - mapa.width/2 + img_mapaAnim.width/2;
                connectedLabel.y = iPad.y - 5;
				this.scene.addChild(connectedLabel);
				
                touchedPad = false;
            }  
        }
        
        if(touchedKeys){
			if(game.soundOn)
				key_sound.play();
			
            keysCollected++;
			keysCollected = game.updateKeys(1,scene);
			keysLabel = game.keysLabel;         
            touchedKeys = false;
        }
               
        for(var i=0; i<sagitarius.length; i++){   
            cont++;      
            if(sagitarius[i].clicked){
                if((cont % blinkSpeed) == 1)
                    if(sagitarius[i].frame == 0){
                        sagitarius[i].frame = 1;
                        cont = 0;
                    }
                    else
                        sagitarius[i].frame = 0;             
            }
            else 
                sagitarius[i].frame = 0;
                
            if(correctConst != sagitarius)
                continue;    
            
            if(sagitarius[i].ligado && connectedStars.indexOf(sagitarius[i]) == -1){                
                connectedStars.push(sagitarius[i]);                                              
                if(connectedStars.length==correctConst.connected){
                    touchedPad = false;
					Victory();  					
				}
            }   
        }
        
        for(var i=0; i<scorpion.length; i++){
            cont++;
            if(scorpion[i].clicked){ 
                if((cont % blinkSpeed) == 1)
                    if(scorpion[i].frame == 0){
                        scorpion[i].frame = 1;
                        cont = 0;
                    }
                    else
                        scorpion[i].frame = 0;
             }
            else 
                scorpion[i].frame = 0;  
                
            if(correctConst != scorpion)
                continue; 
                
            if(scorpion[i].ligado && connectedStars.indexOf(scorpion[i]) == -1){                
                connectedStars.push(scorpion[i]);              
				connectedLabel.text = 'Estrelas Conectadas: '+connectedStars.length+'/'+correctConst.connected;
                if(connectedStars.length==correctConst.connected){
                    touchedPad = false;
					Victory(); 
				}
            }   
        }
    });
    /********************************************************************************************/  
}

function Victory(){
    console.log("Victory!");
	bVictory = true;
	console.log(bHaveKeys);
	
	var victoryLabel;
	var victoryText = new String('');
	
	if(bHaveKeys){
		personagem.clearEventListener('enterframe');
		
		if(game.soundOn){
			scene.bgm.stop();	
			hole_sound.play();			
			hole_sound.volume = 0.5;			
		}
		
		var exclamation = new Sprite(14, 21);
		exclamation.x = personagem.x + personagem.width/4;
		exclamation.y = personagem.y - personagem.height/4;
		exclamation.image = img_excl;
		exclamation.opacity = 1;
		scene.addChild(exclamation);
		if(game.soundOn)
			sound_excl.play();
		
		var hole = new Sprite(18, 12);
		hole.x = personagem.x + personagem.width/4 - 1;
		hole.y = personagem.y + personagem.height;
		hole.image = img_hole;
		hole.opacity = 1;
		hole.scale(1.1,1.1)
		scene.addChild(hole);
		
		victoryText = victoryText + '        Muito Bem! A terra sob seus pés começa a tremer e um<br>'
		victoryText = victoryText + '    buraco se abre levando-o a uma sala escura!<br>'
		victoryLabel = game.showMessage(scene, victoryText);

		bVictory = false;		
		
		var previousRandom = 0;
		var randomN = 0;
		victoryLabel.addEventListener('enterframe', function() {			
			randomN =Math.random() - 0.5;
			scene.x += previousRandom;
			scene.y += previousRandom;
			previousRandom = -randomN;
			if(victoryLabel.age >= 4*game.fps){	
				victoryLabel.clearEventListener('enterframe');			
				personagem.moveBy(0, 4);
				transition_img = game.setTransition(scene, 'In');
				transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
					victoryLabel.clearEventListener('enterframe');
					scene.removeChild(victoryLabel);
					scene.removeChild(exclamation);
					scene.removeChild(hole);
					game.changeStages('level2');
				});
			}
		
	});
	} else {
		victoryText = victoryText + '        Parece que ainda há alguma coisa a ser encontrada nesta área.<br>'
		victoryText = victoryText + '    É melhor voltar e procurar.<br>'
		victoryLabel = game.showMessage(scene, victoryText);	
	}
	
	scene.addChild(victoryLabel);
	//victoryLabel.tl.fadeIn(game.fadeTime);
}