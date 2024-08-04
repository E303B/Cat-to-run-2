class TileMap {
    tileMap
    width
    height
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileMap = [];
        this.tileMap[0] = [];
        for (let y = 0; y < height; y++)this.tileMap[0][y] = new Tile("#525452");
        for (let x = 1; x < width - 1; x++) {
            this.tileMap[x] = [];
            this.tileMap[x][0] = new Tile("#525452");
            for (let y = 1; y < height - 1; y++)this.tileMap[x][y] = new Tile("#2dc416");
            this.tileMap[x][height - 1] = new Tile("#525452");
        }
        this.tileMap[width - 1] = [];
        for (let y = 0; y < height; y++)this.tileMap[width - 1][y] = new Tile("#525452");
    }
    getTile(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        if ((x < 0 || x > this.width - 1) || (y < 0 || y > this.height - 1)) return null;
        return this.tileMap[x][y]
    }
}