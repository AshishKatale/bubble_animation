var canvas = document.getElementById("can");
canvas.style.backgroundColor="lightgrey";
var c = canvas.getContext("2d");
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    var a=[];
    var r=5;  
    
    var pos={
        px:undefined,
        py:undefined
    }
    fn1=()=>{
        pos.px=event.x;
        pos.py=event.y;
    }
    fn3=()=>{
        canvas.height=window.innerHeight;;
    canvas.width=window.innerWidth;
    }
    canvas.addEventListener("mousemove",fn1);
    canvas.addEventListener("touchmove",fn1);
    window.addEventListener("resize",fn3);
    erpos=()=>{
        pos.px=undefined;
        pos.py=undefined;
    }

    function Cir(x,y,dx,dy,radius){
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;
        this.minRadius=2;
        this.maxRadius=radius*10;
        this.radius=radius;
        this.r=Math.random()*255;
        this.g=Math.random()*255;
        this.b=Math.random()*255;
        this.draw=()=>{
            c.beginPath();
            c.arc(this.x,this.y,this.radius,0,2*Math.PI);
            c.fillStyle=`rgb(${this.r}+${this.g}+${this.b})`;
            c.fill();
	   
        }
        this.move=()=>{
            if(this.x<this.radius || this.x>canvas.width-this.radius) this.dx*= -1;
            if(this.y<this.radius || this.y>canvas.height-this.radius) this.dy*= -1;
            this.x+=this.dx;
            this.y+=this.dy;

            if(Math.abs(pos.px-this.x)<30 && Math.abs(pos.py-this.y)<30){
                if(this.radius<this.maxRadius) this.radius+=3;
            }
            else if(this.radius>radius){
                
                if(this.radius>radius && this.radius>this.minRadius)
                this.radius-=2;
            }
            // if(Math.abs(pos.px-this.x)<150 && Math.abs(pos.py-this.y)<120){
            //     this.x+=5*dx;
            //     this.y+=5*dy;
            // }
            
            this.draw(this.x,this.y);

        }
    }
    
    for(var i=0;i<2000;i++){
        let x=(Math.random()*(canvas.width-2*r))+r;
        let y=(Math.random()*(canvas.height-2*r))+r;
        let dx=(Math.random()- 0.5)*5;
        let dy=(Math.random()- 0.5)*5;
        let rr=(Math.random()*r);
        a.push(new Cir(x,y,dx,dy,rr));
    }

    function fn(){
    c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<a.length;i++) a[i].move();
    requestAnimationFrame(fn);
    }
    
