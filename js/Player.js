class Player{
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };

        this.velocity = {
            x: 0,
            y: 1
        };

        this.direita = true;

        this.tiroHabilitado = true;

        this.width = { parado : 50, correndo : 100 };
        this.height = 99;

        this.spriteController = new SpriteController({
            url : playerImg,
            frameX : { parado : 58,  correndo : 28 },
            frameY : { parado : 0,   correndo : 1 },
            width :  { parado : 177, correndo : 341 },
            height: 400,
            animation: "parado",
            intervalo: 10
        });
        this.puloHabilitado = false;
    }

    draw(engine) {
        this.spriteController.draw(engine, this);
    }

    update(engine, platforms) {
        if(this.position.y + this.height + this.velocity.y <= engine.height + (2 * this.height)) {
            if (this.position.y + this.velocity.y < 0) {
                this.velocity.y = 0;
                this.position.y = 0;
            } else {
                this.velocity.y += _gravity;
            }

            platforms.forEach(platform => {
                if(this.position.x + this.width[this.spriteController.animation] >= platform.position.x && this.position.x <= platform.position.x + platform.width) {
                    if(this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.position.y = platform.position.y - this.height;
                        this.puloHabilitado = true;
                    }
                }
            });
        } else {
            this.velocity.y = 0;
        }
    
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw(engine);

        if(this.velocity.x + inicio.velocity.x) {
            this.spriteController.animation = "correndo";
        } else {
            this.spriteController.animation = "parado";
        }
    }

    verificaColisao(inimigos) {
        let retorno = false;

        let inimigo = inimigos.find(eni => 
            (this.position.y + this.height >=  eni.position.y + eni.height) && 
            ((eni.position.x <= this.position.x + this.width[this.spriteController.animation] - 10 && this.position.x < eni.position.x) || (eni.position.x + eni.width[eni.spriteController.animation] - 1 == this.position.x && this.position.x > eni.position.x))
        );
        
        retorno = inimigo != null;

        return(retorno);
    }

    verificaAchatamento(inimigos) {
        let retorno = -1;

        inimigos.find((eni, ind) => { 
            if( this.velocity.y > 0 && 
                (this.position.y + this.height + 10 >  eni.position.y) && 
                (this.position.x + this.width[this.spriteController.animation] >= eni.position.x && this.position.x <= eni.position.x + eni.width[eni.spriteController.animation])
                )
                retorno = ind;
            }
        );
        
        return(retorno);
    }
};