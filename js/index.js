const engine = document.querySelector("canvas");
engine.ctx = engine.getContext("2d");

engine.width = window.innerWidth > 1000 ? 1000 : window.innerWidth;
engine.height = window.innerHeight > 592 ? 592 : window.innerHeight;