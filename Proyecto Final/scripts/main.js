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
	var type = "";
	var ab = false;
	var sd = 1;
	var hibMode = "Land";
	var mover = function (){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg2');
		if(type === "hibrid"){
			img = document.getElementById('bg3');
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		if(type==="ship" && sd === -1){
			ctx.drawImage(img,sx,sy,swidth,sheight,x-canvas.width,y,width,height);
		}
		else{
			ctx.drawImage(img,sx,sy,swidth,sheight,x+canvas.width,y,width,height);
		}
		if(vx < 100){
			vx += 10;
		}
		if(type === "car"){
			ctx.drawImage(v,70,0,98,40,vx,vy,80,35);
		}
		if(type === "ship"){
			ctx.drawImage(v,0,0,90,40,vx,vy,70,35);
		}
		if(type === "plane"){
			ctx.drawImage(v,70,0,100,75,vx,vy,75,55);
		}
		if(type === "hibrid"){
			ctx.drawImage(v,0,0,573,233,vx,vy,80,40);
		}
		ctx.font = "12px Arial";
		ctx.fillText("Vel: " + (vehicle.speed() / 100).toFixed(0) + " KM/H",5,10);
		ctx.fillText("Distance: " + (vehicle.distance() / 1000).toFixed(0) + " mts",120,10);
		if(type === "plane"){
			var isab = "OFF";
			if(ab){
				isab = "ON"
			}
			ctx.fillText("AfterBurner: " + isab,5,145);
		}
		if(type === "ship" || (type === "hibrid" && hibMode === "Water")){
			ctx.fillText("Spin Direction: " + sd,5,145);
		}
		if(type === "hibrid"){
			ctx.fillText("Mode: " + hibMode,200,145);
		}
	}
	$(document).keydown(function(e){
		//Right Arrow. Accelerate the vehicle
        if(e.which === 39){
        	if(vehicle){
        		vehicle.accelerate();
        		//x -= Math.abs(vehicle.distance());
         		if(type === "ship" && sd === -1){
    	 			x += Math.abs(vehicle.distance());
         			while( x - canvas.width > 0){
					 	x -= canvas.width;
					}
         		}
         		else{
        			x -= Math.abs(vehicle.distance());
        			while( x + canvas.width < 0){
						x += canvas.width;
					}
        		}
        		mover();
        	}
        }
        //Spacebar. For ship, it will change the spin direcction
        if(e.which === 32 && (type === "ship" || (type === "hibrid" && hibMode === "Water")) ){
        	vehicle.brake();
        	vehicle.changeDirec();
        	if(sd === 1){
        		sd = -1;
        	}
        	else{
        		sd = 1;
        	}
        	x=0;
        }
        //Spacebar. For plane, it will on/off the afterburner
        if(e.which === 32 && type === "plane"){
        	vehicle.brake();
        	vehicle.onOffAfterBurner();
        	if(!ab){
        		ab = true;
        	}
        	else{
        		ab = false;
        	}
        }
        //Arrow bottom. For Hibrid. It will change beetween land mode and water mode.
        if(e.which === 40 && type === "hibrid"){
        	vehicle.brake();
        	vehicle.changeMode();
        	if(hibMode === "Land"){
        		hibMode = "Water";
        	}
        	else{
        		hibMode = "Land";
        	}
        }
    });
    $(document).keyup(function(e){
    	if(vehicle){
    		vehicle.brake();
    		mover();
    	}
    });
	$("#car").click(function(){
		vehicle = new LandV(30);
		type = "car";
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
		ctx.drawImage(v,70,0,100,40,vx,vy,80,35);
	});
	$("#ship").click(function(){
		vehicle = new WaterV(20);
		sd = 1;
		type = "ship";
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
		v = document.getElementById('vehicle4');
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
		ctx.drawImage(v,0,0,90,40,vx,vy,70,35);
	});
	$("#plane").click(function(){
		vehicle = new AirV(250);
		type = "plane";
		ab = false;
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
		v = document.getElementById('vehicle3');
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
		ctx.drawImage(v,70,0,100,75,vx,vy,75,55);
	});
	$("#overcraft").click(function(){
		vehicle = new HibridV(6);
		type = "hibrid";
		sd = 1;
		ab = false;
		vx = 20;
		vy = 54;
		sx = 100;//parseInt($('#sx').val());
		sy = 0;//parseInt($('#sy').val());
		swidth = 720;//parseInt($('#swidth').val());
		sheight = 300;//parseInt($('#sheight').val());
		width = 400;//parseInt($('#width').val());
		height = 224;//parseInt($('#height').val());
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		img = document.getElementById('bg3');
		v = document.getElementById('vehicle5');
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
		ctx.drawImage(v,0,0,573,233,vx,vy,80,40);
	});
	$("#drawcar").click(function(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		v = document.getElementById('vehicle5');
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