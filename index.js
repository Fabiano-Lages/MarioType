const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

var createImage = function(imgSrc) {
    const img = new Image();
    img.src = "img/" + imgSrc + ".png";
    return(img);    
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.5;

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

        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        let real = gravity != parseInt(gravity);
        c.clearRect(this.position.x, this.position.y - (real ? 1 : 0), this.width, this.height + (real ? 1 : 0));

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            if (this.position.y + this.velocity.y < 0) {
                this.velocity.y = 0;
                this.position.y = 0;
            } else {
                this.velocity.y += gravity;
            }

            platforms.forEach(platform => {
                if(this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width) {
                    if(this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.position.y = platform.position.y - this.height;
                    }
                }
            });
        } else {
            this.velocity.y = 0;
        }
    
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw();
    }
};

class Inicio {
    constructor() {
        this.position = {
            x : 0
        };

        this.velocity = {
            x : 0
        };
    }

    update() {
        this.position.x += this.velocity.x;
    }
};

class Platform {
    constructor({x, y, image}) {
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
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        c.clearRect(this.position.x, this.position.y, this.width, this.height);
    
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw();
    }
};

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        };

        this.velocity = {
            x: 0,
            y: 0
        };
        
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        c.clearRect(this.position.x, this.position.y, this.width, this.height);
    
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw();
    }
};

const plataformImage = createImage("platform");

const player = new Player();
const platforms = [
    new Platform({x: 0, y: canvas.height - 35, image: plataformImage}),
    new Platform({x: 399, y: canvas.height - 35, image: plataformImage})
];

const background = new GenericObject({x: 0, y: 0, image: createImage("background")});
const genericObjects = [
    new GenericObject({x: 0, y: 0, image: createImage("hills")})
];

const inicio = new Inicio();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    space: {
        pressed: false,
        habilitado: true
    },
    down: {
        pressed: false
    },
};

var animate = function() {
    requestAnimationFrame(animate);

    background.update();
    genericObjects.forEach(genericObject => genericObject.update());
    platforms.forEach(platform => platform.update());
    player.update();
    inicio.update();

    if(inicio.position.x < -5000) {
        alert("Venceu");
        inicio.position.x = -4000;
    }

    if(keys.space.pressed && keys.space.habilitado) {
        player.velocity.y = -20;
        keys.space.habilitado = false;
    } else if(keys.down.pressed) {
        player.velocity.y = 20;
    }

    keys.space.habilitado = (player.velocity.y == 0);

    if(keys.right.pressed && player.position.x < canvas.width / 2) {
        player.velocity.x = 5;
    } else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x += (player.velocity.x < 0 ? 1 : (player.velocity.x > 0 ? -1 : 0));
        
        if(keys.right.pressed) {
            inicio.velocity.x = -5;
        } else if(keys.left.pressed) {
            if(inicio.position.x <= 0) {
                inicio.velocity.x = 5;
            } else {
                inicio.velocity.x = 0;    
            }
        } else {
            inicio.velocity.x = 0;
        }

        platforms.forEach(platform => {
            if(keys.right.pressed) {
                platform.velocity.x = -5;
            } else if(keys.left.pressed) {
                if(inicio.position.x <= 0) {
                    platform.velocity.x = 5;
                } else {
                    platform.velocity.x = 0;
                }
            } else {
                platform.velocity.x = 0;
            }
        });

        genericObjects.forEach(genericObject => {
            if(keys.right.pressed) {
                genericObject.velocity.x = -3;
            } else if(keys.left.pressed) {
                if(inicio.position.x <= 0) {
                    genericObject.velocity.x = 3;
                } else {
                    genericObject.velocity.x = 0;
                }
            } else {
                genericObject.velocity.x = 0;
            }
        });
    }
};

animate();

addEventListener("keydown", (eve) => {
    switch(eve.key) {
        case " ":
            keys.space.pressed = true;
            break;
        case "ArrowDown":
            keys.down.pressed = true;
            break;
        case "ArrowLeft":
            keys.left.pressed = true;
            break;
        case "ArrowRight":
            keys.right.pressed = true;
            break;
    }
});

addEventListener("keyup", (eve) => {
    switch(eve.key) {
        case " ":
            keys.space.pressed = false;
            break;
        case "ArrowDown":
            keys.down.pressed = false;
            break;
        case "ArrowLeft":
            keys.left.pressed = false;
            break;
        case "ArrowRight":
            keys.right.pressed = false;
            break;
    }
});