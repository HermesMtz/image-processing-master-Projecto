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


export class SuspendedStars {
  protected ctx: CanvasRenderingContext2D;
  protected starArray: { x: number; y: number; radius: number; brightness: number }[];

  constructor(ctx: CanvasRenderingContext2D, numberOfStars: number) {
    this.ctx = ctx;
    this.starArray = [];

    for (let i = 0; i < numberOfStars; i++) {
      const x = Math.random() * this.ctx.canvas.width;
      const y = Math.random() * this.ctx.canvas.height;
      const radius = Math.random() * 2 + 1; // Radio aleatorio entre 1 y 3
      const brightness = Math.random() * 0.5 + 0.5; // Brillo aleatorio entre 0.5 y 1

      this.starArray.push({ x, y, radius, brightness });
    }

    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove(event: MouseEvent) {
    for (let i = 0; i < this.starArray.length; i++) {
      const star = this.starArray[i];
      const dx = event.clientX - star.x;
      const dy = event.clientY - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 50) {
        // Mueve la estrella hacia el cursor si está lo suficientemente cerca
        const angle = Math.atan2(dy, dx);
        const speed = 2;
        star.x += Math.cos(angle) * speed;
        star.y += Math.sin(angle) * speed;
      }
    }
  }

  public draw() {
    for (let i = 0; i < this.starArray.length; i++) {
      const star = this.starArray[i];

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
      this.ctx.fill();
    }
  }
}


// PARA EFECTO DE RESCALADO 

export class RescalingEffect {
  protected scale: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.scale = 1;
    this.ctx = ctx;
  }

  public update() {
    // Cambia el factor de escala de forma continua (puedes ajustar la velocidad)
    this.scale += 0.01;

    // Reinicia la escala a 1 cuando alcanza un límite (puedes ajustar el límite)
    if (this.scale > 2) {
      this.scale = 1;
    }
  }

  public draw(img: HTMLImageElement) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.drawImage(img, 0, 0, this.ctx.canvas.width * this.scale, this.ctx.canvas.height * this.scale);
  }
}


// Rotacion animada

export class RotationEffect {
  protected angle: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.angle = 0;
    this.ctx = ctx;
  }

  public update() {
    // Cambia el ángulo de rotación de forma continua (puedes ajustar la velocidad)
    this.angle += 0.02;
  }

  public draw(img: HTMLImageElement) {
   
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


    this.ctx.save();

    // Mueve el origen al centro de la imagen
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

    // Rota la imagen
    this.ctx.rotate(this.angle);

    // Dibuja la imagen rotada
    this.ctx.drawImage(img, -img.width / 2, -img.height / 2);

    // Restaura el estado del contexto
    this.ctx.restore();
  }
}


