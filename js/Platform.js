class Platform {
    constructor({x, y, url}) {
        this.url = url;
        this.position = {
            x,
            y
        };

        this.velocity = {
            x: 0,
            y: 0
        };
        
        this.width = 400;
        this.height = 50;
        this.image = new Image();

        this.load();
    }

    async load() {
        await new Promise(r => this.image.onload = r, this.image.src = this.url);
    }

    draw(engine) {
        engine.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(engine) {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw(engine);
    }
};