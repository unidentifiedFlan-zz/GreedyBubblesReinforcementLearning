let box;
let bubbles;
let NUMBUBBLES = 25;
let bubbleSize = 5;

let width = 700;
let height = 600;

let locGrid;
let gridUnit = 100;

function setup() {
  createCanvas(width, height);
  background(255);
  box = createVector(width, height);

  locGrid = new Array(1 + width / gridUnit);
  for (let i = 0; i < locGrid.length; i++) {
    locGrid[i] = new Array(1 + height / gridUnit);
    for (let j = 0; j < locGrid[i].length; j++) {
      locGrid[i][j] = [];
    }
  }

  bubbles = [];
  for (let i = 0; i < NUMBUBBLES; i++) {
    let iPos = createVector(random(width), random(height));
    let iVel = createVector(randomGaussian(0, 4), randomGaussian(0, 4));
    let iCol = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
    bubbles.push(new Bubble(i, iPos, iVel, bubbleSize, iCol));
  }
}

function draw() {

  calculateCollisions();
  
  background(250);
  bubbles.forEach((bubble, index) => {
    if (bubble.count !== 0) {
      bubble.updateTarget(bubbles);
      bubble.update(box);
      fill(color(bubble.color.r, bubble.color.g, bubble.color.b));
      circle(bubble.pos.x, bubble.pos.y, bubble.size());
    }
  });
}

function findGridSquare(bubble) {
  let indices = p5.Vector.div(bubble.pos, gridUnit);
  let square = createVector(floor(indices.x), floor(indices.y));
  return square;
}

function calculateCollisions() {
  for (let i = 0; i < locGrid.length; i++) {
    for (let j = 0; j < locGrid[i].length; j++) {
      locGrid[i][j] = [];
    }
  }

  bubbles.forEach((bubble, index) => {
    let square = findGridSquare(bubble);
    locGrid[square.x][square.y].push(index);
  });

  bubbles.forEach((bubble, bubbleIndex) => {
    let squareIndices = findGridSquare(bubble);
    let square = locGrid[squareIndices.x][squareIndices.y];

    for (let i = 0; i < square.length; i++) {
      let otherIndex = square[i];
      if (bubbleIndex === otherIndex) {
        continue;
      }

      let other = bubbles[otherIndex];

      if (Collision.valid(bubble, other) && other.count !== 0) {
        let collision = new Collision(bubble, other);
      };
    }
  });
}

class Bubble {
  constructor(id, pos, vel, size, col) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.baseSize = size;
    this.color = col;
    this.count = 1;
    this.maxSpeed = 5;
    this.maxAcceleration = 0.1;
    this.eatenBubbles = [];
    this.target = pos;
    this.cosFOV = cos(PI/4);
  }

  size() {
    return this.count * this.baseSize;
  }

  seekTarget() {
    let mousePos = createVector(this.target.x, this.target.y);
    let dir = p5.Vector.sub(mousePos, this.pos).normalize();
    let desiredVel = dir.mult(this.maxSpeed);
    let acceleration = desiredVel.sub(this.vel);
    acceleration.limit(this.maxAcceleration);
    this.vel.add(acceleration);
  }
  
  inFieldOfVision(bubble) {
      let objDir = p5.Vector.sub(bubble.pos, this.pos).normalize();
      let tDir = this.vel.copy().normalize();
      let cosTheta = tDir.dot(objDir);
      
      return cosTheta < this.cosFOV;
  }
  
  updateTarget(bubbles) {   
      let maxTargets = 4;
    
      let targets = bubbles.filter(bubble => this.inFieldOfVision(bubble));
      if(targets.length > maxTargets) {
          let comparator = (a, b) => { return p5.Vector.sub(a.pos,this.pos).mag() < p5.Vector.sub(b.pos, this.pos).mag(); };
        targets = targets.slice(0, maxTargets);
      }
      
    //insert convnet here
    
    this.target = createVector(mouseX, mouseY);
  }

  update(box) {
    if(mouseIsPressed) {
        this.seekTarget();
    }
    
    if (p5.Vector.mag(this.vel) > this.maxSpeed) {
      this.vel = this.vel.normalize().mult(this.maxSpeed);
    }

    this.pos.add(this.vel);

    if (this.pos.x < this.size() / 2 || this.pos.x > box.x - this.size() / 2) {
      this.vel.x = -this.vel.x;
      if (this.pos.x < 0) {
        this.pos.x = 0;
      }
      if (this.pos.x > box.x - this.size() / 2) {
        this.pos.x = box.x - this.size() / 2;
      }
    }
    if (this.pos.y < this.size() / 2 || this.pos.y > box.y - this.size() / 2) {
      this.vel.y = -this.vel.y;
      if (this.pos.y < 0) {
        this.pos.y = 0;
      }
      if (this.pos.y > box.y - this.size() / 2) {
        this.pos.y = box.y - this.size() / 2;
      }
    }
  }

  absorb(bubble) {
    this.count += bubble.count;
    bubble.count = 0;
    this.eatenBubbles = this.eatenBubbles.concat(bubble.eatenBubbles);
    bubble.eatenBubbles = [];
    this.eatenBubbles.push(bubble);
  }

  pop(emittedSpeed, bulkVel) {

    let numToEmit = this.count - 1;
    for (let i = 1; i <= numToEmit; i++) {
      let rad = TWO_PI * i / this.count;
      let iPos = this.pos.copy();
      let iVel = createVector(sin(rad), cos(rad));
      iVel.mult(emittedSpeed);
      iVel.add(bulkVel);
      this.ejectBubble(iPos, iVel);
    }

    this.vel = createVector(0, emittedSpeed);
    this.vel.add(bulkVel);
  }

  ejectBubble(pos, vel) {
    let bubble = this.eatenBubbles.pop();
    bubble.count = 1;
    bubble.pos = pos;
    bubble.vel = vel;
    this.count--;
    return bubble;
  }
}

