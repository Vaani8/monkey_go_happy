//Game state
PLAY=1;
END=0;
gameState=1;
var monkey , monkey_running,download;
var banana ,bananaImage, obstacle, obstacleImage,downloadImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  download_showing=loadImage("download.jpg")
}



function setup() {
  createCanvas(450,360);
  
  monkey=createSprite(50,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4
  ground.x=ground.width/2;
  console.log(ground.x);
  
  download=createSprite(225,170,20,20);
  download.addImage("GO",download_showing);
  download.scale=2.0;
  download.visible=false;
  
  SurvivalTime=0;
   bananaGroup=new Group();
  obstacleGroup=new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
}


function draw() {
  background(225);

  if (gameState===PLAY){
    
      if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
      if(ground.x<0){
    ground.x=ground.width/2;
  }
    
    spawnBanana();
    spawnObstacle();
    
     if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
       SurvivalTime=SurvivalTime+1
  }
    
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        monkey.destroy();
      download.visible=true;
  }

  }
  else if (gameState===END){
    
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.destroyEach();
  SurvivalTime=0;
  }

    drawSprites();
}


function spawnObstacle(){
  //write code here to spawn the obstacle
  if (frameCount % 250 === 0) {
    var obstacle = createSprite(600,120,40,10);
    //obstacle.debug = true;
    obstacle.y =(300,330);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
}
}
  

  
function spawnBanana(){
  //write code here to spawn the banana
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
     bananaGroup.add(banana);
  }
 
}