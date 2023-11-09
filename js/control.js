const platformImg = "./ativo/platform.png";
const backgroundImg = "./ativo/background.png";
const hillsImg = "./ativo/hills.png";
const inimigoImg = "./ativo/inimigo.png";
const playerImg = "ativo/player.png";

const _Enemys = [];
const _Particles = [];
const _Shots = [];
const _GenericObjects = [];
const _Platforms = [];

const _Background = new GenericObject({ x : 0, y : 0, url: backgroundImg, engine });

const _gravity = 0.5;
const _velocity = 5;
const _jumpVelocity = 15;
const _backVelocity = 3;
const _alturaTiro = 50;
const _tamanhoTiro = 4;
const _velocidadeTiro = 5;
const _chegada = 5500;

let scrollOffset = 0;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    space: {
        pressed: false,
    },
    down: {
        pressed: false
    },
    fire: {
        pressed: false
    },
};

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
        case "Control":
            keys.fire.pressed = true;
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
        case "Control":
            keys.fire.pressed = false;
            player.tiroHabilitado = true;
            break;
    }
});