class GameEngine {
    tileMap
    camX
    camY
    tileSize;
    constructor(size=20, tileSize=100) {
        this.camX = this.camY = 0;
        this.tileSize = tileSize;
        this.tileMap = new TileMap(size, size);
    }

    render() {
        const tileMap = this.tileMap.tileMap;
        for (let x in tileMap) {
            for (let y in tileMap[x]) {
                drawSquare(tileMap[x][y].color, (x - this.camX) * this.tileSize, (y - this.camY) * this.tileSize, this.tileSize + 1);
            }
        }
    }
    tick() {
        let camSpeed = 5;
        if (keysPressed.includes("w") || keysPressed.includes("W")) this.camY -= camSpeed / runner.tps;
        if (keysPressed.includes("s") || keysPressed.includes("S")) this.camY += camSpeed / runner.tps;
        if (keysPressed.includes("a") || keysPressed.includes("A")) this.camX -= camSpeed / runner.tps;
        if (keysPressed.includes("d") || keysPressed.includes("D")) this.camX += camSpeed / runner.tps;
    }
}