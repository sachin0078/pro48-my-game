var bg;
var p1;
var state=0;
var fenceimg;
var demonwalk;
var demonAttack;
var demonDead;
var playeridle;
var playerwalk;
var playerAttack;
var playerDead;
var platformimg;
var playerscore = 0;
var demonscore =  0;
var fire_img;
var pt_img
var stone;
var stone_img;



function preload(){
  platformimg=loadImage("platform1.png")
  bg=loadImage("bg1.png");
  fenceimg=loadImage("ground&houses_bg.png")
  demonwalk=loadAnimation("demon/Walk1.png","demon/Walk2.png","demon/Walk3.png","demon/Walk4.png","demon/Walk5.png","demon/Walk6.png")
  playeridle=loadAnimation("player/i1.png");
  playerwalk=loadAnimation("player/w1.png","player/w2.png","player/w3.png","player/w4.png","player/w5.png","player/w6.png")
  playerAttack=loadAnimation("player/a1.png","player/a5.png","player/a6.png","player/a7.png")
  playerDead=loadAnimation("player/d3.png","player/d5.png","player/d7.png","player/d9.png")
  demonAttack=loadAnimation("demon/Attack1.png","demon/Attack2.png","demon/Attack3.png","demon/Attack4.png")
  demonDead=loadAnimation("demon/d2.png","demon/d4.png","demon/d6.png")
  fire_img=loadImage("fire.png")
  pt_img=loadImage("platform2.png")
  stone_img=loadImage("platform3.png")
}
function setup() {
  createCanvas(displayWidth-30,displayHeight-50);
  p1=createSprite(50,200,50,50);
  p1.addAnimation("idle",playeridle);
  p1.addAnimation("walk",playerwalk);
  p1.addAnimation("Attack",playerAttack);
  p1.addAnimation("Dead",playerDead)
  p1.scale=0.2;
  fence=createSprite(displayWidth/2,displayHeight-100,displayWidth,150);
  fence.addImage(fenceimg);
  fence.visible=false;
 road=createSprite(displayWidth/2,displayHeight,displayWidth,10)
  demon=createSprite(950,200,50,50);
 demon.addAnimation("walk",demonwalk);
 demon.addAnimation("attack",demonAttack);
 demon.addAnimation("Dead",demonDead);
 demon.scale=2;
 demon.visible=false;
 demon.setCollider("rectangle",0,0,50,80);
stone=createSprite(100,displayWidth/2-100)
stone.addImage(stone_img)

 platform=createSprite(displayWidth/2,displayHeight-300,displayWidth,50);
 platform.addImage(platformimg);
 platform.scale=2;
 platform.visible=false;
 platform.setCollider("rectangle",0,0,platform.width,80)

 fire=createSprite(displayWidth/2,displayHeight-150)
 fire.addImage("fire",fire_img)
 fire.visible=false


stone.setCollider("rectangle",0,0,stone.width-110,80)
 ptGroup=new Group()
}

function draw() {
  background(bg);  
  if(keyWentDown("RIGHT_ARROW")){
    p1.velocityX=15;
    p1.changeAnimation("walk")
  }
  if(keyWentUp("RIGHT_ARROW")){
    p1.velocityX=0;
    p1.changeAnimation("idle")
  }
  if(keyWentDown("a")){
    p1.changeAnimation("Attack")
  }
  if(keyWentUp("a")){
    p1.changeAnimation("idle")
  }
  if(keyWentDown("LEFT_ARROW")){
    p1.velocityX=-15;
    p1.changeAnimation("walk")
  }
  if(keyWentUp("LEFT_ARROW")){
    p1.velocityX=0;
    p1.changeAnimation("idle")
  }
  if(keyWentDown("UP_ARROW")){
    p1.velocityY=-10;

  }
  if(state===0){
    if(frameCount%150 ===0){
      spawnPlatform()
    }
  }
 
  if(!(ptGroup.isTouching(p1))){
    p1.velocityY+=0.5;
  }
  demon.velocityY+=0.5;
  if(p1.x>displayWidth-50 && state===0 ){
    p1.x=50;
    bg=loadImage("bg2.jpg");
    state++;
    

  }
  if(p1.x>displayWidth-50 && state===1 ){
    p1.x=50;
    fire.visible=true;
    ptGroup.destroyEach()
  bg=loadImage("clouds1.png");
 fence.visible=true;
 demon.visible=true;
 platform.visible=true;
demon.debug=true;
 demon.velocityX=-2;
 if(demon.x<displayWidth-300){
   demon.changeAnimation("attack")
   
 }
 if(demon.isTouching(p1)){
  demonscore++;
}
if(demonscore>2){
  p1.changeAnimation("Dead");
}
  }
  
  
  demon.collide(platform);

  p1.collide(stone);
 p1.collide(road);

 ptGroup.collide(p1)

 if(ptGroup.isTouching(p1)){
   p1.velocityY=0;
   p1.velocityX=0;
   ptGroup.setVelocityEach(0,0);
 }

  drawSprites();
  
}
function spawnPlatform(){
  var pt=createSprite(displayWidth,random(50,1000))
  pt.addImage(pt_img)
  pt.velocityX=-2;

  ptGroup.add(pt)
}
