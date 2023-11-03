class Tiro {
    constructor(entity) {
        this.position = {
            x: entity.position.x + (entity.direita ? entity.width[entity.spriteController.animation] - 10 : + 10),
            y: entity.position.y + (entity.height/3 * 2)
        }

        this.velocity = {
            x: _velocidadeTiro * (entity.direita ?  1 : -1) + entity.velocity.x + (!entity.direita ? inicio.velocity.x : -inicio.velocity.x),
            y: 1
        }

        this.radius = _tamanhoTiro;
        this.start = true;
        this.limite = entity.position.y + entity.height - _alturaTiro;
        //this.audio = new Audio(audios[2].src);
    }

    update(engine, entity) {
        this.draw(engine);
        this.position.x += this.velocity.x + (!entity.direita ? -inicio.velocity.x : inicio.velocity.x);
        this.position.y += this.velocity.y;

        if(this.position.y < this.limite) {
            this.velocity.y *= -1;
        }

        platforms.forEach(platform => {
            if(this.position.x + this.radius >= platform.position.x && this.position.x <= platform.position.x + platform.width) {
                if(this.position.y + this.radius <= platform.position.y && this.position.y + this.radius + this.velocity.y >= platform.position.y && this.velocity.y > 0) {
                    this.velocity.y *= -1;
                    this.limite = platform.position.y - _alturaTiro;
                }
            }
        });
    }

    draw(engine) {
        engine.ctx.beginPath();
        engine.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        engine.ctx.fillStyle = "yellow";
        engine.ctx.fill();
        engine.ctx.closePath();
        if(this.start) {
            //this.audio.play();
            this.start = false;
        }
    }

    acertou(inimigos) {
        let retorno = -1;

        inimigos.find((eni, ind) => {
            if( this.position.y + this.radius >= eni.position.y && this.position.y + this.radius <= eni.position.y + eni.height &&  
                ((this.position.x + this.radius >= eni.position.x && this.position.x < eni.position.x) ||
                (this.position.x  <= eni.position.x + eni.width[eni.spriteController.animation] - 1) && this.position.x > eni.position.x)
            ) {
                retorno = ind;
            }
        });

        return(retorno);
    }
}