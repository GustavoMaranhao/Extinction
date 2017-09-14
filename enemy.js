function createEnemy(createX, createY, newSpeed, dirHorizontal, labyrinth, player){
	var img_enemy = game.assets['imagens/enemy/enemy.png'];
	var img_seen = game.assets['imagens/enemy/sighted.png'];	
	var img_sight = game.assets['imagens/sight.png'];	
		
	var completeEnemy = new Group();

	var enemy = new Sprite(32, 32);
    enemy.x = createX;
    enemy.y = createY;
    var image = new Surface(96, 128);
    image.draw(img_enemy, 0, 0, 96, 128, 0, 0, 96, 128);
    enemy.image = image;
	enemy.dirHor = dirHorizontal;

    enemy.isMoving = false;
    enemy.direction = 0;
    enemy.walk = 1;
	
	enemy.signal = 1;
	enemy.speed = newSpeed;
	enemy.enemyShot = false;
       
	//childNode[1] = enemy; childNode[0] = enemySight;
	var patrol = function() { 
		var currentSight = completeEnemy.childNodes[0];
		var currentEnemy = completeEnemy.childNodes[1];
	
        currentEnemy.frame = currentEnemy.direction * 3 + currentEnemy.walk;

        if (currentEnemy.isMoving) {
            currentEnemy.moveBy(currentEnemy.vx, currentEnemy.vy);

            if (!(game.frame % 3)) {
                currentEnemy.walk++;
                currentEnemy.walk %= 3;
            }
            if ((currentEnemy.vx && (currentEnemy.x-8) % 16 == 0) || (currentEnemy.vy && currentEnemy.y % 16 == 0)) {
                currentEnemy.isMoving = false;
                currentEnemy.walk = 1;
            }
        } else {            
            currentEnemy.vx = currentEnemy.vy = 0;
            if (!currentEnemy.dirHor) {
				currentEnemy.vx = currentEnemy.signal*currentEnemy.speed;
			
				if(currentEnemy.signal!=1){		//Andando para a esquerda					
					currentEnemy.direction = 1;
					currentSight.x = currentEnemy.x + currentEnemy.width/2 - currentSight.width;
				} else {						//Andando para a direita
					currentEnemy.direction = 2;
					currentSight.x = currentEnemy.x - currentEnemy.width + currentSight.width/2;
				}		
				
				currentSight.y = currentEnemy.y;
            } else {
				currentEnemy.vy = currentEnemy.signal*currentEnemy.speed;
				
				if(currentEnemy.signal!=1){		//Andando para cima
					currentEnemy.direction = 3;
					currentSight.y = currentEnemy.y + currentEnemy.height/2 - currentSight.height;
				} else {						//Andando para baixo
					currentEnemy.direction = 0;
					currentSight.y = currentEnemy.y - currentEnemy.height + currentSight.height/2;
				}        
				
				currentSight.x = currentEnemy.x;
			}
            if (currentEnemy.vx || currentEnemy.vy) {
                var x = currentEnemy.x + (currentEnemy.vx ? currentEnemy.vx / Math.abs(currentEnemy.vx) * 16 : 0) + 16;
                var y = currentEnemy.y + (currentEnemy.vy ? currentEnemy.vy / Math.abs(currentEnemy.vy) * 16 : 0) + 16;
               if (x >= mapMinWidth && x < mapMaxWidth && y >= mapMinHeight && y < mapMaxHeight)
                    if(labyrinth==null){
                        currentEnemy.isMoving = true;
                        arguments.callee.call(currentEnemy);
                    } else {
                        if(!labyrinth.hitTest(x, y)){
                            currentEnemy.isMoving = true;
                            //arguments.callee.call(currentEnemy);
                        } else {
							currentEnemy.signal *= -1;
							// Movimento pseudo-aleatório, inimigos presos em salas
							// if(currentEnemy.signal==-1)
								// currentEnemy.dirHor = !currentEnemy.dirHor;
						}
					}
            }
        }
		
		if(currentSight.intersect(player)){
			console.log('Sighted');	
			
			this.clearEventListener('enterframe');			
			var seen = new Sprite(14,21);
			seen.image = img_seen;
			seen.x = currentEnemy.x + currentEnemy.width/4;
			seen.y = currentEnemy.y - currentEnemy.height/4;
			seen.addEventListener('enterframe', function(){
				if(this.age >= 30)
					this.opacity-= 0.2;
				if(this.opacity<=0)
					this.parentNode.removeChild(this);
			});
			game.currentScene.addChild(seen);			
			currentSight.addEventListener('enterframe', function(){
				if(!this.intersect(player)){	
					this.clearEventListener('enterframe');
					this.parentNode.addEventListener('enterframe', patrol);
				} else {
					var shootTimer = new Entity();
					shootTimer.addEventListener('enterframe', function(){											
						if(this.age >= 30)
							enemyShooting(this.parentNode.childNodes[1],player);
						if(this.age >= 35)
							this.parentNode.removeChild(this);
					});
					this.parentNode.addChild(shootTimer);						
				}
			});				
		}
     };
	 
    completeEnemy.addEventListener('enterframe', patrol);	 
	 
	 if(!enemy.dirHor)
		var enemySight = new Sprite(128,48);
	 else
		var enemySight = new Sprite(48,128);
	 //enemySight.image = img_sight;		 
	 completeEnemy.addChild(enemySight);

	 completeEnemy.addChild(enemy);
	 completeEnemy.alive = true;
	 
	 return completeEnemy;
}

function enemyShooting(player,personagem){
	if(!player.parentNode.alive || player.enemyShot)
		return;		
		
	var img_shot = game.assets['imagens/enemy/shot.png'];		
		
	var shot = new Sprite(16, 32);
	var shot_dir;
	var charOffset = 16;
	shot.image = img_shot;
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
	
	shot.hitPlayer = false;
	shot.addEventListener('enterframe', function(e) { 	
		var checkSpotX = e.target.checkSpotX + e.target.x;
		var checkSpotY = e.target.checkSpotY + e.target.y;
		var shotSpeed = 5;
		if(labyrinth!= null && labyrinth.checkTile(checkSpotX, checkSpotY)!=wallTile){
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
			
			if(Math.abs(checkSpotX-personagem.x)<=12 && Math.abs(checkSpotY-personagem.y)<=24 && !e.target.hitPlayer){
				e.target.hitPlayer = true;
				console.log('player hit');
				game.personagem.hitByShot = true;			
				//setLevel12GameVar(game,game.currentScene);
				//game.changeStages('level2');
			}
							
			if(e.target.age>=100){
				player.enemyShot = false;
				e.target.clearEventListener('enterframe');
				game.currentScene.removeChild(e.target);
			}			
		} else {	
			player.enemyShot = false;
			e.target.clearEventListener('enterframe');
			game.currentScene.removeChild(e.target);	
		}		
	});	
	
	player.enemyShot = true;
	game.currentScene.insertBefore(shot,mask);
}