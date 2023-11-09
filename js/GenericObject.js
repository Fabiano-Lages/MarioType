class GenericObject {
    constructor({x, y, url, engine}) {
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

        this.load(engine);
    }

    async load(enfine) {
        this.image.src = this.url;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.draw(engine);
        };
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