class Collision {
  static valid(obj1, obj2) {
    let diff = p5.Vector.sub(obj1.pos, obj2.pos);
    let magnitude = diff.mag();
    let collisionDirection = p5.Vector.sub(obj2.pos, obj1.pos);
    let tMom = p5.Vector.dot(obj1.vel, collisionDirection);
    let oMom = p5.Vector.dot(obj2.vel, collisionDirection);

    return magnitude < obj1.size() / 2 + obj2.size() / 2 && (tMom > 0 || oMom < 0);
  }

  constructor(obj1, obj2) {
    if (obj1.count === 0 || obj2.count === 0) {
      return;
    }

    let posDiff = p5.Vector.sub(obj2.pos, obj1.pos);
    let tCollMomentum = p5.Vector.mult(obj1.vel, obj1.count);
    let tCollMomentumDir = p5.Vector.dot(posDiff, tCollMomentum);
    let oCollMomentum = p5.Vector.mult(obj2.vel, obj2.count);
    let oCollMomentumDir = -p5.Vector.dot(posDiff, oCollMomentum);

    if (tCollMomentumDir >= oCollMomentumDir) {
      this.attack(obj1, obj2);
    }
  }

  attack(obj1, obj2) {

    if (obj1.count < obj2.count) {
      this.bounce(obj1, obj2);
    } else {
      this.absorb(obj1, obj2);
    }
  }

  bounce(obj1, obj2) {
    let popObj = false;
    let emittedSpeed = 6;

    //Quadratic formula to calculate final velocities
    //from collision. Only need to worry about momentum
    //parallel to collision direction. Rest is conserved.
    let collisionDirection = p5.Vector.sub(obj2.pos, obj1.pos);
    collisionDirection.normalize();
    let tParSpeed = p5.Vector.dot(obj1.vel, collisionDirection);
    let oParSpeed = p5.Vector.dot(obj2.vel, collisionDirection);

    let a = -obj2.count - sq(obj2.count) / obj1.count;
    let b = tParSpeed * (2 * obj2.count) + oParSpeed * (2 * sq(obj2.count) / obj1.count);
    let c1 = oParSpeed * oParSpeed * (obj2.count - sq(obj2.count) / obj1.count);
    let c2 = -2 * tParSpeed * oParSpeed * obj2.count;
    let c = c1 + c2;

    let quadFactor = b * b - 4 * c * a;
    if (quadFactor > 4 * a * obj2.count * sq(emittedSpeed)) {
      quadFactor -= obj2.count * sq(emittedSpeed);
      popObj = true;
    }

    let bulkSpeed = (sqrt(b * b - 4 * c * a) - b) / (a * 2);

    let bulkVel = obj2.vel.add(p5.Vector.mult(collisionDirection, bulkSpeed - oParSpeed));

    let tiMomentum = (tParSpeed - bulkSpeed) * obj1.count;
    let oiMomentum = (oParSpeed - bulkSpeed) * obj2.count;

    let tfSpeed = (tiMomentum + oiMomentum) / obj1.count + bulkSpeed;

    obj1.vel.add(p5.Vector.mult(collisionDirection, tfSpeed - tParSpeed));

    if (popObj) {
      obj2.pop(emittedSpeed, bulkVel);
    } else {
      obj2.vel.add(p5.Vector.mult(collisionDirection, bulkSpeed - tParSpeed));
    }
  }

  absorb(obj1, obj2) {
    let tCollMomentum = p5.Vector.mult(obj1.vel, obj1.count);
    let oCollMomentum = p5.Vector.mult(obj2.vel, obj2.count);
    obj1.vel = p5.Vector.add(tCollMomentum, oCollMomentum).div(obj1.count + obj2.count);
    obj1.absorb(obj2);
  }
}