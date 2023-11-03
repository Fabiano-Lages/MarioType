class Enemy{
    constructor(config) {
        this.position = {
            x: config.x,
            y: config.y
        };

        this.velocity = {
            x: 1
        };

        this.width = { padrao : 50 };
        this.height = 50;
        this.direita = true;

        this.spriteController = new SpriteController({
            url : inimigoImg,
            frameX : { padrao : 3 },
            frameY : { padrao : 0 },
            width :  { padrao : 24 },
            height: 24,
            animation: "padrao",
            intervalo: 60
        });
        this.spriteController.animation = "padrao";
        this.plataforma = null;
        this.limite = {
            inicio: config.inicio, 
            fim: config.fim
        }
        this.achatado = false;
    }

    draw(engine) {
        if(this.achatado) {
            this.spriteController.limpaLoop();
            this.spriteController.achatado(engine, this);
        } else {
            this.spriteController.draw(engine, this);
        }
    }

    destruido() {
        this.spriteController.limpaLoop();
    }

    update(engine, platforms) {
        if(!this.plataforma) {
            platforms.forEach(platform => {
                if(this.position.x + this.width[this.spriteController.animation] >= platform.position.x && this.position.x <= platform.position.x + platform.width) {
                    this.plataforma = platform;
                }
            });
        }

        if((this.position.x + this.width[this.spriteController.animation] - inicio.position.x > this.limite.fim) ||
            (this.position.x - inicio.position.x < this.limite.inicio)
            ) {
                this.velocity.x *= -1;
            }
    
        this.position.x += this.velocity.x + inicio.velocity.x;

        this.draw(engine);
    }
};