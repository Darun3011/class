var PC,ballonImg;
var backgroundimg1;
var obstacleGroup,obstacleImg1,obstacleImg2,obstacleImg3;
var topObsImg1,topObsImg2;
var gameState = "PLAY";
var attempts = 0;
var gameOver,restart;
var gameOverImg,restartImg;

function preload(){

backgroundimg1 = loadImage("images/backgroundimagelevel1.png");

ballonImg = loadAnimation("images/balloon1.png","images/balloon2.png","images/balloon3.png");

obstacleImg1 = loadImage("images/obsBottom1.png");

obstacleImg3 = loadImage("images/obsBottom3.png");

obstacleImg2 = loadImage("images/obsBottom2.png");

topObsImg1 = loadImage("images/obsTop1.png");

topObsImg2 = loadImage("images/obsTop2.png");

gameOverImg = loadImage("images/gameOver.png");

restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(800, 600);

  obstacleGroup = new Group();

  
PC = createSprite(200,300,30,30);
PC.addAnimation("ballonImg",ballonImg);
PC.scale = 0.3;

gameOver = createSprite(400,350,30,30);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

restart  = createSprite(420,400,30,30);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;


}
function draw() {
//background
background(backgroundimg1);
text("Attempts:" + attempts,700,50);

  if(gameState === "PLAY"){

      if(keyDown('space')){

      PC.velocityY = -6;

      }
      PC.velocityY = PC.velocityY + 0.8;

      if(PC.isTouching(obstacleGroup)){
        
        attempts = attempts + 1;

        PC.x = 200;
        PC.y = 300;

      } 
      
      if(attempts > 5){

        gameState = "END";

      }

      spawnObstacles();

      spawnTopObstacles()
  }else{

    restart.visible = true;
    gameOver.visible = true;
    PC.velocityX = 0;
    PC.velocityY = 0;
    PC.y = 350;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityYEach(0);
    obstacleGroup.setLifetimeEach(-1);
  }

drawSprites();

}

function spawnObstacles(){

  if(frameCount % 60 === 0){
  var obstacle = createSprite(800,520,50,50);
  obstacle.velocityX = -4;
  
  var rand = Math.round(random(1,3));

  switch(rand){

    case 1 : obstacle.addImage(obstacleImg1);
            break
    case 2 : obstacle.addImage(obstacleImg3);
            break
    case 3 : obstacle.addImage(obstacleImg1);
            break;
    default : break                
  }
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);

  }



}

function spawnTopObstacles(){

if(frameCount % 80 === 0){

var obstacle = createSprite(800,100,50,50);
  obstacle.velocityX = -4;
  
  var randY = random(50,150);
  obstacle.y = randY;

  var rand = Math.round(random(1,2));

  switch(rand){

    case 1 : obstacle.addImage(topObsImg1);
            break
    case 2 : obstacle.addImage(topObsImg2);
            break
    
    default : break            
  }

  obstacle.scale = 0.10;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
} 

}