class Cannonball {
    constructor(x, y) {
        var options = {
            restitution: 0.08,
            friction: 1,
            density: 1,
            isStatic: true
        }
        this.r = 40;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("assets/cannonball.png");
        World.add(world, this.body);
        this.t = []
    }

    shoot() {
        var velocity = p5.Vector.fromAngle(cannon.a);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x,
            y: velocity.y
        });
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();

        if (this.body.velocity.x > 0 && this.body.position.x > 270) {
            var position = [this.body.position.x, this.body.position.y];
            this.t.push(position);
        }
        for (var i = 0; i < this.t.length; i++) {
            image(this.image, this.t[i][0], this.t[i][1], 5, 5);
        }
    }
}