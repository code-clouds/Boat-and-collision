class Ground {
    constructor(x,y,w,h){
        var options = {isStatic:true}
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world, this.body);
    }
    display(){
        var p = this.body.position;
        var angle = this.body.angle;
        push();
        translate(p.x, p.y);
        rotate(angle);
        fill("blue");
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}