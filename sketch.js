let cam;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, car_running, car_collided;
var ground, invisibleGround, groundImage;

var treeGroup, treeImage;
var obastacleGroup, obstacle2, obstacle3;

var score;
// var gameOverImg,restartImg
// var jumpSound , checkPointSound, dieSound

function preload(){
  car_running = loadAnimation("car.jpg");
  car_collided = loadAnimation("boom.png");
  
  groundImage = loadImage("road.jpg");
  
  //cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("carone.png");
  obstacle2 = loadImage("cartwo.png");
  //obstacle3 = loadImage("carthree.png");

  //jumpSound = loadSound("jump.mp3")
  //dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight,WEBGL);
  
  car = createSprite(10,150,10,10);
  car.addAnimation("running", car_running);
  car.addAnimation("collided", car_collided);

  car.scale = 0.2;
  
  ground = createSprite(100,150,700,100);
  ground.addImage("ground",groundImage);

  ground.scale = 5;
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(300,140);
  // restart.addImage(restartImg);

  invisibleGround = createSprite(200,250,4000,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  //cloudsGroup = createGroup(); 
  car.setCollider("rectangle",0,0,100,100);
  
  score = 0;

  cam = createCamera();

}

function draw() {
  
  background("white");
  //displaying score
  textSize(18);
  text("Score: "+ score, 280,30);
  
  if(gameState === PLAY){

    //gameOver.visible = false;
    //restart.visible = false;
    
    ground.depth = car.depth - 500;
    car.depth = car.depth + 1;
    
    //ground.velocityX = 5;
    car.velocityX = 5;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    // if(score>0 && score%100 === 0){
    //    checkPointSound.play() 
    // }

  if (frameCount % 100 === 0) {
    ground.x = car.x;
 }
    
    //jump when the space key is pressed
    if(keyDown("w") && car.y > 10) {
        car.y = car.y - 5;
        //jumpSound.play();
    }
        if(keyDown("s") && car.y < 280) {
        car.y = car.y + 5;
        //jumpSound.play();
    }
    
    console.log(car.y);
    
    car.changeAnimation("running", car_running);
    
    //add gravity
    //car.velocityY = car.velocityY + 0.6
  
    //spawn the clouds
    //spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(car)){
      //car.velocityY = -12;
      //jumpSound.play();
         gameState = END;
      //dieSound.play()
    }

    //if(keyDown(RIGHT_ARROW)){
      cam.move(5,0,0);
    
  }
   else if (gameState === END) {
      // gameOver.visible = true;
      // restart.visible = true;
     
     //change the car animation
      car.changeAnimation("collided", car_collided);
    
     //  if(mousePressedOver(restart)) {
     //  reset();
     // }
     
      ground.velocityX = 0;
      car.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     //cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop car from falling down
  car.collide(invisibleGround);

  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  score = 0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(car.x+500,Math.round(random(10,280)),100,40);
   obstacle.velocityX = -(6 + score/100)
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

// function spawnClouds() {
//   //write code here to spawn the clouds
//   if (frameCount % 60 === 0) {
//     var cloud = createSprite(600,120,40,10);
//     cloud.y = Math.round(random(80,120));
//     cloud.addImage(cloudImage);
//     cloud.scale = 0.5;
//     cloud.velocityX = -3;
    
//      //assign lifetime to the variable
//     cloud.lifetime = 250;
    
//     //adjust the depth
//     cloud.depth = car.depth;
//     car.depth = car.depth + 1;
    
//     //add each cloud to the group
//     cloudsGroup.add(cloud);
//   }
// }