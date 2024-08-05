class Runner {
    tps
    engine
    constructor(tps) {
        this.tps = tps;
        this.engine = new GameEngine(15);
    }
    tick() {
        this.engine.tick();
    }
    render(){
        fillBackground("#000");
        this.engine.render();
    }
}


function tick(){
    runner.tick();
    runner.render();
}

const tps = 60;
let runner = new Runner(tps);
setInterval(tick, 1000 / tps);