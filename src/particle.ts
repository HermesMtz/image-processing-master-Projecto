export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];

  constructor(
    width: number,
    height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]
  ) {
    this.width = width;
    this.height = height;
    this.ctx = screenCanvas;
    this.x = Math.random() * width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 2.5;
    this.size = Math.random() * 1.5 + 1;
    this._2PI = Math.PI * 2;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.mappedImage = mapImg;
  }

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = 2.5 - this.speed + this.velocity;
    }

    this.y += movement;

    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];

  constructor(
    x: number,
    y: number,
    screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]
  ) {
    this.ctx = screenCanvas;
    this.x = x; // + 200;
    this.y = y; // - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 5;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
//para el efecto de confeti
export class ConfettiParticle {
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;

  constructor(
    x: number,
    y: number,
    color: string,
    size: number,
    speedX: number,
    speedY: number
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  isOutOfBounds(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0
    );
  }

  resetPosition(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = -5;
  }
}

//Para el efecto de estrella
export class StarParticle {
  x: number;
  y: number;
  size: number;
  brightness: number;

  constructor(x: number, y: number, size: number, brightness: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.brightness = brightness;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    context.fill();
  }
}
