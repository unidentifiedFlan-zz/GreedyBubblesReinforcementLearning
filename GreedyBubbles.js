let box;
let bubbles;
let NUMBUBBLES = 10;

let width = 700;
let height = 600;

let locGrid;
let gridUnit = 100;

var trainingVersion = true;
var generationCounter = 0;

var initGeneJSON = '{"fitness":0.01,"nTrial":0,"gene":{"0":-0.076,"1":0.0061,"2":0.029,"3":-0.0803,"4":0.0685,"5":-0.0602,"6":0.0758,"7":-0.0033,"8":-0.0705,"9":-0.0226,"10":-0.1084,"11":0.0145,"12":0.017,"13":0.0454,"14":-0.0139,"15":-0.0259,"16":-0.0578,"17":0.0556,"18":-0.0208,"19":-0.062,"20":-0.0739,"21":0.0582,"22":0.0237,"23":0.1144,"24":0.0054,"25":0.0426,"26":-0.0916,"27":-0.0455,"28":0.0294,"29":0.0298,"30":-0.0363,"31":-0.0131,"32":-0.0364,"33":0.0377,"34":0.0462,"35":0.0129,"36":0.1307,"37":0.0443,"38":0.0333,"39":0.0628,"40":-0.0452,"41":-0.0038,"42":-0.0328,"43":0.0477,"44":-0.1068,"45":-0.0631,"46":0.008,"47":0.0513,"48":0.0431,"49":0.0602,"50":0.0808,"51":-0.0168,"52":-0.0409,"53":0.0329,"54":0.0582,"55":0.0133,"56":-0.1149,"57":0.0248,"58":0.03,"59":0.0143,"60":0.0029,"61":0.0315,"62":0.0666,"63":0.0384,"64":0.019,"65":-0.0169,"66":-0.065,"67":0.0431,"68":-0.0047,"69":0.0421,"70":0.0093,"71":0.0404,"72":-0.0931,"73":0.0209,"74":0.1321,"75":-0.085,"76":-0.0409,"77":0.0057,"78":-0.067,"79":0.0765,"80":-0.0077,"81":0.0084,"82":-0.0038,"83":-0.0487,"84":-0.0313,"85":-0.0447,"86":0.0353,"87":-0.0665,"88":-0.0281,"89":-0.035,"90":-0.118,"91":0.0626,"92":-0.0426,"93":-0.1093,"94":-0.0548,"95":-0.0112,"96":0.0357,"97":0.01,"98":-0.0601,"99":-0.1116,"100":-0.0061,"101":-0.1054,"102":0.0603,"103":-0.0426,"104":-0.1496,"105":-0.028,"106":-0.0284,"107":-0.0054,"108":-0.0223,"109":0.0848,"110":-0.0167,"111":0.0434,"112":0.0111,"113":0.0947,"114":0.0002,"115":0.0244,"116":0.0577,"117":0.087,"118":-0.0084,"119":-0.0897,"120":-0.0277,"121":-0.003,"122":-0.1134,"123":0.0533,"124":0.0824,"125":0.1475,"126":-0.0044,"127":-0.0127,"128":-0.0431,"129":0.1488,"130":0.0557,"131":0.0058,"132":0.0314,"133":0.0298,"134":-0.0727,"135":0.0057,"136":-0.1015,"137":0.0576,"138":0.0299,"139":-0.0073,"140":-0.0454,"141":0.0714,"142":0.011,"143":0.0274,"144":-0.0186,"145":-0.0005,"146":0.0434,"147":0.03,"148":0.0474,"149":0.0141,"150":0.0033,"151":-0.0002,"152":-0.0772,"153":-0.0829,"154":0.113,"155":0.099,"156":0.0541,"157":0.0052,"158":0.0289,"159":0.0136,"160":0.0127,"161":0.0136,"162":-0.038,"163":-0.0227,"164":-0.0928,"165":0.0807,"166":-0.0276,"167":-0.0128,"168":-0.0122,"169":-0.0338,"170":0.0218,"171":0.0018,"172":-0.0626,"173":0.004,"174":0.026,"175":-0.0161,"176":-0.0478,"177":0.064,"178":0.0579,"179":-0.0129,"180":-0.049,"181":0.0229,"182":0.0513,"183":0.0122,"184":-0.0061,"185":-0.0159,"186":0.0004,"187":-0.029,"188":-0.0386,"189":-0.081,"190":0.0701,"191":-0.0048,"192":0.0094,"193":0.042,"194":-0.0334,"195":0.0155,"196":-0.0012,"197":-0.0125,"198":0.0632,"199":-0.036,"200":0.0598,"201":-0.0448,"202":0.0036,"203":-0.0173,"204":0.0935,"205":0.0626,"206":-0.0434,"207":0.0345,"208":0.0113,"209":-0.0554,"210":0.0099,"211":-0.0912,"212":0.0452,"213":0.0222,"214":-0.0078,"215":0.0017,"216":-0.057,"217":-0.0421,"218":0.0339,"219":0.0037,"220":-0.0928,"221":-0.0026,"222":0.0341,"223":-0.038,"224":0.0308,"225":0.0843,"226":-0.1073,"227":-0.0392,"228":0.0145,"229":0.0099,"230":-0.0661,"231":0.0528,"232":0.0104,"233":0.0087,"234":0.1055,"235":0.0027,"236":0.0731,"237":-0.0432,"238":0.0134,"239":0.0202,"240":-0.0067,"241":-0.0815,"242":0.1355,"243":-0.0021,"244":-0.0077,"245":0.0881,"246":0.0809,"247":-0.0351,"248":-0.0041,"249":-0.0446,"250":0.0105,"251":0.0284,"252":-0.0256,"253":-0.0035,"254":-0.0986,"255":-0.056,"256":-0.0437,"257":0.053,"258":-0.0401,"259":-0.1024,"260":-0.0704,"261":0.0663,"262":-0.09,"263":-0.0638,"264":-0.0722,"265":-0.0138,"266":-0.0165,"267":-0.1347,"268":-0.1136,"269":0.0468,"270":-0.0311,"271":0.0747,"272":-0.0335,"273":-0.0227,"274":0.0219,"275":0.1116,"276":0.0098,"277":-0.0208,"278":-0.067,"279":-0.002,"280":0.0973,"281":-0.0783,"282":0.035,"283":0.0709,"284":-0.0447,"285":-0.0536,"286":0.0258,"287":0.1458,"288":0.0288,"289":-0.0823,"290":0.0523,"291":-0.0076,"292":-0.0122,"293":0.1095,"294":0.0496,"295":-0.0491,"296":-0.0462,"297":-0.095,"298":0.0386,"299":0.1181,"300":0.0082,"301":-0.0764,"302":0.0103,"303":0.0346,"304":-0.0839,"305":0.055,"306":0.0787,"307":0.0261,"308":-0.004,"309":0.0087,"310":0.0031,"311":0.0465}}'
var initGeneRaw = JSON.parse(initGeneJSON);

