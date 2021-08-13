const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon, cannonball, boat;

var balls = []
var boats = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, angle);
  boat = new Boat(width, height - 100, 200, 200, -80);


}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var h = 0; h < boats.length; h++) {
      if (balls[i] !== undefined && boats[h] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[h].body);
        if (collision.collided) {
          boats[h].remove(h);
          World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
        }
      }
    }
  }

  Engine.update(engine);
  ground.display();


  cannon.display();
  tower.display();

  showBoats();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonball = new Cannonball(cannon.x, cannon.y);
    cannonball.t = [];
    Matter.Body.setAngle(cannonball.body, cannon.angle);
    balls.push(cannonball);
  }

}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}



function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 200, 200, position);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
    }
  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100);
    boats.push(boat);
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}