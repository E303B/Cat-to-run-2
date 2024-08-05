class GameEngine {
    tileMap
    camX
    camY
    tileSize
    entities
    constructor(size = 20, tileSize = 100) {
        this.camX = this.camY = 0;
        this.tileSize = tileSize;
        this.tileMap = new TileMap(size, size);
        this.entities = [];
        this.entities.push(new Player(1, 1));
    }

    render() {
        const tileMap = this.tileMap.tileMap;
        for (let x in tileMap) {
            for (let y in tileMap[x]) {
                drawSquare(tileMap[x][y].color, (x - this.camX-0.5) * this.tileSize + canvas.width / 2, (y - this.camY-0.5) * this.tileSize + canvas.height / 2, this.tileSize + 1);
            }
        }
        for(let entity in this.entities){
            this.entities[entity].render();
        }
    }
    tick() {
        for (let entity in this.entities) {
            this.entities[entity].tick();
        }
    }
}