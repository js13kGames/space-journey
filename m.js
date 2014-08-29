var beep = (function () {
    var ctx2 = new(window.audioContext || window.webkitAudioContext);
    return function (duration, type, finishedCallback) {

        duration = +duration;

        // Only 0-4 are valid types.
        type = (type % 5) || 0;

        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }

        var osc = ctx2.createOscillator();

        osc.type = type;

        osc.connect(ctx2.destination);
        osc.noteOn(0);

        setTimeout(function () {
            osc.noteOff(0);
            finishedCallback();
        }, duration);

    };
})();

function P(cx, cy, r, ty, co) {
	this.r = r;
	this.c = [cx, cy];
	this.c0 = [cx, cy];

	this.t = 0;
	this.ti=0;
	this.ty=ty;
	this.co=co;
	this.u = function() {
		switch(this.ty) {
			case 1:
				this.c[1]-=1;
				break;
			case 2:
				this.ti+=0.02;
				this.c=[this.c0[0]+Math.sin(this.ti)*50, this.c0[1]+Math.cos(this.ti)*50];
				break;
			case 3:
				this.ti+=0.03;
				this.c=[this.c0[0]-Math.sin(this.ti)*30, this.c0[1]+Math.cos(this.ti)*30];
				break;
			case 4:
				this.ti+=0.03;
				this.c=[this.c0[0], 50*Math.sin(this.ti)+this.c0[1]];
				break;
			case 5:
				this.ti+=0.03;
				this.c=[50*Math.sin(this.ti)+this.c0[0], this.c0[1]];
				break;
			case 6:
				this.ti+=0.03;
				this.c=[this.c0[0]-Math.sin(this.ti)*100, this.c0[1]+Math.cos(this.ti)*100];
				break;

		}
	}
}

function E(cx, cy, r, co) {
	this.r = r;
	this.c = [cx, cy];
	this.co=co;
	this.d=0;
}


function A(cx, cy, p) {
	this.r = 10;
	this.c = [cx, cy];
	this.t = 0;
	this.j=0;
	this.v = [0, 0];
	this.p=p;
	this.d = 0;
	this.x0 = 0;
	this.u = function() {
		if (this.j != 0) {
			g=-5;

			if (this.x0==0) {
				this.x0 = this.c;
			}
			
			this.c = [Math.floor(this.x0[0] + 30*this.v[0]*this.t), Math.floor(this.x0[1] + 30*this.v[1]*this.t - 0.5*g*this.t*this.t)];
		} else {
			this.c[0] = Math.floor(-(this.p.r+5) * Math.sin(this.t) + this.p.c[0]);
			this.c[1] = Math.floor(-(this.p.r+5) * Math.cos(this.t) + this.p.c[1]);
		}
		

	}
}

function ls(ctx) {
	ctx.clearRect(0,0,W,H); // clear canvas
		ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("You were lost into the deep space!", 100, 130);
ctx.fillText("There's nothing out there... but you.", 100, 180);
ctx.fillStyle = "rgb(250, 0, 0)";
ctx.font = "18px Helvetica";
ctx.fillText("Press any button to start again", 160, 250);
}

function u(e) {
	k = ('which' in e) ? e.which : e.keyCode;
	if (k==39 || k==37) {
		a.d = 0;
	}
}

function d(e) {
	if (play!=-1) {
		if (play==0) {
			lvl(lv);
			play=1;
		} else {
		k = ('which' in e) ? e.which : e.keyCode;
		if (k==39 && a.j==0) {
			a.d = -1;
		}
		if (k==37 && a.j==0) {
			a.d = 1;
		}
		if (k==38 && a.j==0) {
			
				a.j=1;

				a.d = 0;
				a.t = 0;
				a.v = [(a.c[0]-a.p.c[0])/a.p.r, (a.c[1]-a.p.c[1])/a.p.r];
				a.p=0;
		}
		}
	}

}