var initGene = convnetjs.zeros(Object.keys(initGeneRaw.gene).length); // Float64 faster.
//initGene = new convnetjs.Vol(1, 1, (38+1)*8).w;

for (var i = 0; i < initGene.length; i++) {
  initGene[i] = initGeneRaw.gene[i];
}

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
  
  bubbles = createBubbles(NUMBUBBLES);
  trainer = new Trainer(bubbles[0].brain, initGene);
  
  bubbles.forEach(bubble =>
  {
      bubble.brain.populate(trainer.getChromosome());
  });
}

function createBubbles(num) {
  
  let bubbleSize = 5;
  
  bubbles = [];
  for (let i = 0; i < num; i++) {
    let iPos = createVector(random(width), random(height));
    let iVel = createVector(randomGaussian(0, 4), randomGaussian(0, 4));
    let iCol = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
    bubbles.push(new Bubble(i, iPos, iVel, bubbleSize, iCol));
  }
  
  return bubbles;
}

function draw() {

  calculateCollisions();
  
  background(250);
  let result = run(1, bubbles);
  
  if (result !== -1 && trainingVersion) { // someone has lost
    var genStep = 15;//50;
    console.log('training generation #'+(generationCounter+genStep));
    for (var i = 0; i < genStep; i++) {
      trainer.train();
    }
    // print results
    for (i = 0; i < 4; i++) {
        console.log('#'+i+':'+Math.round(100*trainer.getChromosome(i).fitness)/100);
    }
    var N = trainer.trainer.population_size;
    for (i = N-4; i < N; i++) {
      console.log('#'+i+':'+Math.round(100*trainer.getChromosome(i).fitness)/100);
    }
    if (trainingVersion) {
      //$("#nn_gene").text(JSON.stringify(trainer.getChromosome()));
      console.log('--- start trained gene ---');
      console.log(JSON.stringify(trainer.getChromosome()));
      console.log('--- end of trained gene---');
    }
    generationCounter += genStep;
    bubbles = createBubbles(NUMBUBBLES);
    for(let i = 0; i < NUMBUBBLES; i++)
    {
        bubbles[i].brain.populate(trainer.getChromosome(i));
    }
  }
  
  bubbles.forEach((bubble, index) => {
      fill(color(bubble.color.r, bubble.color.g, bubble.color.b));
      circle(bubble.pos.x, bubble.pos.y, bubble.size());
      textSize(32);
      text(bubble.id, bubble.pos.x+bubble.size()/2, bubble.pos.y);
  });
}

