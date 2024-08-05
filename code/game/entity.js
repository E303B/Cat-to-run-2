class Entity {
    x
    y
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    tick() { }

    render() {

    }

    collides() {
        return (!runner.engine.tileMap.getTile(this.x, this.y).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y - 0.5).passable)
    }

    tryMove(dx, dy) {
        const steps = 10;
        for (let step = 0; step < steps; step++) {
            this.x += dx / steps;
            if (this.collides()) this.x -= dx / steps;
            this.y += dy / steps;
            if (this.collides()) this.y -= dy / steps;
        }
    }
}

class Player extends Entity {
    tick() {
        if (keysPressed.includes("w") || keysPressed.includes("W")) this.tryMove(0, -5 / runner.tps);
        if (keysPressed.includes("s") || keysPressed.includes("S")) this.tryMove(0, 5 / runner.tps);
        if (keysPressed.includes("a") || keysPressed.includes("A")) this.tryMove(-5 / runner.tps, 0);
        if (keysPressed.includes("d") || keysPressed.includes("D")) this.tryMove(+5 / runner.tps, 0);
        runner.engine.camX = this.x;
        runner.engine.camY = this.y;
    }
    render() {
        drawCircle("#281ac4", (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, runner.engine.tileSize / 2);
    }
}