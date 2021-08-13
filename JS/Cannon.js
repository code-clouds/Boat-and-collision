class Cannon{
    constructor(x,y,w,h,a){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
    }
    display(){
        if(keyIsDown(RIGHT_ARROW) && this.a < 0.35){
            this.a += 0.02;
        }

        if(keyIsDown(LEFT_ARROW) && this.a > -1.5){
            this.a -= 0.02;
        }


        fill("grey");
        push();
        translate(this.x, this.y);
        rotate(this.a);
        rect(-10, -20, this.w, this.h);
        pop();
        arc(this.x - 35, this.y + 90, 180, 230, PI, TWO_PI);
        noFill();
    }
}