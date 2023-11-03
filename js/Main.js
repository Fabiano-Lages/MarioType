class Main {
    constructor() {
        this.position = {
            x : 0
        };

        this.velocity = {
            x : 0
        };

        this.status = "";
    }

    update() {
        this.position.x += this.velocity.x;
    }
};


const player = new Player();

_Platforms.push(
    new Platform({ x : 0, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 399, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 600, y : engine.height - 250, url : platformImg }),
    new Platform({ x : 1200, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 1399, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 1900, y : engine.height - 150, url : platformImg }),
    new Platform({ x : 2200, y : engine.height - 350, url : platformImg }),
    new Platform({ x : 2800, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 3199, y : engine.height - 35, url : platformImg }),
    new Platform({ x : 3800, y : engine.height - 250, url : platformImg }),
    new Platform({ x : 4350, y : engine.height - 450, url : platformImg }),
    new Platform({ x : 4749, y : engine.height - 450, url : platformImg }),
    new Platform({ x : 5148, y : engine.height - 450, url : platformImg }),
    new Platform({ x : 5547, y : engine.height - 450, url : platformImg }),
);

_Enemys.push(
    new Enemy({x:200, y:engine.height - 85, inicio: 0, fim: 799}),
    new Enemy({x:650, y:engine.height - 300, inicio: 600, fim: 999}),
    new Enemy({x:1300, y:engine.height - 85, inicio: 1200, fim: 1799}),
    new Enemy({x:1400, y:engine.height - 85, inicio: 1200, fim: 1799}),
    new Enemy({x:2000, y:engine.height - 205, inicio: 1900, fim: 2299}),
    new Enemy({x:2300, y:engine.height - 400, inicio: 2200, fim: 2599}),
    new Enemy({x:2900, y:engine.height - 85, inicio: 2800, fim: 3599}),
    new Enemy({x:2950, y:engine.height - 85, inicio: 2800, fim: 3599}),
    new Enemy({x:3100, y:engine.height - 85, inicio: 2800, fim: 3599}),
    new Enemy({x:4400, y:engine.height - 500, inicio: 4350, fim: 5946})
);

_GenericObjects.push(
    new GenericObject( { x: 0, y : 10, url: hillsImg })
);

const inicio = new Main();

const animate = () => {
    if(!inicio.status) {
        requestAnimationFrame(animate);

        engine.ctx.clearRect(0, 0, engine.width, engine.height);

        _Background.update(engine);
        _GenericObjects.forEach(genericObject => genericObject.update(engine));
        _Platforms.forEach(platform => platform.update(engine));
        inicio.update(engine);
        _Enemys.forEach(inimigo => inimigo.update(engine, _Platforms));
        _Particles.forEach((particle, p) => {
            if(particle.position.y - particle.radius >= engine.height) {
                particle.position.x = Math.random() * engine.width;
                particle.position.y = -particle.radius;
            }

            if(particle.opacity <= 0) {
                setTimeout(() => {
                    _Particles.splice(p, 1);
                });
            } else {
                particle.update(engine);
            }
        });

        player.update(engine, _Platforms);

        if(keys.fire.pressed && player.tiroHabilitado) {
            _Shots.push(new Shot(player));
            player.tiroHabilitado = false;
        }

        let achatado = player.verificaAchatamento(_Enemys);
        if(achatado > -1) {
            _Enemys[achatado].achatado = true;
            setTimeout(() => {_Enemys.splice(achatado, 1)}, 50);
            player.velocity.y = -7;
        }

        _Shots.forEach((tiro, ind) => {
            if(tiro.position.y > engine.height) {
                _Shots.splice(ind, 1);
            } else {
                let acertado = tiro.acertou(_Enemys);
                if(acertado > -1) {
                    _Shots.splice(ind, 1);
                    createParticles({ object: _Enemys[acertado], colo: "blue", particles: _Particles }, );
                    _Enemys[acertado].destruido();
                    _Enemys.splice(acertado, 1);
                } else {
                    tiro.update(engine, player, _Platforms);
                }
            }
        });

        if(scrollOffset > _chegada) {
            venceu();
        }

        if((player.position.y > engine.height + player.height) || player.verificaColisao(_Enemys)) {
            perdeu();
            player.position.y = engine.height + player.height;
        }

        if(keys.space.pressed && player.puloHabilitado) {
            player.velocity.y = -_jumpVelocity;
            player.puloHabilitado = false;
        } else if(keys.down.pressed) {
            player.velocity.y = _jumpVelocity;
        }

        if(keys.right.pressed && player.position.x < engine.width / 2) {
            player.velocity.x = _velocity;
            player.direita = true;
        } else if(keys.left.pressed && player.position.x >= 100) {
            player.velocity.x = -_velocity;
            player.direita = false;
        } else {
            player.velocity.x += (player.velocity.x < 0 ? 1 : (player.velocity.x > 0 ? -1 : 0));
            
            if(keys.right.pressed) {
                inicio.velocity.x = -_velocity;
                player.direita = true;
            } else if(keys.left.pressed) {
                player.direita = false;
                if(inicio.position.x <= 0) {
                    inicio.velocity.x = _velocity;
                } else {
                    inicio.velocity.x = 0;    
                }
            } else {
                inicio.velocity.x = 0;
            }

            _Platforms.forEach(platform => {
                if(keys.right.pressed) {
                    platform.velocity.x = -_velocity;
                } else if(keys.left.pressed) {
                    if(inicio.position.x <= 0) {
                        platform.velocity.x = _velocity;
                    } else {
                        platform.velocity.x = 0;
                    }
                } else {
                    platform.velocity.x = 0;
                }
            });

            _GenericObjects.forEach(genericObject => {
                if(keys.right.pressed) {
                    genericObject.velocity.x = -_backVelocity;
                } else if(keys.left.pressed) {
                    if(inicio.position.x <= 0) {
                        genericObject.velocity.x = _backVelocity;
                    } else {
                        genericObject.velocity.x = 0;
                    }
                } else {
                    genericObject.velocity.x = 0;
                }
            });
        }

        if(keys.right.pressed) {
            scrollOffset += _velocity;
        } else if(keys.left.pressed) {
            if(scrollOffset > 0) {
                scrollOffset -= _velocity;
            } else {
                scrollOffset = 0;
            }
        }
    }
};

const venceu = () => {
    scrollOffset = 4995;
    paraJogo("venceu");
};

const perdeu = () => {
    paraJogo("perdeu");
};

const paraJogo = (status) => {
    inicio.status = status;
    alert(`Você ${inicio.status}`);
    keys.right.pressed = false;
    keys.left.pressed = false;
    keys.space.pressed = false;
    keys.down.pressed = false;
};

const createParticles = ({particles, object, color}) => {
    for(let i = 0; i < 15; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width[object.spriteController.animation] / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || "#BAA0DE",
            fades: true
        }));
    }
}

requestAnimationFrame(animate);