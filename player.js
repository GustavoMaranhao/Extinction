var game;
var mapMinWidth = 0;
var mapMaxWidth = 0;
var mapMinHeight = 0;
var mapMaxHeight = 0;

var labyrinth;
var wallTile = 8;

var skillAnimal;

var img_char;
var img_venom;
var img_explosion;

function setPlayerGameVar(game, area){
    this.game = game;
    
    setWalkableArea(area);
    
    img_char = game.assets['imagens/player/chara0.png'];
	img_venom = game.assets['imagens/player/shot2.png'];
	img_explosion = game.assets['imagens/player/explosion2.png'];
}

function setLabyrinth(lab){
    this.labyrinth = lab;
}

function setWalkableArea(area){
    this.mapMinWidth = area._x;
    this.mapMaxWidth = this.mapMinWidth + area._width - 10;
    this.mapMinHeight = area._y + 10;
    this.mapMaxHeight = this.mapMinHeight + area._height - 20;  
}

function createPlayer(createX, createY){
    var player = new Sprite(32, 32);
    player.x = createX;
    player.y = createY;
	var image = new Surface(96, 128);
    image.draw(img_char, 0, 0, 96, 128, 0, 0, 96, 128);
    player.image = image;
	
	if(game.soundOn){
		if(labyrinth!=null){
			player_walking_sound = game.assets['sons/randomico/player-andando-labirinto.mp3']; // Chico
			player_walking_sound.play();
			player_walking_sound.volume = 0.2;                                             // Chico
		} else {
			player_walking_sound = game.assets['sons/randomico/passos-na-areia.mp3']; 	       // Chico
			player_walking_sound.play();
			player_walking_sound.volume = 0.8;                                                 // Chico
		} 
	}

    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
        
    player.addEventListener('enterframe', function() {  	
        this.frame = this.direction * 3 + this.walk;
		
	    // var distanciaEmY = mapMaxHeight - this.y - 26;
		// console.log(		"Dist - "+distanciaEmY + "escala = "+((161-distanciaEmY)/160));
        // this.scale((161-distanciaEmY)/160);

        if (this.isMoving) {
			if(game.soundOn && player_walking_sound.currentTime >= player_walking_sound.duration)
				player_walking_sound.play();
			
            this.moveBy(this.vx, this.vy);

            if (!(game.frame % 3)) {
                this.walk++;
                this.walk %= 3;
            }
            if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                this.isMoving = false;
                this.walk = 1;
            }
        } else {            
            this.vx = this.vy = 0;
            if (game.input.left) {
                this.direction = 1;
                this.vx = -4;
            } else if (game.input.right) {
                this.direction = 2;
                this.vx = 4;
            } else if (game.input.up) {
                this.direction = 3;
                this.vy = -4;
            } else if (game.input.down) {
                this.direction = 0;
                this.vy = 4;
            }
            if (this.vx || this.vy) {
                var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
               if (x >= mapMinWidth && x < mapMaxWidth && y >= mapMinHeight && y < mapMaxHeight)
                    if(labyrinth==null){
                        this.isMoving = true;
                        arguments.callee.call(this);
                    } else {
                        if(!labyrinth.hitTest(x, y)){
                            this.isMoving = true;
                            arguments.callee.call(this);
                        }
                    }
            }
        }
     });
	 	 
	 game.currentScene.addEventListener(Event.A_BUTTON_UP, function(e) {	
		switch(skillAnimal){
			case 'scorpion':
				console.log('Used Scorpion');
				shootVenom(player);
			break;
			case 'outro':
				console.log('Used Outro');
			break;
		}
	 });
	 
	 game.currentScene.addEventListener(Event.B_BUTTON_UP, function() {	
		if(animal_selected<total_animals)
			animal_selected++;
		else
			animal_selected = 0;
			
		skillAnimal = animals[animal_selected];
	 });
	 
	 player.life = 1;
	 player.invulnerable = false;
	 player.alive = true;
	 player.hitByShot = false;
        
    return player;
}

