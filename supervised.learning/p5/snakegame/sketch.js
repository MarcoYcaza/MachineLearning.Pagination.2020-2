var value = 0;
var pos_x = 10;
var pos_y = 10;

var myWidth = 500;
var myHeight = 500;

var speed = 1

var largo=20;

var food_x = 50,food_y=50;

function setup(){
    createCanvas(myWidth,myHeight);

    snake1 = new snake(30,50,20);
    snake1.show();
    food1 = new food(food_x,food_y);
    food1.show();

}

function draw(){
    background(51);



    snake1.update(pos_x,pos_y);
    
    var distance  =  dist(pos_x,pos_y,food_x,food_y);

    if (keyIsPressed === true) {
        if (keyCode === LEFT_ARROW) {
            pos_x = pos_x-1 - speed;
            
        } else if (keyCode === RIGHT_ARROW) {
            pos_x = pos_x+1 +speed;
        } else if (keyCode === UP_ARROW){
            pos_y = pos_y-1 - speed;
        }else if (keyCode === DOWN_ARROW){
            pos_y = pos_y+1  + speed;
        }
    }


    if(distance<20){

        speed++;

        text('meet', 10, 30);
        largo = largo + 10;

        snake1.update_size(largo);

        food_x = floor(random()*width);
        food_y = floor(random()*height);
    
    }

    food1.update(food_x,food_y);

    console.log(value)

}

/* function keyPressed() { 

    if (keyIsPressed === true) {
        if (keyCode === LEFT_ARROW) {
            pos_x = pos_x-1 - speed;
            
        } else if (keyCode === RIGHT_ARROW) {
            pos_x = pos_x+1 +speed;
        } else if (keyCode === UP_ARROW){
            pos_y = pos_y-1 - speed;
        }else if (keyCode === DOWN_ARROW){
            pos_y = pos_y+1  + speed;
        }
    }
}*/


class snake {

  constructor(x,y,largo){
      this.x = x;
      this.y = y;
      this.largo = largo;
  }

  update(x_new,y_new){
    this.x = x_new;
    this.y = y_new;
    fill(255);
    rect(this.x, this.y, this.largo, 20, 5);
  }

  update_size(size){
    this.largo = size;
  }

  show(){
    fill(255);
    rect(this.x, this.y, this.largo, 20, 5);
  }

}


class food {

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
  
    update(x_new,y_new){
      this.x = x_new;
      this.y = y_new;
      fill(0);
      rect(this.x, this.y, 20, 20, 5);
    }
    
    show(){
      fill(0);
      rect(this.x, this.y, 20, 20, 5);
    }
  
}