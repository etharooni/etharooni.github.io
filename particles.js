var booblecanvas=document.getElementById("backgroundboobles");
booblecanvas.width=window.innerWidth;
booblecanvas.height=window.innerHeight;
booblecontext = booblecanvas.getContext('2d');

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){window.setTimeout(callback, 1000 / 60);};
})();

function getRandomColor(){
	var red = Math.floor(Math.random()*255);
	var green = Math.floor(Math.random()*255);
	var blue = Math.floor(Math.random()*255);
	return [red, green, blue];
}
function Particle(color=[0,0,0], initPosition=[0,0], initVelocity=[0,0], size=5){
	this.size = size;
	this.color = color;
	this.position = initPosition;
	this.velocity = initVelocity;
	this.id = particleCount++;
	this.opacity = Math.random()*0.5;
	this.onOffDirection = 1;
	
	this.draw = function(){
		booblecontext.beginPath();
		booblecontext.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.opacity +')';
		booblecontext.arc(this.position[0],this.position[1],this.size,0,2*Math.PI);
		booblecontext.fill();
		booblecontext.closePath();
	}
	this.updatePosition = function(){
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];
		if(this.position[0] > booblecanvas.width){
			this.position[0] -= booblecanvas.width;
		}else if(this.position[0] < 0){
			this.position[0] += booblecanvas.width;
		}
		if (this.position[1] > booblecanvas.height){
			this.position[1] -= booblecanvas.height;
		}else if(this.position[1] < 0){
			this.position[1] += booblecanvas.height;
		}
	}
	this.updateAccel = function(acceleration=[0,0]){
		this.velocity[0] += acceleration[0];
		this.velocity[1] += acceleration[1];
		var speed = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[1]*this.velocity[1]);
		var maxSpeed = 5;
		if (speed > maxSpeed){
			this.velocity[0] = this.velocity[0]/speed * maxSpeed;
			this.velocity[1] = this.velocity[1]/speed * maxSpeed;
		}
		this.updatePosition();
	}
}
var particles = [];
var particleCount = 0;
function initParticle(){
	var particleColor = getRandomColor();
	var initPosition = [Math.random()*booblecanvas.width, Math.random()*booblecanvas.height];
	var initVelocity = [Math.random(),Math.random()];
	var particleSize = Math.random()*7+3;
	var initOpacity = Math.random();
	return new Particle(particleColor, initPosition, initVelocity, particleSize);
}
function initParticles(num){
	for (var i = 0; i < num; i++){
		particles[i] = initParticle();
	}
}
function drawParticles(){
	booblecontext.clearRect(0, 0, booblecanvas.width, booblecanvas.height);
	for (var i = 0; i < particles.length; i++){
		var newXAccel = Math.random()-0.5;
		var newYAccel = Math.random()-0.5;
		particles[i].updateAccel([newXAccel,newYAccel]);
		if(particles[i].onOffDirection == 1){
			particles[i].opacity += (0.02-Math.random()*0.05);
		}else{
			particles[i].opacity += (0.07-Math.random()*0.05);
		}
		if(particles[i].opacity < 0){ //make new particle
			particles[i] = initParticle();
			particles[i].opacity = 0;
			particles[i].onOffDirection = 0;
		}else if(particles[i].opacity > 0.5){
			particles[i].onOffDirection = 1;
		}
		particles[i].draw();
	}
}

var numParticles = 50;
function boobleresize() {
	booblecanvas.width=window.innerWidth;
	booblecanvas.height=window.innerHeight;
	initParticles(numParticles)
}

var particleAnim = setInterval(drawParticles, 40);
initParticles(numParticles);
drawParticles();
window.addEventListener('resize', boobleresize);