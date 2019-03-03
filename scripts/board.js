/**
 * Board is the main game area that holds all of the tiles
 */
var board = function(){

    var this_table = this;
    this_table.layout = [];
    this_table.occupied_tiles = [];
    this_table.unoccupied_tiles = [];
    this_table.tileCountX = 0;
    this_table.tileCountY = 0;
    this_table.board_width = 0;
    this_table.board_height = 0;

    /**
     * Initiates the board with x and y size parameters
     * @param {int} sizex
     * @param {int} sizey
     */
    this.initBoard = function(sizex,sizey){
        this_table.layout = [];
        this_table.unoccupied_tiles = [];

        document.getElementById("gamearea").innerHTML = "";

        for(x=0;x<sizex;x++){
            this_table.layout[x] = [];
            var columndiv = document.createElement("div");
            columndiv.classList.add("column_div");
            this_table.tileCountX = sizex;
            this_table.board_width = sizex*64;
            
            for(y=0;y<sizey;y++){
                var newtile = new tile(x, y, 'tile_grass');
                this_table.layout[x][y] = newtile;
                //this_table.unOccupiedTiles(x,y);
                columndiv.appendChild(newtile.dom);           
            }
            
            document.getElementById("gamearea").appendChild(columndiv);
        }

        this_table.tileCountY = this_table.layout[0].length;
        this_table.board_height = 64*this_table.layout[0].length;
        document.getElementById("gamearea").style.height = this_table.board_height;
        document.getElementById("container").style.width = this_table.board_width;

        //this_table.createObstacles();
    }

    /**
     * Sets board from a 2 dimensional array
     * @param {Array} table
     */
    this.setBoard = function(table){
        console.log(table)
        //this_table.layout = table;
        //this_table.unoccupied_tiles = [];

        var sizex = table.length
        var sizey = table[0].length

        //document.getElementById("gamearea").innerHTML = "";

        for(var x = 0; x < sizex; x++){
            
            /*var columndiv = document.createElement("div");
            columndiv.classList.add("column_div");
            this_table.tileCountX = sizex;
            this_table.board_width = sizex*64;*/
            
            for(var y = 0; y < sizey; y++){
                var layouttile = this_table.layout[x][y]
                var loadtile = table[x][y]
                layouttile.dom.style.backgroundPositionX = loadtile.bgx+'px'
                layouttile.dom.style.backgroundPositionY = loadtile.bgy+'px'
                layouttile.dom.bgx = loadtile.bgx
                layouttile.dom.bgy = loadtile.bgy
                /*
                this_table.layout[x][y].dom = this_table.layout[x][y].dom;
                this_table.layout[x][y].occupied = this_table.layout[x][y].occupied;
                */
               /*var newtile = new tile(x, y);
                this_table.layout[x][y] = newtile;
                this_table.unOccupiedTiles(x,y);
                columndiv.appendChild(newtile.dom);*/           
            }
            
            //document.getElementById("gamearea").appendChild(columndiv);
        }        
    }

    this.unOccupiedTiles = function(tablex, tabley){
        this_table.unoccupied_tiles.push(this_table.layout[tablex][tabley]);
    }

    /**
     * Places a piece on to the board
     * @param {object} piece
     * @param {int} tile_x
     * @param {int} tile_y
     */
    this.placeOnBoard = function(obj, tile_x, tile_y){
        var targetTile = board.layout[tile_x][tile_y];
        obj.tile = targetTile;

        if(targetTile.occupied){
            return false;
        }else{
            //delIndicators()
            targetTile.occupied = true
            targetTile.occupant = obj
            obj.tileindex_x = tile_x
            obj.tileindex_y = tile_y
            obj.pxpos_x = targetTile.px_x
            obj.pxpos_y = targetTile.px_y
            obj.dom.style.left = targetTile.px_x
            obj.dom.style.top = targetTile.px_y
            obj.dom.style.zIndex = targetTile.y
            
            console.log(obj.dom)
            document.getElementById('gamearea').appendChild(obj.dom)
            return true
        }    
        
    }

    this.removeFromBoard = function(obj){
        obj.currentTile.occupied = false
        obj.currentTile.occupant = null
        obj.meta.disabled = true
        document.getElementById('gamearea').removeChild(document.getElementById(obj.dom.id))
    }

    this.showBoardStatus = function(){
        var curtile, curstatusdiv;

        for(x=0; x<this_table.layout.length ;x++){

            for(y=0;y<this_table.layout[x].length;y++){
                curtile = this_table.layout[x][y];
                curstatusdiv = document.getElementById("status_"+x+y);

                curstatusdiv.setAttribute("style","color: black;");

                if(curtile.dom.occupied){
                    curstatusdiv.setAttribute("style","color: red;");
                }else if(!curtile.dom.occupied){
                    curstatusdiv.setAttribute("style","color: green;");                    
                }else{
                    curstatusdiv.setAttribute("style","color: orange;"); 
                }

                curstatusdiv.innerText = curtile.dom.occupied;                
            }

        }

    }

    /**
     * Exports the board for saving
     */
    this.export = function(){
        var expboard = []

        for(x = 0 ; x<this_table.layout.length ; x++){
            expboard[x] = []

            for(y=0;y<this_table.layout[x].length;y++){

                expboard[x][y] = 
                {
                    'cls': this_table.layout[x][y].cls,
                    'bgx': this_table.layout[x][y].dom.bgx,
                    'bgy': this_table.layout[x][y].dom.bgy,
                    'occupied': this_table.layout[x][y].occupied
                }
            }

        }
        
        return expboard
    }

}

