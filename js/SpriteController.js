class SpriteController {
    constructor(config) {
        this.url = config.url;
        this.frame = {
            x : config.frameX,
            y : config.frameY,
            width : config.width,
            height : config.height
        };

        this.animation = config.animation;
        this.col = this.frame.x[this.animation];
        this.row = this.frame.y[this.animation];

        this.image = new Image();

        this.load();
        this.intervalo = config.intervalo;
        this.instancia = null;
    }

    async load() {
        await new Promise(r => this.image.onload = r, this.image.src = this.url);
        
        this.loop();
    }

    loop() {
        this.instancia = setInterval(() => {
            if(this.col >= this.frame.x[this.animation]) {
                this.col = 0;
            } else {
                this.col ++;
            }
            this.row = this.frame.y[this.animation];
        }, this.intervalo);
    }

    limpaLoop() {
        clearInterval(this.instancia);
    }

    draw(engine, entity) {
        let esquerda = entity.position.x;
        if(!entity.direita) {
            engine.ctx.save();
            engine.ctx.scale(-1, 1);
            esquerda = -esquerda - entity.width[this.animation];
        }

        engine.ctx.drawImage(
            this.image,
            this.col * this.frame.width[this.animation],
            this.row * this.frame.height + (this.row ? 3 : 0),
            this.frame.width[this.animation],
            this.frame.height,
            esquerda,
            entity.position.y,
            entity.width[this.animation],
            entity.height
        );

        if(!entity.direita) {
            engine.ctx.restore()
        }
    }

    achatado(engine, entity) {
        engine.ctx.save();
        engine.ctx.scale(1, .5);
        engine.ctx.drawImage(
            this.image,
            this.col * this.frame.width[this.animation],
            this.row * this.frame.height + (this.row ? 3 : 0),
            this.frame.width[this.animation],
            this.frame.height,
            entity.position.x,
            entity.position.y * 2 + entity.height,
            entity.width[this.animation],
            entity.height
        );
        engine.ctx.restore()
    }
}