function run(frames, bubbles) {
    for(let i = 0; i < frames; i++) {
      bubbles.forEach(bubble =>
      {
          if (bubble.count !== 0) {
              bubble.updateTarget(bubbles);
              bubble.update(box);
          }
      });
    }

    let id = -1;
    for(let i = 0; i < bubbles.length; i++)
    {
        if(bubbles[i].count > 0) {
          if(id > -1) {
            return -1;
          }
          id = bubbles[i].id;
        }
    }
  
    return id;
}

function trainRun(chromosomes) { 
  var result = -1;
  trainingMode = true;

  bubbles = createBubbles(NUMBUBBLES);
  for(let i = 0; i < NUMBUBBLES; i++)
  {
      bubbles[i].brain.populate(chromosomes[i]);
  }
  
  let trainingFrames = 14000;
  result = run(trainingFrames, bubbles);
  trainingMode = false;
  return result;
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
    this.maxSpeed = 10;
    this.maxAcceleration = 0.1;
    this.eatenBubbles = [];
    this.target = pos;
    this.cosFOV = cos(PI/4);
    this.maxTargets = 4;
    this.brain = new Brain(this.maxTargets);
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
      if(bubble.id === this.id || bubble.count === 0) {
        return false;
      }

      //360 degree vision when standing still
      if(this.vel.mag() === 0) {
        return true;
      }

      let objDir = p5.Vector.sub(bubble.pos, this.pos).normalize();
      let tDir = this.vel.copy().normalize();
      let cosTheta = tDir.dot(objDir);

      return cosTheta > this.cosFOV;
  }
  
  updateTarget(bubbles) {   
      let targets = bubbles.filter(bubble => this.inFieldOfVision(bubble));

      if(targets.length > this.maxTargets) {
          let comparator = (a, b) => { return p5.Vector.sub(a.pos,this.pos).mag() < p5.Vector.sub(b.pos, this.pos).mag(); };
          targets.sort(comparator);
          targets = targets.slice(0, this.maxTargets);
      }

      this.brain.setCurrentInputState(this, targets);
      this.brain.forward();
//      const sum = this.brain.outputState.reduce((sum, val) => sum + val,0)
//      this.brain.outputState = this.brain.outputState.map((x) => x/sum );

      let threshold = 0.7;
      var degreeRotation = 0;
      if(this.brain.outputState[0] > threshold) {
          degreeRotation = PI/2;
      }
      if(this.brain.outputState[1] > threshold) {
          degreeRotation = -PI/2;
      }

      let acceleration = 0;
      if(this.brain.outputState[2] > threshold) {
          acceleration = this.maxAcceleration;
      }
      if(this.brain.outputState[3] > threshold) {
          acceleration = -this.maxAcceleration
      }
    
     //this.target = p5.Vector.add(this.pos, this.vel.copy().normalize().rotate(degreeRotation).mult(acceleration));
     this.vel = this.vel.add(this.vel.copy().normalize().rotate(degreeRotation).mult(acceleration));
  }

  update(box) {
    //this.seekTarget();
    
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
    let oCollMomentumDir = p5.Vector.dot(posDiff, oCollMomentum);

    if(tCollMomentumDir > 0 || oCollMomentumDir > 0) {

      if (tCollMomentumDir >= oCollMomentumDir) {
        this.attack(obj1, obj2);
      }
      else {
        this.attack(obj2, obj1);
      }
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

class Brain {
    constructor(maxTargets) {
      "use strict";
      this.nGameInput = (maxTargets)*7 + 2; //(position, velocity and size of targets and self) 
      this.nGameOutput = 4; //45 degree angles for targets
      this.nRecurrentState = 4; // extra recurrent states for feedback.
      this.nOutput = this.nGameOutput+this.nRecurrentState;
      this.nInput = this.nGameInput+this.nOutput;

      // store current inputs and outputs
      this.inputState = convnetjs.zeros(this.nInput);
      this.convInputState = new convnetjs.Vol(1, 1, this.nInput);
      this.outputState = convnetjs.zeros(this.nOutput);
      this.prevOutputState = convnetjs.zeros(this.nOutput);

      // setup neural network:
      this.layer_defs = [];
      this.layer_defs.push({
        type: 'input',
        out_sx: 1,
        out_sy: 1,
        out_depth: this.nInput
      });
      this.layer_defs.push({
        type: 'fc',
        num_neurons: this.nOutput,
        activation: 'relu'
      });

      this.net = new convnetjs.Net();
      this.net.makeLayers(this.layer_defs);

      var chromosome = new convnetjs.Chromosome(initGene);
      chromosome.pushToNetwork(this.net);
    }
  
    populate(chromosome) { // populate network with a given chromosome.
      chromosome.pushToNetwork(this.net);
    }

    setCurrentInputState(bubble, targets) {
      "use strict";
      let i;
      let scaleFactor = 10; // scale inputs to be in the order of magnitude of 10.
      let scaleFeedback = 1; // to scale back up the feedback.
      this.inputState[0] = bubble.vel.mag();
      this.inputState[1] = bubble.count;
      
      let index = 2;
      targets.forEach(target => 
      {
          let posDiff = p5.Vector.sub(target.pos, bubble.pos);
          let velDiff = p5.Vector.sub(target.vel, bubble.vel);
          this.inputState[index++] = posDiff.mag();
          this.inputState[index++] = posDiff.normalize().dot(bubble.vel);
          this.inputState[index++] = posDiff.normalize().cross(bubble.vel).z;
          this.inputState[index++] = velDiff.mag();
          this.inputState[index++] = velDiff.normalize().dot(bubble.vel);
          this.inputState[index++] = velDiff.normalize().cross(bubble.vel).z;
          this.inputState[index++] = target.count;
      });

      while(index < this.nGameInput) {
          this.inputState[index] = -1;
          index++;
      }

      for (i = 0; i < this.nOutput; i++) { // feeds back output to input
        this.inputState[i+this.nGameInput] = this.outputState[i]*scaleFeedback*1; 
      }

      for (i = 0; i < this.nInput; i++) { // copies input state into convnet cube object format to be used later.
        this.convInputState.w[i] = this.inputState[i];
      }

    }
  
    forward() {
      "use strict";
      // get output from neural network:
      var a = this.net.forward(this.convInputState);

      for (var i = 0; i < this.nOutput; i++) {
        this.prevOutputState[i] = this.outputState[i]; // backs up previous value.
        this.outputState[i] = a.w[i];
      }
    }
}

class Trainer {
  constructor(brain, initialGene) {
  // trainer for neural network interface.  must pass in an initial brain so it knows the net topology.
  // the constructor won't modify the brain object passed in.

  this.net = new convnetjs.Net();
  this.net.makeLayers(brain.layer_defs);

  this.trainer = new convnetjs.GATrainer(this.net, {
      num_opponents: NUMBUBBLES,
      population_size: 100*1,
      mutation_size: 0.3,
      mutation_rate: 0.05,
      num_match: 4*2,
      elite_percentage: 0.20
    }, initialGene);

  }
  
  train() {
      this.trainer.matchTrain(trainRun);
  }
  
  getChromosome(n) {
  // returns a copy of the nth best chromosome (if not provided, returns first one, which is the best one)
  n = n || 0;
  return this.trainer.chromosomes[n].clone();
  }
}