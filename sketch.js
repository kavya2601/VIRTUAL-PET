//Create variables here
var dogStand , dogSit , dog , foodS , foodStock;
function preload()
{
  dogStand = loadImage("images/dogImg.png");
  dogSit = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
  console.log(database);
	createCanvas(500 , 500);
  dog = createSprite(270 , 250 , 60 , 90);
  dog.addImage(dogStand);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46 , 139 , 87);
textSize(15);
fill("black");
stroke("white");

text("NOTE : Press UP_ARROW Key to feed the dog with milk",70 , 20);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogSit);
}
  drawSprites();
  text("FOOD REMAINING :-" +foodS , 50 , 120);
  //add styles here

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
    dog.addImage(dogSit);
  }
  
database.ref('/').update({
  Food:x
})
}


