var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
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
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = 2.5 - this.speed + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = "white";
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
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
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = forceDirectionX * force * this.density;
        var directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
//para el efecto de confeti
var ConfettiParticle = /** @class */ (function () {
    function ConfettiParticle(x, y, color, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    ConfettiParticle.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    };
    ConfettiParticle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    ConfettiParticle.prototype.isOutOfBounds = function (canvasWidth, canvasHeight) {
        return (this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0);
    };
    ConfettiParticle.prototype.resetPosition = function (canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = -5;
    };
    return ConfettiParticle;
}());
export { ConfettiParticle };
//Para el efecto de estrella
var SuspendedStars = /** @class */ (function () {
    function SuspendedStars(ctx, numberOfStars) {
        this.ctx = ctx;
        this.starArray = [];
        for (var i = 0; i < numberOfStars; i++) {
            var x = Math.random() * this.ctx.canvas.width;
            var y = Math.random() * this.ctx.canvas.height;
            var radius = Math.random() * 2 + 1; // Radio aleatorio entre 1 y 3
            var brightness = Math.random() * 0.5 + 0.5; // Brillo aleatorio entre 0.5 y 1
            this.starArray.push({ x: x, y: y, radius: radius, brightness: brightness });
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        window.addEventListener('mousemove', this.handleMouseMove);
    }
    SuspendedStars.prototype.handleMouseMove = function (event) {
        for (var i = 0; i < this.starArray.length; i++) {
            var star = this.starArray[i];
            var dx = event.clientX - star.x;
            var dy = event.clientY - star.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                // Mueve la estrella hacia el cursor si está lo suficientemente cerca
                var angle = Math.atan2(dy, dx);
                var speed = 2;
                star.x += Math.cos(angle) * speed;
                star.y += Math.sin(angle) * speed;
            }
        }
    };
    SuspendedStars.prototype.draw = function () {
        for (var i = 0; i < this.starArray.length; i++) {
            var star = this.starArray[i];
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(255, 255, 255, ".concat(star.brightness, ")");
            this.ctx.fill();
        }
    };
    return SuspendedStars;
}());
export { SuspendedStars };