var shooting = false;
function shootVenom(player){
console.log(shooting);
	if(shooting)
		return;
		
	var shot = new Sprite(16, 32);
	var shot_dir;
	var charOffset = 16;
	shot.image = img_venom;
	switch(player.frame){
		case 1:			//Virado para baixo
			shot.x = player.x + charOffset/2;
			shot.y = player.y + charOffset*2;
			shot.rotate(180);
			shot.checkSpotX = shot.width/2;
			shot.checkSpotY = shot.height;
			shot.shot_dir = 0;
		break;
		case 4:			//Virado para a esquerda
			shot.x = player.x - charOffset/2;
			shot.y = player.y + charOffset/2;
			shot.rotate(-90);
			shot.checkSpotX = -shot.height/2 + charOffset/2;
			shot.checkSpotY = shot.width/2;
			shot.shot_dir = 1;
		break;
		case 7:			//Virado para a direita
			shot.x = player.x + charOffset*2;
			shot.y = player.y + charOffset/2;
			shot.rotate(90);
			shot.checkSpotX = shot.height/2 + charOffset/2;
			shot.checkSpotY = shot.width/2;
			shot.shot_dir = 2;
		break;
		case 10:			//Virado para cima
			shot.x = player.x + charOffset/2;
			shot.y = player.y - charOffset/2;
			shot.rotate(0);
			shot.checkSpotX = shot.width/2;
			shot.checkSpotY = -shot.height/2 + charOffset;
			shot.shot_dir = 3;
		break;
	}   
	
	shot.addEventListener('enterframe', function(e) { 	
		if(this.age>=50)
			shooting = false;
		var checkSpotX = e.target.checkSpotX + e.target.x;
		var checkSpotY = e.target.checkSpotY + e.target.y;
		var shotSpeed = 5;
		
		if(this.x == 0 && this.y==0){
			shooting = false;
			this.parentNode.removeChild(this);
		}
		
		for(var i=0;i<enemies.length;i++){
			if(this.intersect(enemies[i].childNodes[1])){
				enemies[i].clearEventListener('enterframe');
				
				var timer = new Entity;
				enemies[i].addChild(timer);
				timer.addEventListener('enterframe', function(){
					if(this.age>=20){		
						console.log(i);
						this.parentNode.parentNode.removeChild(this.parentNode);
						enemies.splice(i-1,1);
						this.clearEventListener('enterframe');
					}
					
					if(this.parentNode.childNodes[1].visible)
						this.parentNode.childNodes[1].visible = false;
					else
						this.parentNode.childNodes[1].visible = true;
				});				
			}
		}
		
		if(labyrinth.checkTile(checkSpotX, checkSpotY)!=wallTile){
			switch(e.target.shot_dir){
				case 0:
					e.target.y += shotSpeed;
				break;
				case 1:
					e.target.x -= shotSpeed;
				break;
				case 2:
					e.target.x += shotSpeed;
				break;
				case 3:
					e.target.y -= shotSpeed;
				break;
			}
			
			
		} else {
			var explosion = new Sprite(16, 32);
			explosion.image = img_explosion;
			switch(e.target.shot_dir){
				case 0:
					explosion.rotate(180);
				break;
				case 1:
					explosion.rotate(-90);
				break;
				case 2:
					explosion.rotate(90);
				break;
				case 3:
					explosion.rotate(0);
				break;
			}
			shooting = false;
			explosion.x = e.target.x;
			explosion.y = e.target.y;
			explosion.addEventListener('enterframe', function(e){
				if(e.target.age>=100)
					e.target.opacity -= 0.01;
					
				if(e.target.opacity<=0){
					e.target.clearEventListener('enterframe');
					game.currentScene.removeChild(e.target);
				}
			});
			game.currentScene.insertBefore(explosion,mask);
			e.target.clearEventListener('enterframe');
			game.currentScene.removeChild(e.target);	
		}
	});	
	
	shooting = true;	
	game.currentScene.insertBefore(shot,mask);
}