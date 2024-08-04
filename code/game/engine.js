class GameEngine{
    tileMap
    camX
    camY
    tileSize;
    constructor(){
        this.camX=this.camY=0;
        this.tileSize=Math.min(canvas.width/20, canvas.height/20);
        this.tileMap=new TileMap(20, 20);
    }

    render(){
        const tileMap=this.tileMap.tileMap;
        for(let x in tileMap){
            for(let y in tileMap[x]){
                drawSquare(tileMap[x][y].color, (x-this.camX+0.5)*this.tileSize, (y-this.camY+0.5)*this.tileSize, this.tileSize+1);
            }
        }
    }
}