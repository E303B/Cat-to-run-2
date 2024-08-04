class Runner {
    tps
    engine
    constructor(tps) {
        this.tps = tps;
        this.engine = new GameEngine();
    }
    tick() {

    }
}

class Renderer {
    fps
    constructor(fps) {
        this.fps = fps;
    }
    tick() {
        console.log(runner)
        runner.engine.render()
    }
}

const setup = function (tps, fps) {
    const runner = new Runner(tps);
    const renderer = new Renderer(fps);
    return [runner, renderer];

}


const tps = 20;
const fps = 60;
const i = setup(tps, fps);
let runner = i[0];
let renderer = i[1];
setInterval(runner.tick(), 1000 / tps); 
setInterval(renderer.tick(), 1000 / fps);