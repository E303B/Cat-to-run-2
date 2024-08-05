class GameEngine {
    tileMap
    camX
    camY
    tileSize
    entities
    timeSurvived
    timeUntilSawSpawn
    difficulty
    toDelete
    paused
    constructor(size = 20, tileSize = 100, difficulty = 5) {
        this.camX = this.camY = 0;
        this.tileSize = tileSize;
        this.tileMap = new TileMap(size, size);
        this.entities = [];
        this.entities.push(new Player(Math.ceil(size / 2), Math.ceil(size / 2)));
        this.timeSurvived = 0;
        this.difficulty = difficulty;
        this.timeUntilSawSpawn = 5;
        this.toDelete=[];
        this.paused=false;
    }

    generateSaw() {
        const side = randInt(-1, 2);
        let x, y, direction;
        if (side == -1) {
            x = 1;
            y = randInt(1, this.tileMap.height - 1);
            direction = degreesToRadians(90);
        }
        else if (side == 0) {
            y = 1;
            x = randInt(1, this.tileMap.width - 1);
            direction = degreesToRadians(180);
        }
        else if (side == 1) {
            x = this.tileMap.width - 2;
            y = randInt(1, this.tileMap.height - 1);
            direction = degreesToRadians(-90);
        }
        else if (side == 2) {
            y = this.tileMap.height - 3;
            x = randInt(1, this.tileMap.width - 1);
            direction = degreesToRadians(0);
        }
        this.entities.push(new Saw(x, y, direction));
    }

    createSaws(count) {
        for (let i = 0; i < count; i++)this.generateSaw();
    }

    render() {
        const tileMap = this.tileMap.tileMap;
        for (let x in tileMap) {
            for (let y in tileMap[x]) {
                drawSquare(tileMap[x][y].color, (x - this.camX - 0.5) * this.tileSize + canvas.width / 2, (y - this.camY - 0.5) * this.tileSize + canvas.height / 2, this.tileSize + 1);
            }
        }
        for (let entity in this.entities) {
            this.entities[entity].render();
        }
    }
    tick() {
        if(this.paused)return;
        this.toDelete=[];
        for (let entity in this.entities) {
            this.entities[entity].tick();
        }
        this.timeSurvived += 1 / runner.tps;
        if (this.timeUntilSawSpawn > 0) this.timeUntilSawSpawn -= 1 / runner.tps;
        else {
            this.createSaws(this.difficulty * Math.ceil(this.timeSurvived / 10))
            this.timeUntilSawSpawn = 5 / this.difficulty;
        }
        for(let entity in this.toDelete){
            this.entities=this.entities.filter((a)=>{return a!=this.toDelete[entity]});
        }
    }
}