var game;
var scene3;

function setLevel13GameVar(game, scene){
    this.game = game;
    this.scene3 = scene; 
	this.changingScene = false;
	
	configScene3();
	
	transition_img = game.setTransition(scene, 'Out');
	transition_img.tl.fadeOut(game.fadeTime/2).then(function(){scene.removeChild(transition_img)});
	
	labyrinth = null;
}

function configScene3(){
	/********************************************************************************************/
    // Assets da fase

    var img_backGround = game.assets['imagens/level3/background.jpeg'];
	var img_note = game.assets['imagens/level3/notebook.png'];
	var img_noteMaior = game.assets['imagens/level3/notebookMaior.png'];
	
	var fase3_sound = game.assets['sons/musicas/Fase3.mp3'];
	var sound_excl = game.assets['sons/randomico/WindowsPrintComplete.mp3'];
	
	/********************************************************************************************/
	//Criação dos itens de cena	
	
	var backGround = new Sprite(game.width, game.height);
	backGround.image = img_backGround;
	scene3.addChild(backGround);
	
	var notebook = new Sprite(img_note.width/2,img_note.height);
	notebook.image = img_note;
	notebook.x = 473;
	notebook.y = 285;
	notebook.addEventListener('touchend', function(e){	
		if(game.soundOn)
			sound_excl.play();
		fase3_sound.stop();
		
		notebookAnim.addEventListener('enterframe', function(){				
			if(notebookAnim.scaleX>=2){
				scene3.removeChild(notebook);					
			} else {
				notebookAnim.scale(1.05,1.05);
				notebookAnim.x -= 2.1;
				if(notebookAnim.rotation<=30)
					notebookAnim.rotate(2);				
			}
			
			if(notebookAnim.age >= 100){
				notebookAnim.clearEventListener('enterframe');
				transition_img = game.setTransition(scene3, 'In');
				transition_img.tl.fadeIn(game.fadeTime/2).then(function(){
					game.changeStages('final');
				});
			}
		});
		
		scene3.addChild(notebookAnim);
		var endingText = new String("");
		endingText = endingText + '       Este caderno parece interessante, com certeza servirá.<br>'
		endingLabel = game.showMessage(scene3, endingText);
		scene3.addChild(endingLabel);
		scene3.removeChild(notebook);			
	});
	notebook.addEventListener('enterframe', function(){
		if(this.age>=30*game.fps){
			if(this.age % 10 <= 5)
				this.frame = 1;
			else
				this.frame = 0;
		}
	});
	scene3.addChild(notebook);
	
	var notebookAnim = new Sprite(img_noteMaior.width,img_noteMaior.height);
	notebookAnim.image = img_noteMaior;
	notebookAnim.x = notebook.x + img_note.width/4 - img_noteMaior.width/2;
	notebookAnim.y = notebook.y + img_note.height/2 - img_noteMaior.height/2;
	notebookAnim.scale(img_note.width/(2*img_noteMaior.width),img_note.height/img_noteMaior.height);
	
	/********************************************************************************************/
	//Música
	
	if(game.soundOn){
		fase3_sound.play();
		fase3_sound.volume = 0.1;		
	}
	
	scene3.addEventListener('enterframe', function(){
		if (game.soundOn && fase3_sound.currentTime >= fase3_sound.duration){
			fase3_sound.play();
		}
	});
	
	/********************************************************************************************/
	//Mensagem de introdução
	
	var welcomeText = new String("");
	welcomeText = welcomeText + '       Este deve ser o laboratório central. Deve haver algum caderno<br>'
	welcomeText = welcomeText + '   ou nota aqui que ajude a salvar estes pobres animais.<br>'
	welcomeLabel = game.showMessage(scene3, welcomeText);
	scene3.addChild(welcomeLabel);
	
	/********************************************************************************************/
}