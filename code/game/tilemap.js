class TileMap {
    tileMap
    width
    height
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileMap = [];
        for (let x = 0; x < width; x++) {
            this.tileMap[x] = [];
            for (let y = 0; y < height; y++)this.tileMap[x][y] = new Tile("#2dc416");
        }
    }
    getTile(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        if ((x < 0 || x > this.width - 1) || (y < 0 || y > this.height - 1)) return null;
        return this.tileMap[x][y]
    }
}