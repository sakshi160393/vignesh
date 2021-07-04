var PLAY = 1;
var END = 0;
var START=2;
var gameState=START;
var boy;
var IMG;
var wall;
var wall1;
var obstacle1;
var obstaclesGroup;
var starGroup;
var starImage;
var gameOver,restart;
var start;
var startImage;


function preload(){
  //starImage.loadImage("PinClipart.com_gold-border-clipart_103185.png")
}


function setup(){
  var canvas =createCanvas(windowWidth-10,windowHeight-20);
  boy=createSprite(windowWidth/2,windowHeight-80,20,20);
 wall=createSprite(30,windowHeight,20,windowHeight*4);
 wall.velocityY=2;
 wall1=createSprite(windowWidth-30,windowHeight,20,windowHeight*4);
  wall1.velocityY=2;
 wall.y=wall.height/2;
 wall1.y=wall1.y.height/2;

  obstaclesGroup=new Group();
  starGroup=new Group();
 
}
function draw(){
background(255,165,0);

if(gameState===START){

  start=createSprite(windowWidth/2,windowHeight/2,100,100);
  
  if(mousePressedOver(start)){
    gameState=PLAY;
  
  }
}


 else if (gameState===PLAY){
 
  start.visible=false;
  wall.velocityY = 2;
  wall1.velocityY=2;

  if(keyDown("LEFT_ARROW")) {
    changePosition(-5,0);
    
  }
  
  if(keyDown("RIGHT_ARROW")) {
    changePosition(5,0);
    
  }
  if (gameState===END){
    wall.visible=false;
  }



  if (wall.y < 0 && wall1.y < 0){
    wall.y = wall.height/2;
    wall1.y=wall1.height/2
  }

  

  if(starGroup.isTouching(boy)){
    starGroup.destroyEach();
  }

  if(obstaclesGroup.isTouching(boy)){
      gameState = END;
  }
  spawnStars();
  spawnObstacles();
}

else if(gameState===END){
  boy.velocityY=0;
  boy.velocityX=0;
  obstaclesGroup.setVelocityYEach(0);
  starGroup.setVelocityYEach(0);
  wall.velocityY=0;
  wall1.velocityY=0;
  obstaclesGroup.setLifetimeEach(-1);
  starGroup.setLifetimeEach(-1);
}

if(wall.y>displayHeight||wall1.y>displayHeight){

  wall.y=wall.height/2;
  wall1.y=wall1.height/2;
}


edges=createEdgeSprites();
boy.collide(wall1);


boy.collide(wall);


function changePosition(x,y){
  boy.x = boy.x + x;
  boy.y = boy.y + y;
}


  drawSprites()
} 

function spawnObstacles() {
  
  if (frameCount % 20 === 0) {
    var obstacle = createSprite(600,0,60,10);
    obstacle.addImage();
    obstacle.x = Math.round(random(40,windowWidth-40));
    
    obstacle.velocityY = 3;
    obstacle.collide(boy);
    var rgb1=Math.round(random(0,255));
    
    var rgb2=Math.round(random(0,255));
    
    var rgb3=Math.round(random(0,255));
    obstacle.shapeColor=rgb(rgb1,rgb2,rgb3);
     
    obstacle.lifetime = 250;
    
    
    obstaclesGroup.add(obstacle);
    
  }
  
}
function spawnStars() {
  
  if (frameCount % 320 === 0) {
    var star = createSprite(600,0,10,10);
    star.addImage();
    star.x = Math.round(random(40,windowWidth-40));
    //star.addImage(starImage);
    star.velocityY = 3;
    
     
    star.lifetime = 200;
    
    starGroup.add(star);
    
    
  }
  
}

