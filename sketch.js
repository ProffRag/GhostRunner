//ma'am it is not coming in end state
//also the score is not showing
var PLAY = 1;
var END = 0;
var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleGround;
var gameState = PLAY;
var score = 0;
var gameOver, gameOverImg;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage('gameOver.png');

  
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4+(3*score/100);
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.setCollider('rectangle',0,0 ,100,100);
  
  invisibleGround = createSprite(200,600,600,10);
  invisibleGround.visible = false;
  gameOver = createSprite(300,100);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
 
  
}

function draw() {
  ghost.debug = true;
  background(200);
  text("Score" + score,500,50);
  if(gameState == PLAY){
    score = score + Math.round(getFrameRate()/600);
    tower.velocityY = 4+(3*score/100);

    spawnDoors();
    

    if(keyDown('space') || keyDown('up')){
      ghost.velocityY = -12;
    }
    if(keyDown('left')){
      ghost.velocityX = ghost.velocityX - 0.75;
    }
    if(keyDown('right')){
      ghost.velocityX = ghost.velocityX + 0.75;
    }

    ghost.velocityY += 1;
    
    if(tower.y > 400){
      tower.y = 300
    }
    
    
    if(invisibleGround.isTouching(ghost) ||doorsGroup.isTouching(ghost) || ghost.y>600 || ghost.y<0){
      ghost.destroy;
      gameState == END;
      
    }
  }
  else if(gameState == END){
    gameOver.visible = true;

    tower.velocityY = 0;
    ghost.visible = false;
    
    doorsGroup.visible = false;

    doorsGroup.setLifetimeEach(-1);

    if(keyDown('space') || keyDown('up')){
      restart();
    }

  }
  drawSprites();
  

}



function spawnDoors(){
  if(frameCount % 60 == 0){
    door = createSprite(500,200,50,50);
    door.x = Math.round(random(50,550));
    door.addImage(doorImg);
    door.scale = 0.6;
    door.velocityY = 4+(3*score/100);

    door.lifetime = 300;

    
    doorsGroup.add(door);

    

  }
}

function reset(){
  gameState == PLAY;
  gameOver.visible = false;

  doorsGroup.destroyEach();
  

  score = 0;
}