function setStars(cv) {

	 	for (var j=1;j<50;j++){
    cv.save();
    cv.fillStyle = '#fff';
    cv.translate(Math.floor(Math.random()*W),
                  Math.floor(Math.random()*H));
    drawStar(cv,Math.floor(Math.random()*4)+2);
    cv.restore();
  	}
}
function drawStar(ctx,r){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Draw everything
var render = function () {
	ctx.clearRect(0,0,W,H); // clear canvas
	ctx.drawImage(m_canvas, 0, 0);

	ctx.save();
	

 	// Show Planets

 	p.forEach(function(pl) {
 		ctx.save();
 		var grd = ctx.createRadialGradient(pl.c[0],pl.c[1],10,pl.c[0],pl.c[1],pl.r+5);
 		switch(pl.co) {
 			case 1:
	 			grd.addColorStop(0,"#8A4B08");
				grd.addColorStop(1,"#3B170B");
				break;
			case 2:
				grd.addColorStop(0,"#6E6E6E");
				grd.addColorStop(1,"#2E2E2E");
				break;
			case 3:
				grd.addColorStop(0,"#886A08");
				grd.addColorStop(1,"#3A2F0B");
				break;

 		}

  		ctx.fillStyle=grd;
 		ctx.beginPath();
 		ctx.arc(pl.c[0], pl.c[1], pl.r, 0, 2*Math.PI);
 		ctx.strokeStyle = 'rgba(0,0,0,0)';
 		ctx.fill();
 		ctx.stroke();
 		ctx.restore();


 	});
 

 	//Show elements

 	el.forEach(function(ele) {
 		 	ctx.save();

	 	ctx.beginPath();
	 	ctx.arc(ele.c[0], ele.c[1], ele.r, 0, 2*Math.PI);
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.strokeStyle = '#F6E3CE';
		switch (ele.co) {
			case 1:
				ctx.fillStyle = "red";
				break;
			case 2:
				ctx.fillStyle="#0174DF";
				break;
			case 3:
				ctx.fillStyle="#8A4B08";
				break;
			case 4:
				ctx.fillStyle="#BDBDBD";
				break;
		}
		ctx.fill();
	 	ctx.stroke();
	 	ctx.restore();

 	});

 	// Show player

 	ctx.save();

 	ctx.beginPath();
 	ctx.arc(a.c[0], a.c[1], a.r, 0, 2*Math.PI);
	ctx.strokeStyle = 'rgba(0,0,0,0)';
	ctx.strokeStyle = '#F6E3CE';
	ctx.fillStyle = "orange";
	ctx.fill();
 	ctx.stroke();
 	ctx.restore();

	

};

function move(ctx) {
	
	if (a.j != 0) {
		a.t += 0.05;
	for (i=0; i<p.length; i++) {
		if (Math.sqrt(Math.pow(a.c[0]-p[i].c[0], 2)+Math.pow(a.c[1]-p[i].c[1], 2))<=p[i].r) {
			a.p = p[i];
			//Find t
			dr=[a.c[0]-a.p.c[0], a.c[1]-a.p.c[1]];
			a.t=Math.atan2(dr[0],dr[1])+Math.PI;
			
			
			//
			a.j=0;
			a.d=1;
			a.u();
			a.d=0;
			a.x0=0;
		}
	}

	} else if (a.d!=0) {
	a.t += 0.05*a.d;
	}
	a.u();
	// Check if lost

	if ((a.c[0]+a.r<0 || a.c[0]-a.r>W || a.c[1]+a.r<0 || a.c[1]-a.r>H)&&a.j!=0) {
		play=0;
	}

	// Check if touching element

	el.forEach(function(ele) {
		if (ele.d==0&&Math.pow(a.c[0]-ele.c[0], 2)+Math.pow(a.c[1]-ele.c[1], 2)<=Math.pow(a.r+ele.r, 2)) {
			got+=1;
			ele.c=[30+(ele.r+10)*got,30];
			ele.d=1;
			beep(100, 2)
			if (got==4) {
				lv+=1;
				setTimeout(function() {lvl(lv); }, 4000);

			}
		}
	});

}

function nlvl(ctx) {
		ctx.clearRect(0,0,W,H); // clear canvas
		ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "center";
ctx.textBaseline = "bottom";
lvv=lv-1;
text="LEVEL " + lvv + " COMPLETED!";
ctx.fillText(text, 0.5*W, 0.5*H);

}

// The main game loop
var main = function () {
	if (play==-1) {
					ctx.clearRect(0,0,W,H); // clear canvas
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("You've completed all the levels", 130, 180);
	}
	else if (play==1) {
		if (got==4) {
			nlvl(ctx);
		} else {
			move(ctx);//Move player
			//Update planets
			for (i=0;i<p.length;i++) {
				p[i].u();
			}


			render();
		}
	} else {
		ls(ctx);


	}

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

function lvl(l) {
	p=[];
	el=[];
	got=0;
	
	switch (l) {
		case 1:
			p.push(new P(100, 200, 50, 0, 1));
			p.push(new P(500, 300, 200, 0, 3));
			a = new A(100, 200 - 55, p[0]);

			el.push(new E(45, 200, 5, 1));
			el.push(new E(500, 95, 5, 2));
			el.push(new E(295, 300, 5, 3));
			el.push(new E(335, 170, 5, 4));
			break;
		case 2:

			p.push(new P(50, 200, 100, 0, 2));
			p.push(new P(250, 400, 60, 0, 1));
			p.push(new P(250, 0, 60, 0, 3));

			a = new A(100, 200 - 55, p[0]);

			el.push(new E(150, 300, 5, 1));
			el.push(new E(150, 80, 5, 2));
			el.push(new E(250, 150, 5, 3));
			el.push(new E(250, 250, 5, 4));
			break;
		case 3:

			p.push(new P(300, 80, 50, 0, 1));
			p.push(new P(50, 400, 100, 0, 3));
			p.push(new P(500, 400, 50, 1, 3));

			a = new A(100, 200 - 55, p[0]);

			el.push(new E(500, 100, 5, 1));
			el.push(new E(470, 150, 5, 2));
			el.push(new E(250, 150, 5, 3));
			el.push(new E(300, 375, 5, 4));
			break;
		case 4:

			p.push(new P(300, 200, 40, 2, 2));
			p.push(new P(350, 300, 40, 2, 2));
			p.push(new P(400, 50, 20, 3, 1));
			p.push(new P(500, 100, 20, 4, 3));
			
			a = new A(100, 200 - 55, p[0]);

			el.push(new E(580, 380, 5, 1));
			el.push(new E(500, 150, 5, 2));
			el.push(new E(250, 150, 5, 3));
			el.push(new E(300, 375, 5, 4));
			break;
		case 5:

			p.push(new P(50, 380, 100, 0, 2));
			p.push(new P(400, 200, 60, 2, 3));
			p.push(new P(50, 110, 30, 4, 1));
			
			a = new A(100, 200 - 55, p[0]);

			el.push(new E(50, 480, 5, 1));
			el.push(new E(250, 150, 5, 2));
			el.push(new E(200, 180, 5, 3));
			el.push(new E(300, 375, 5, 4));
			break;

		case 6:

			p.push(new P(120, 200, 60, 3, 2));
			p.push(new P(300, 300, 40, 2, 1));
			p.push(new P(300, 50, 40, 5, 1));
			p.push(new P(500, 250, 50, 2, 1));
			
			a = new A(100, 200 - 55, p[0]);

			el.push(new E(400, 150, 5, 1));
			el.push(new E(250, 150, 5, 2));
			el.push(new E(325, 150, 5, 3));
			el.push(new E(300, 375, 5, 4));
			break;
		case 7:

			p.push(new P(50, 385, 100, 0, 3));
			p.push(new P(50, 50, 100, 0, 3));
			p.push(new P(650, 385, 100, 0, 3));
			p.push(new P(600, 50, 100, 0, 3));
			p.push(new P(300, 260, 100, 4, 2));
			
			a = new A(100, 200 - 55, p[0]);

			el.push(new E(50, -50, 5, 1));
			el.push(new E(650, 485, 5, 2));
			el.push(new E(600, -50, 5, 3));
			el.push(new E(300, 410, 5, 4));
			break;
		case 8:
			p.push(new P(100, 200, 20, 0, 3));
			p.push(new P(100, 200, 10, 6, 2));
			p.push(new P(500, 200, 20, 0, 3));
			p.push(new P(500, 200, 10, 6, 2));
			
			a = new A(100, 200 - 55, p[0]);


			el.push(new E(500, 310, 5, 2));
			el.push(new E(500, 230, 5, 3));
			el.push(new E(300, 350, 5, 4));
			break;

		case 9:
			p.push(new P(50, 200, 100, 0, 2));
			p.push(new P(250, 400, 60, 1, 1));
			p.push(new P(250, 600, 60, 1, 1));
			p.push(new P(250, 800, 60, 1, 1));
			p.push(new P(250, 1000, 60, 1, 1));
			p.push(new P(250, 1200, 60, 1, 1));
			p.push(new P(250, 1400, 60, 1, 1));

			p.push(new P(250, 0, 60, 1, 3));

			a = new A(100, 200 - 55, p[0]);

			el.push(new E(150, 300, 5, 1));
			el.push(new E(150, 80, 5, 2));
			el.push(new E(250, 150, 5, 3));
			el.push(new E(250, 250, 5, 4));
			break;

		default:

			play=-1;


	}
}

function init() {
	lv=9;
	lvl(lv);
	main();
}

// Create the canvas
var c = document.createElement("canvas");
var ctx = c.getContext("2d");
H = 400;
W = 600;
c.height = H;
c.width = W;
document.body.appendChild(c);


// RENDER STARS
	var m_canvas = document.createElement('canvas');
m_canvas.width = W;
m_canvas.height = H;
var m_context = m_canvas.getContext('2d');
	  	setStars(m_context);
	  	////

var then = Date.now();
var p=[];
var a;
var play=1;
var el=[];
var got=0;
var lv=1;
ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Go through the planets, and pick the 4", 80, 130);
ctx.fillText("elements that you may find to win points.", 80, 180);
ctx.fillText("Some elements might be 'hidden'.", 100, 230);
ctx.fillText("Use the arrows to move in the planet", 90, 280);
setTimeout(init, 4000);
