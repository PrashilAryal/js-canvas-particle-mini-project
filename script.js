const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const particlesarray = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const ballPosition = {
  x: undefined,
  y: undefined,
  color: undefined,
};

class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
    this.x_speed = 1;
    this.y_speed = 1;
    this.radiusChange = 0.5; // Random rate of radius change
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
  }

  move() {
    this.x = this.x + this.x_speed;
    this.y = this.y + this.y_speed;

    if (this.x + this.radius > canvas.width) {
      this.x_speed = -1;
    } else if (this.x - this.radius < 0) {
      this.x_speed = 1;
    }
    if (this.y + this.radius > canvas.height) {
      this.y_speed = -1;
    } else if (this.y - this.radius < 0) {
      this.y_speed = 1;
    }
  }

  shake() {
    this.x += Math.random() * (1 - -1) + -1;
    this.y += Math.random() * (1 - -1) + -1;
  }

  changeRadius() {
    this.radius += this.radiusChange;
    if (this.radius < 20) {
      this.radiusChange = Math.abs(this.radiusChange);
    } else if (this.radius > 25) {
      this.radiusChange = -Math.abs(this.radiusChange);
    }
  }

  generateParticles() {
    ballPosition.x = this.x;
    ballPosition.y = this.y;
    ballPosition.color = this.color;
    console.log(this.x, this.y);
    for (let i = 0; i < 1; i++) {
      particlesarray.push(new Particles());
    }
  }

  update() {
    this.draw();
    this.move();
    this.changeRadius();
    this.generateParticles();
  }
}

class Particles {
  // setup the size and speed of particles
  constructor() {
    this.x = ballPosition.x;
    this.y = ballPosition.y;
    this.color = ballPosition.color;
    this.radius = Math.random() * (10 - 5) + 5;
    // this.speedX = Math.random() * 3 - 1.5;
    // this.speedY = Math.random() * 3 - 1.5;
    this.speedX = Math.random() * (1 - -1) + -1;
    this.speedY = Math.random() * (1 - -1) + -1;
    this.radiusChange = 0.5;
  }

  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.radius > 0.2) {
      this.radius -= 0.1;
    }
  }

  shake() {
    this.x += Math.random() * (1 - -1) + -1;
    this.y += Math.random() * (1 - -1) + -1;
  }

  update() {
    this.draw();
    this.move();
    this.shake();
  }
}

function handleparticles() {
  //making loop for creating more than one particles
  for (let i = 0; i < particlesarray.length; i++) {
    particlesarray[i].update();
    particlesarray[i].draw();
    if (particlesarray[i].size <= 0.3) {
      particlesarray.splice(i, 1);
      i--;
    }
  }
}

const ball = new Ball(50, 100, 25, "red");
const ball2 = new Ball(50, 300, 25, "blue");

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  handleparticles();

  ball.update();
  ball2.update();
  requestAnimationFrame(animate);
}
animate();
