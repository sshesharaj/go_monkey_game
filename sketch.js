
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup;

var ground,invisibleGround;
var fruit , rocks ;

play=1
end = 0
var gameState = play
 var score = 0
var servivalTime = 0
var reset , resetImg;
var gameOver , gameOverImg;





function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  obstaceImage = loadImage("obstacle.png");
  
  bananaImage = loadImage("banana.png")
  groundImg = loadImage("pngfind.com-ground-png-773618 (1).png");
  
  resetImg = loadImage ("favpng_reset-reboot-download-1.png")
gameOverImg = loadImage ("145-1457469_game-over-png-parallel-transparent-png.png")
  
}




function setup() {
  createCanvas(600,400);
  reset = createSprite(300  , 200 ,20 , 20 );
  reset.addImage(resetImg);
  reset . scale = 0.1
  reset.visible=false;
  
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage(gameOverImg)
gameOver.scale=0.3
  gameOver.visible = false;

  monkey = createSprite(100,250,20,20);
  monkey.addAnimation(  "moving" , monkey_running)
monkey.scale = 0.2
  //monkey.debug = true
  
  ground = createSprite(300,340 , 600,50)
   ground.addImage(groundImg);
   ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,340,500,20)
  
  foodsGroup = new Group();
  obsticlesGroup = new Group ();
  
  
}

    
function draw() {
  background("white")
  monkey.setCollider("rectangle",0,0,360,570)
  stroke ("black")
  textSize(20);
  fill("black")
  text("score  : "  + score,200,50);
  
  stroke ("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil (frameCount/frameRate())
  text("servivalTime  : "  + servivalTime , 350,50)
  
 
  
  monkey.collide(invisibleGround)
  invisibleGround.visible = false
  
  if (gameState === play){
    reset.visible = false;
    gameOver.visible = false;
    
    
    
    
    
    
    
     if(keyDown("space") && monkey.y >= 250){    
    monkey.velocityY = -12;         
  }
  monkey.velocityY=monkey.velocityY+0.5
     food ();
  obsticle ();
    
    if (foodsGroup.isTouching(monkey)){
      foodsGroup.destroyEach();
      score= score+10
      
    }
     ground.velocityX = -(10 + 5*score/50);
    
    if (ground.x<0){
      ground.x = ground.width / 1/2
    }
  }
  
  
  if (gameState ===end){
    reset.visible = true;
    gameOver.visible = true;
    
    if (mousePressedOver(reset))
      {
      
        
        score = score-25
         survivalTime = survivalTime-10;
        obsticlesGroup.destroyEach();
      foodsGroup.destroyEach();
         gameState =play;
      }
    
    if (score <= 0 && mousePressedOver(reset)){
      
      score = 0
      survivalTime = 0
      obsticlesGroup.destroyEach();
      foodsGroup.destroyEach();
      
      gameState = play
      gameOver.visible = true;
    }
    
    
  }
  
  
  
  
  
  
  if (obsticlesGroup.isTouching(monkey)){
    foodsGroup.destroyEach();
    foodsGroup.setVelocityXEach(0);
    obsticlesGroup.setVelocityXEach(0);
    obsticlesGroup.setLifetimeEach (-1);
     foodsGroup.setLifetimeEach (-1);
     gameState = end;
     monkey.velocityY = 0;
     ground.velocityX = 0;
   
    reset.visible = true;
    //gameOver.visible = true;
    
  }
 
  
  
  
  

 
  
  
  
  
  
  
  
 
  drawSprites();
}

function food (){
  if (frameCount % 80 ===0){
  var fruit = createSprite(600,200,20,20)
  fruit.addImage(bananaImage)
  fruit.scale = 0.1;
  //  fruit.debug = true
    //fruit.setCollider ("rectangle",0, 0,100,100) ;
  
    fruit.y = Math.round(random(100,300))
    fruit.velocityX = -(12 + 5*score/50)
    fruit.lifetime = 100;
    monkey.depth = fruit.depth + 1;  
    foodsGroup.add (fruit);
    
    
    
    
  }
}

function obsticle (){
  if (frameCount % 120 ===0){
 var rocks = createSprite(600 , 300 ,20,20);
  rocks . addImage (obstaceImage);
    rocks.scale = 0.2;
   // rocks.debug = true
    rocks.setCollider ("rectangle",0, 0,300,300) ;
    rocks.velocityX = -(9 + 5*score/50)
    rocks.lifetime = 100
    obsticlesGroup.add(rocks);
    
  }
}





