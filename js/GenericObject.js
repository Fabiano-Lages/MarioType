class GenericObject {
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
        
        this.image = new Image();

        this.load();

        this.width = this.image.width;
        this.height = this.image.height;
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