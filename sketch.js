var bgImg, bg;
var starImg, star, starsGroup;
var meteroidImg, meteroid, meteroidsGroup;
var rocket, rocketImg;
var gameover,gameoverImg
//var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  bgImg = loadImage("space.jpeg");
  starImg = loadImage("star.PNG");
  meteroidImg = loadImage("meteroid.PNG");
  rocketImg = loadImage("rocket.PNG");
  gameoverImg =loadImage("gameover.jpg")
 // spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  
  bg = createSprite(300,300);
  bg.addImage("bg",bgImg);
  bg.velocityY = 1;
  bg.scale=2
  gameover =createSprite(300,300)
  gameover.addImage(gameoverImg)
  gameover.scale=1
  gameover.depth=bg.depth
  gameover.depth+=1
  starsGroup = new Group();
  meteroidsGroup = new Group();
  //invisibleBlockGroup = new Group();
  
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.1;
  rocket.addImage("rocket", rocketImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    gameover.visible=false
    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
  
    if(bg.y > 400){
      bg.y = 300;
    }
    spawnstars();
  }
    
    //climbersGroup.collide(ghost);

   if((meteroidsGroup.isTouching(rocket))||(starsGroup.isTouching(rocket))||rocket.y>600){
      rocket.velocityY = 0;
     // rocket.destroy();
      bg.velocityY=0
      meteroidsGroup.setVelocityYEach(0)
      starsGroup.setVelocityYEach(0)
      gameState = "end";
   }
    
  
  
  if (gameState === "end"){
   // gameover.addImage(gameoverImg)
   // gameover.scale=3
   // gameover.depth=bg.depth
 // gameover.depth+=1
  gameover.visible=true
    //stroke("yellow");
    //fill("yellow");
    //textSize(30);
    //text("Game Over", 230,250)
    
  }
  drawSprites();
}

function spawnstars() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
     star = createSprite(200, -50);
     meteroid = createSprite(200,10);
    //var invisibleBlock = createSprite(200,15);
    //invisibleBlock.width = climber.width;
   // invisibleBlock.height = 2;
    
    star.x = Math.round(random(120,400));
    meteroid.x = Math.round(random(120,400));
    //invisibleBlock.x = door.x;
    
    star.addImage(starImg);
    meteroid.addImage(meteroidImg);
    star.scale=0.02
    meteroid.scale=0.3
    
    star.velocityY = 1;
     meteroid.velocityY = 1;
    //invisibleBlock.velocityY = 1;
    
    rocket.depth = star.depth;
    rocket.depth +=1;
   
    //assign lifetime to the variable
    star.lifetime = 800;
  meteroid.lifetime = 800;
  //  invisibleBlock.lifetime = 800;

    
    //add each door to the group
    starsGroup.add(star);
    //invisibleBlock.debug = true;
    meteroidsGroup.add(meteroid);
    //invisibleBlockGroup.add(invisibleBlock);
  }
}

