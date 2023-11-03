class Particle { 
    constructor({position, velocity, radius, color, fades}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
    }

    draw(engine) {
        engine.ctx.save();
        engine.ctx.globalAlpha = this.opacity;
        engine.ctx.beginPath();
        engine.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        engine.ctx.fillStyle = this.color;
        engine.ctx.fill();
        engine.ctx.closePath();
        engine.ctx.restore();
    }

    update(engine) {
        this.draw(engine);
        this.position.x += this.velocity.x + inicio.velocity.x;
        this.position.y += this.velocity.y;

        if(this.fades) {
            this.opacity -= 0.01;
        }
    }
}