/**
 * Tiles
 * @param {int} column
 * @param {int} row
 * @param {string} sheet
 */
var tile = function(column, row, sheet){
    var this_tile = this;
    var randomtile = Math.floor(Math.random()*10);

    if(sheet === undefined){
        sheet = 'tile_grass'
    }

    this_tile.x = column;
    this_tile.y = row;
    this_tile.px_x = 64*column;
    this_tile.px_y = 64*row;
    this_tile.occupied = false;
    this_tile.occupant = null;
    this_tile.cls = 'tile '+sheet
    this_tile.dom = document.createElement('div');
    this_tile.dom.bgx = 0
    this_tile.dom.bgy = 0
    this_tile.dom.id = 'x'+column+'y'+row;
    this_tile.dom.className = 'tile '+sheet
    this_tile.dom.style.zIndex = "0";
    this_tile.dom.style.backgroundPosition = '0px 0px'

    //this_tile.dom.innerHTML = "<div style='position: absolute; color: gray;'>"+column+","+row+"</div>";

    this_tile.dom.addEventListener("click", function(evt) {
        if(!game.gamemode){
            var editormode = Editor.getMode()
            var editobj = Editor.getObj()

            if(editormode == 'tile'){

                if(evt.target.classList.contains('tile')){
                    evt.target.style.backgroundPosition = editobj.bgx+' '+editobj.bgy
                    this_tile.dom.bgx = editobj.bgx
                    this_tile.dom.bgy = editobj.bgy
                }
            
            }else if(editormode == 'unit'){

                if(evt.target.classList.contains('tile')){

                    if(!this_tile.occupied){
                        var newunit = new Soldier(editobj.race, editobj.faction, editobj.type)
                        newunit.team = game.selectedTeam
                        newunit.id = newunit.team.id+'U'+newunit.team.list.length
                        game.selectedTeam.add(newunit)
                        game.selectUnit(newunit)
                        board.placeOnBoard(newunit, this_tile.x, this_tile.y)

                    }else{
                        console.log('tile is occupied!')
                    }
                }

            }else if(editormode == 'move'){
                game.selectedPiece.tile.occupied = false
                board.placeOnBoard(game.selectedPiece, this_tile.x, this_tile.y)

            }else if(editormode == 'obstacle'){
                
                if(!this_tile.occupied){
                    var newobs = new Obstacle(editobj.type, editobj.subtype, {'bgx': editobj.bgpos.bgx, 'bgy': editobj.bgpos.bgy})
                    game.addObstacle(newobs)

                    board.placeOnBoard(newobs, this_tile.x, this_tile.y)
                }
            
            }
        }
    });

    /*var tilestatus_div = document.createElement("div");
    tilestatus_div.classList.add("tilestatus_div");
    tilestatus_div.id = "status_"+column+row;
    tilestatus_div.innerText = this_tile.dom.occupied;
    this_tile.dom.appendChild(tilestatus_div);*/
}

/*
var moveMarker = function(tile){
    var this_marker = this
    this_marker.posx = tile.dom.px_x
    this_marker.posy = tile.dom.px_y
    this_marker.indexx = tile.dom.x
    this_marker.indexy = tile.dom.y
    this_marker.tile = tile

    this.create = function(tile){
        this_marker.dom = document.createElement('div');
        this_marker.dom.classList.add('movemarker');
        tile.appendChild(this_marker.dom);
    }

}*/

var board = new board();