var PLAY = 1;
var OVER = 0;
var gameState = PLAY;
var ghost, ghostAnimation;
var door, doorImage;
var climber, climberImage;
var tower, towerImage;
var randomDoors;
var score = 0;
var doorGroup, climberGroup;
var invisibleClimber, invisibleClimberGroup;

function preload(){
  
  ghostAnimation = loadAnimation("ghost-standing.png","ghost-jumping.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  towerImage = loadImage("tower.png");
  
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(width/2,height/2,10,10);
  tower.addImage(towerImage);
  
  ghost = createSprite(width/2, height/2, 10,10);
  ghost.addAnimation("ghost",ghostAnimation);
  ghost.scale = 0.35;
  ghost.debug = true
  ghost.setCollider("rectangle",0,0,100,210);
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleClimberGroup = new Group();
}

function draw(){
  background("black");
  
  if(gameState == PLAY){
    
    if(frameCount%40==0){
      score = score + 1;    
    }
    tower.velocityY = (1 + (score/100));
    if(tower.y >400){
      tower.y = height/2;
    }
    if(keyDown("space")){
      ghost.velocityY = -8;
    }
     ghost.velocityY = ghost. velocityY + 0.8;
    spawnDoors();
    
    if(keyDown("left")){
      ghost.x = ghost.x -5;
    }
    if(keyDown("right")){
      ghost.x = ghost.x +5;
    }
    if(ghost.isTouching(climberGroup)){
      ghost.setVelocity(0,0);
    }
    
    if(ghost.isTouching(invisibleClimberGroup) || ghost.y >height){
      gameState = OVER;
      over();
      
    }
    
  } 
  drawSprites();
  
  if(gameState == OVER){
    fill("teal");
    textSize(40);
    textAlign(CENTER);
    stroke("pink");
    strokeWeight(3);
    text("GAME OVER",width/2,height/2);
    noFill();
  }
  textSize(20);
  textAlign(CENTER);
  fill("white");
  text("Survival Time: " + score,400,50);
}

function spawnDoors(){
  if(frameCount%300==0 || frameCount == 50){
    randomDoors = round(random(120,480));
    door = createSprite(randomDoors, 0,10,10);
    door.addImage(doorImage);
    door.velocityY = (1 + (score/100));
    door.lifetime = 600;
    
    climber = createSprite(door.x,0+65,10,10);
    climber.addImage(climberImage);
    climber.velocityY =(1 + (score/100));
    climber.lifetime = 600;
    
    invisibleClimber = createSprite(climber.x,climber.y + 15,climber.width,10);
    invisibleClimber.velocityY = (1 + (score/100));
    invisibleClimber.lifetime = 600;
    invisibleClimber.visible = false;   
    
    invisibleClimberGroup.add(invisibleClimber);
    doorGroup.add(door);
    climberGroup.add(climber);
    
    climber.depth = ghost.depth - 1;
    door.depth = ghost.depth - 1;    
  
  }

}

function over(){
  climberGroup.destroyEach();
  doorGroup.destroyEach();
  tower.visible = false;
  ghost.visible = false;
}