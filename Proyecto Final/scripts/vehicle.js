//Slide N° 4
function Wheels(){
	var _radius = 1;
	var acceleration = 2 * _radius * 3.14;
	this.accel = function(){ return acceleration };
	this.setRadius = function(r) { _radius = r; acceleration = 4 * _radius * 3.14 };
	this.getRadius = function(){ return _radius };
	return this;
}

//Slide N° 5
function Nozzle(){
	var _power = 1;
	var _afterBurner = 1;
	var acceleration = _power;
	var _isOnOffAB = false;
	this.onOffAB = function(){
					if(_isOnOffAB){
						_isOnOffAB = false;
					}
					else{
						_isOnOffAB = true;
					}
				};
	this.setPower = function(p) { _power = p; acceleration = p };
	this.getPower = function(){ return _power };
	this.setAB = function(ab) { _afterBurner = ab };
	this.getAB = function(){ return _afterBurner };
	this.isOnOffAB = function(){ return _isOnOffAB };
	this.accel = function(){
		var acc;
		if(_isOnOffAB){
			acc = acceleration * 2;
		}
		else{
			acc = acceleration;
		} 
		return acc;
	}
	return this;
}

//Slide N° 6
function Propeller(){
	var _numOfFins = 1;
	var _spinDirec = 1;
	var acceleration = _numOfFins;
	this.setFins = function(nf) { _numOfFins = nf; acceleration = nf };
	this.getFins = function(){ return _numOfFins };
	this.changeSpinDirec = function(){
		if(_spinDirec === 1){
			_spinDirec = -1;
			_numOfFins = -1 * _numOfFins;
		}
		else{
			_spinDirec = 1;
			_numOfFins = 1 * _numOfFins;
		}
		acceleration = _numOfFins;
	};
	this.getSpindDir = function(){ return _spinDirec };
	this.accel = function(){ return acceleration }
	return this;
}

//Slide N° 2
function vehicle(PU, vmax){
	var _vmax = vmax;
	var _speed = 0;
	var _distance = 0;
	var propUnit = function(i){
			if (i == 1){
				//Wheels
				var obj = new Wheels();
			}
			if (i == 2){
				//Nozzle
				var obj = new Nozzle();
			}
			if (i == 3){
				//Propeller
				var obj = new Propeller();
			}
			return obj;
	};
	return { 
		speed: function(){ return _speed },
		distance: function(){ return _distance },
		propU: propUnit(PU),
		accelerate: function(){
			if( (_speed < _vmax) && ((_speed + this.propU.accel()) < _vmax) ){ 
				_speed = _speed + this.propU.accel();
			}
			else{
				_speed = _vmax;
			}
			_distance = _distance + _speed;
			//console.log(this.speed()); 
		},
		brake: function(){
			_speed = 0;
			_distance = 0;
		}
	};
}

//Slide N° 7
function LandV(rad){
	var ve = new vehicle(1,15000);
	ve.propU.setRadius(rad);
	return {
		accelerate: function(){
			ve.accelerate();
			console.log(this.speed());
		},
		speed: ve.speed,
		distance: ve.distance,
		brake: ve.brake
	}
}

function AirV(pow,ab){
	var ve = new vehicle(2,40000);
	ve.propU.setPower(pow);
	ve.propU.setAB(ab);
	return {
		accelerate: function(){
			ve.accelerate();
			console.log(this.speed());
		},
		onOffAfterBurner: function(){
			ve.propU.onOffAB();
		},
		speed: ve.speed,
		distance: ve.distance,
		brake: ve.brake
	}
}

function WaterV(nf){
	var ve = new vehicle(3,20000);
	ve.propU.setFins(nf);
	return {
		accelerate: function(){
			ve.accelerate();
			console.log(this.speed());
		},
		changeDirec: function(){
			ve.propU.changeSpinDirec();
		},
		speed: ve.speed,
		distance: ve.distance,
		brake: ve.brake
	}
}

//Slide N° 8
//Agregar distance
function HibridV(rad, nf){
	var landV = new LandV(rad);
	var waterV = new WaterV(nf);
	var mode = "land";
	var _speed = 0;
	var super_accelerate = landV.accelerate;
	this.changeMode = function(){
		if(mode === "land"){
			this.__proto__ = waterV;
			super_accelerate = waterV.accelerate;
			mode = "water";
		}
		else{
			this.__proto__ = landV;
			super_accelerate = landV.accelerate;
			mode = "land";
		}
	}
	this.getMode = function(){ return mode; }
	this.accelerate = function(){
		super_accelerate.call(this);
		_speed = landV.speed() + waterV.speed();
		console.log(_speed);
	}
	this.speed = function(){ return _speed; }
	this.brake = function(){ _speed = 0; landV.brake(); waterV.brake(); }
	this.__proto__ = landV;
}
