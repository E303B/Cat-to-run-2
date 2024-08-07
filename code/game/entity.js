class Entity {
    x
    y
    direction
    constructor(x = 0, y = 0, direction = 0) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    moveInDirection(direction, force) {
        return this.tryMove(Math.sin(direction) * force / runner.tps, -Math.cos(direction) * force / runner.tps);
    }
    tick() { }

    render() {

    }

    collides() {
        return (!runner.engine.tileMap.getTile(this.x, this.y).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y - 0.5).passable)
    }

    tryMove(dx, dy) {
        let touchedWall = false;
        const steps = 10;
        for (let step = 0; step < steps; step++) {
            this.x += dx / steps;
            if (this.collides()) {
                this.x -= dx / steps;
                touchedWall = true;
            }
            this.y += dy / steps;
            if (this.collides()) {
                touchedWall = true;
                this.y -= dy / steps;
            }
        }
        return touchedWall;
    }
}

class Player extends Entity {
    coinsCollected
    image
    constructor(x = 0, y = 0, direction = 0) {
        super(x, y, direction);
        this.coinsCollected = 0;
        this.image=new Image(1, 1);
        this.image.src = "./img/catsInGame/Base.png";
    }
    tick() {
        if (keysPressed.includes("w") || keysPressed.includes("W")) this.tryMove(0, -5 / runner.tps);
        if (keysPressed.includes("s") || keysPressed.includes("S")) this.tryMove(0, 5 / runner.tps);
        if (keysPressed.includes("a") || keysPressed.includes("A")) this.tryMove(-5 / runner.tps, 0);
        if (keysPressed.includes("d") || keysPressed.includes("D")) this.tryMove(+5 / runner.tps, 0);
        runner.engine.camX = this.x;
        runner.engine.camY = this.y;
        for (let entity in runner.engine.entities) if (runner.engine.entities[entity] instanceof Saw && distanse(this.x, this.y, runner.engine.entities[entity].x, runner.engine.entities[entity].y) < 1) this.collideWithSaw(runner.engine.entities[entity]);
        this.direction=getDir((this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, mouseX, mouseY);
        console.log(this.direction);
    }
    collideWithSaw(saw) {
        runner.engine.toDelete.push(this, saw);
    }
    render() {
        drawRotated(this.image, (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, this.direction, runner.engine.tileSize);
    }
}

class Saw extends Entity {
    tick() {
        if (this.moveInDirection(this.direction, runner.engine.difficulty)) runner.engine.toDelete.push(this);
    }
    render() {
        drawCircle("#474747", (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, runner.engine.tileSize / 2);
    }
}

class Coin extends Entity {
    tick() {
        for (let entity in runner.engine.entities) if (runner.engine.entities[entity] instanceof Player && distanse(this.x, this.y, runner.engine.entities[entity].x, runner.engine.entities[entity].y) < 0.75) this.giveCoins(runner.engine.entities[entity]);
    }

    giveCoins(player){
        player.coinsCollected++;
        runner.engine.toDelete.push(this);
    }
    render() {
        drawCircle("#fbff00", (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, runner.engine.tileSize / 4);
    }
}