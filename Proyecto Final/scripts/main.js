$(document).ready(function(){
	var sx = 0;
	var sy = 0;
	var swidth = 0;
	var sheight = 0;
	var width = 0;
	var height = 0;
	var x = 0;
	var y = 0;
	var vehicle = {};
	var vx = 20;
	var vy = 0;
	var mover = function (){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg2');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(x === 0 || (x + canvas.width) <= 0){
			if( (x + canvas.width) <= 0){
				while( x + canvas.width < 0){
					x += canvas.width;
				}
			}
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		if(x < 0 && (x + canvas.width) > 0){
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		if(vx < 100){
			vx += 10;
		}
		//ctx.drawImage(v,740,0,90,50,20,90,55,40);
		ctx.drawImage(v,70,0,98,40,vx,vy,80,35);
	}
	$(document).keydown(function(e){
        if(e.which == 39){
        	if(vehicle){
        		vehicle.accelerate();
        		// if (x < -30){
        		// 	x -= 30;
        		// }
        		// else{
        		// 	x -= vehicle.speed();
        		// }
        		x -= vehicle.distance();
        		while( x + canvas.width < 0){
					x += canvas.width;
				}
        		mover();
        	}
        }
    });
	$("#car").click(function(){
		vehicle = new LandV(4);
		vx = 20;
		vy = 85;
		sx = 42;
		sy = 0;
		swidth = 670;
		sheight = 224;
		width = 720;
		height = 224;
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg2');
		v = document.getElementById('vehicle2');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(x === 0 || (x+canvas.width) === 0){
			if((x+canvas.width) === 0){
				x = 0;
			}
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		}
		if(x < 0 && (x+canvas.width) > 0){
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		//ctx.drawImage(v,740,0,90,50,20,90,55,40);
		ctx.drawImage(v,70,0,100,40,vx,vy,80,35);
		//ctx.drawImage(v,sx,sy,swidth,sheight,x,y,width,height);
	});
	$("#ship").click(function(){
		//$("#canvas").addClass("canvas");
		//$("#canvas").addClass("waterBG");
		vehicle = new WaterV(6);
		vx = 20;
		vy = 75;
		sx = 330;//parseInt($('#sx').val());
		sy = 70;//parseInt($('#sy').val());
		swidth = 608;//parseInt($('#swidth').val());
		sheight = 180;//parseInt($('#sheight').val());
		width = 720;//parseInt($('#width').val());
		height = 224;//parseInt($('#height').val());
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg2');
		v = document.getElementById('vehicle2');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(x === 0 || (x+canvas.width) === 0){
			if((x+canvas.width) === 0){
				x = 0;
			}
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		}
		if(x < 0 && (x+canvas.width) > 0){
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		//ctx.drawImage(v,740,0,90,50,20,90,55,40);
		ctx.drawImage(v,70,0,100,40,vx,vy,80,35);
		//ctx.drawImage(v,sx,sy,swidth,sheight,x,y,width,height);
	});
	$("#plane").click(function(){
		//$("#canvas").addClass("canvas");
		//$("#canvas").addClass("airBG");
		//$("#canvas").addClass("canvas");
		//$("#canvas").addClass("waterBG");
		vehicle = new AirV(6);
		vx = 20;
		vy = 55;
		sx = 30;//parseInt($('#sx').val());
		sy = 0;//parseInt($('#sy').val());
		swidth = 480;//parseInt($('#swidth').val());
		sheight = 130;//parseInt($('#sheight').val());
		width = 720;//parseInt($('#width').val());
		height = 224;//parseInt($('#height').val());
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg2');
		v = document.getElementById('vehicle2');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(x === 0 || (x+canvas.width) === 0){
			if((x+canvas.width) === 0){
				x = 0;
			}
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		}
		if(x < 0 && (x+canvas.width) > 0){
			ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		//ctx.drawImage(v,740,0,90,50,20,90,55,40);
		ctx.drawImage(v,70,0,100,40,vx,vy,80,35);
		//ctx.drawImage(v,sx,sy,swidth,sheight,x,y,width,height);
	});
	$("#drawcar").click(function(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		v = document.getElementById('vehicle2');
		sxv = parseInt($('#sx').val());
		syv = parseInt($('#sy').val());
		swidthv = parseInt($('#swidth').val());
		sheightv = parseInt($('#sheight').val());
		xv = parseInt($('#x').val());
		yv = parseInt($('#y').val());
		widthv = parseInt($('#width').val());
		heightv = parseInt($('#height').val());
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(v,sxv,syv,swidthv,sheightv,xv,yv,widthv,heightv);
	});
});