module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x =20;
head.y = -60;
var trunk = new render.Bitmap();
trunk.x = 0;
trunk.y=0;
var left_arm = new render.Bitmap();
left_arm.x = -100;
left_arm.y =30;
var right_arm = new render.Bitmap();
right_arm.x = 90;
right_arm.y =30;
var left_leg = new render.Bitmap();
left_leg.x = -70;
left_leg.y =180;
var right_leg = new render.Bitmap();
right_leg.x = 70;
right_leg.y = 180;

head.source = "head.png";
trunk.source = "trunk.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";

humanContainer.addChild(head);
humanContainer.addChild(trunk);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png","left_arm.png","right_arm.png", "left_leg.png", "right_leg.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         this.rotation += Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 100;
ticker.start([body]);











