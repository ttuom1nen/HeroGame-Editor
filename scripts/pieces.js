/**
 * Entity is a super class for all pieces on the board
 */
class Entity{

    constructor(){
        this.flipped = 1
    }

    /**
     * Flips the sprite of the piece
     * @param {int} direction 
     */
    flip(direction){

        if(direction === undefined){

            if(this.flipped == 1){
                this.flipped = -1
            }else{
                this.flipped = 1
            }

        }else{
            console.log(direction)

            if(Math.abs(direction) > 90){
                this.flipped = -1
            }else{
                this.flipped = 1
            }

        }

        this.sprite.style.transform = 'scaleX('+this.flipped+')';
        
        return this.flipped
    }

}

/**
 * Piece is any piece on the board. It is a super class for heris, units and obstacles
 * @extends {Entity}
 */
class Piece extends Entity{

    constructor(){
        super()

        var _this = this
        this.tile
        this.stats
        this.meta
        this.alive = true
        this.disabled = false
        this.target = false
        this.mvmrkrs = []
        this.sprite = document.createElement('div')
        this.sprite.classList.add('sprite');
        this.dom = document.createElement('div')
        this.dom.classList.add('clkzone');
        this.hpbar = document.createElement('div')
        this.hpbar.className = 'progress';
        this.hpbarbg = document.createElement('div')
        this.hpbarbg.className = 'progressbg';
        this.hpbarbg.appendChild(this.hpbar)
        this.hpbarbg.style.display = 'block'
        this.dom.appendChild(this.hpbarbg)
        this.dom.appendChild(this.sprite)
    
        this.dom.obj = this

        this.dom.addEventListener("mousedown", function(evt) {
            console.log(evt.target.obj)

            var obj = evt.target.obj

            if(evt.target.classList.contains('clkzone')){
                game.selectedPiece = obj

                if(game.gamemode){

                    if(obj.type == 'unit'){

                        if(obj == game.selectedUnit){
                            console.log('second click')
                        }else{

                            if(obj.team.id == game.whosturn){
                                game.selectedUnit = obj
                                delIndicators()
                                seekTarget(obj)

                                if(obj.checkMoves() && obj.alive && !obj.disabled){
                                    createMoveArea(obj)
                                }

                            }else{

                                if(game.selectedUnit.checkMoves()){
                                    if(obj.target){
                                        attack(game.selectedUnit, obj)
                                    }
                                }

                            }
                        
                        }

                    }else if(evt.target.type == 'obstacle'){
                        //game.selectObstacle(evt.target.obj)
                    }
                }else{

                    if(obj.type == 'unit'){
                        game.selectedUnit = obj
                    }else{
                        game.selectedObs = obj
                    }

                }
            }
            
        });

    }

    /**
     * Piece takes damage
     * @param {int} dmg 
     */
    takeDmg(dmg){

        this.stats.hp = this.stats.hp-dmg
        var hp_pct = (this.stats.hp/this.stats.hp_max)*100
        var hpbar = this.hpbar

        createDmgMarker(this.pxpos_x, this.pxpos_y-32, dmg);
        hpbar.setAttribute("style", "width:"+((this.stats.hp/this.stats.hp_max)*100)+"%;");
        
        if(hp_pct <= 60 && hp_pct > 20){
            hpbar.classList.add("progress_orange");
        }else if(hp_pct <= 20){
            hpbar.classList.remove("progress_orange");
            hpbar.classList.add("progress_red");
        }

        if(this.stats.hp <= 0){
            this.tile.occupied = false;
            this.dom.classList.add("unit_dead");
            this.dom.classList.add(this.type+"_dead");
            this.dom.style.transform = 'rotate('+randomBetween(-15,15)+'deg) rotateX('+randomBetween(-45,45)+'deg)'
            this.hpbarbg.style.visibility = "hidden"
            this.alive = false;
            this.disabled = true;
            this.dom.style.zIndex = "0";
            this.target = false
            var target = this.dom.getElementsByClassName('atkmarker')[0]
            target.parentNode.removeChild(target)
            //this.team.deleteFromList(this.id)
        }
    }

    /**
     * Exports the object for saving
    */
    export(){
        var xprt = {
            'flipped': this.flipped,
            'meta': this.meta,
            'info': this.info,
            'loc': {
                'tilex': this.tileindex_x,
                'tiley': this.tileindex_y
            }
        }

        return xprt
    }

    disable(){
        this.disabled = true
        return this.disabled
    }
}

/**
 * Unit pieces
 * @extends {Piece}
 */
class Unit extends Piece{

    constructor(){
        super()
        this.type = 'unit'
        this.skills = []
        this.imgpoints = {}
    }

    /**
     * Handle functions related to turn end
     */
    endturn(){
        //game.selectedUnit = null
        delIndicators()
    }

    /**
     * Check the unit's moves
     * @return {boolean}
     */
    checkMoves(){
        if(this.stats.moves > 0){
            return true
        }else{
            return false
        }
    }

    /**
     * Updates the unit's moves after an action
     * @param {int} value 
     */
    updateMoves(value){

        if(value < 0){
            var value = Math.abs(value)
            this.stats.moves = this.stats.moves-value
        }else{
            this.stats.moves = this.stats.moves+value
        }

        if(!this.checkMoves()){
            this.endturn()
        }

    }

    /**
     * Move unit to tile
     * @param {int} apcost 
     * @param {int} tile_indexx 
     * @param {int} tile_indexy 
     */
    move(apcost, tile_indexx, tile_indexy){

        this.updateMoves(apcost)
        var targetTile = board.layout[tile_indexx][tile_indexy]
        var angle = getAngle(this.pxpos_x,this.pxpos_y,targetTile.px_x,targetTile.px_y)
        
        if(!targetTile.occupied){
            
            this.flip(angle)

            this.tile.occupied = false;
            this.tile.occupant = {};
            this.dom.style.left = targetTile.px_x;
            this.dom.style.top = targetTile.px_y;
            this.dom.style.zIndex = targetTile.y;
            this.pxpos_x = targetTile.px_x;
            this.pxpos_y = targetTile.px_y;

            targetTile.occupied = true;
            targetTile.occupant = this;
            this.tile = targetTile;
 
            delIndicators()

            if(this.stats.moves > 0){
                createMoveArea(this)
                seekTarget(this)
            } 

        }

    }

}

/**
 * Soldiers are the normal army units
 * @extends {Unit}
 */
class Soldier extends Unit{
    
    constructor(race, faction, type){
        super()

        var statobj = new UnitStats()
        var stats = statobj.getStats(race, faction, type)

        this.info = {'race': race, 'faction': faction, 'type': type}
        this.meta = stats.meta
        this.stats = stats.stats
        this.subtype = type
        this.sprite.classList.add('sprite', races[race][faction]['sheet-cls'], faction+'_'+type)
    }

}

/**
 * Heros are different
 * @extends {Unit}
 */
class Hero extends Unit{

    constructor(cls, sex, sheetxy){
        super()
        this.items = []
        this.gear = []
        this.equipped = []
        this.gearpoints = {
            'hair': {'x':0,'y':0, 'occupied': false},
            'head': {'x':0,'y':0, 'occupied': false},
            'torso': {'x': 16,'y': 45, 'occupied': false},
            'handl': {'x': 37, 'y': 39, 'occupied': false},
            'handr': {'x': -12, 'y': 29, 'occupied': false},
            'legs': {'x':0,'y':0, 'occupied': false},
            'boots': {'x':0,'y':0, 'occupied': false},
            'ring1': {'x':0,'y':0, 'occupied': false},
            'ring2': {'x':0,'y':0, 'occupied': false}
        }

        var statobj = new HeroStats()
        var stats = statobj.getStats(cls, sex)
        this.info = {'cls': cls, 'sex': sex, 'sheetxy': sheetxy}
        this.meta = stats.meta
        this.stats = stats.stats
        this.sprite.classList.add('sprite', stats.meta['sheet-cls'])

    }

    /**
     * Equip the hero with an item
     * @param {Object} item 
     */
    equip(item){

        if(this.gearpoints[item.slot].occupied){
            
            if(item.slot == 'handr' && this.gearpoints.handl.occupied == false){
                item.slot = 'handl'
                item.flip()
            }else{
                this.unEquip()
            }

        }

        this.gearpoints[item.slot].occupied = true
        item.sprite.style.marginLeft = this.gearpoints[item.slot].x
        item.sprite.style.marginTop = this.gearpoints[item.slot].y

        this.sprite.appendChild(item.sprite)

    }

    /**
     * Unequip item
     */
    unEquip(){
        console.log('unEquip()')
        this.gearpoints[item.slot].occupied = false
    }

}

/*
var hero = new Hero('war', 'male')
*/

/**
 * Obstacles are stuff like trees and stones
 * @extends {Piece}
 */
class Obstacle extends Piece{

    constructor(type, subtype, bgpos){
        super()

        var bgx = bgpos.bgx
        var bgy = bgpos.bgy
        
        var stats = getObsStats(type, subtype)

        this.meta = stats.meta
        this.info = {'type': type, 'subtype': subtype, 'bgpos':{'bgx': bgx, 'bgy': bgy}}
        this.stats = stats.stats
        this.cls = this.meta["sheet-cls"]
        this.dom.obj = this
        this.type = 'obstacle'
        this.sprite.classList.add('sprite', this.cls)
        this.sprite.style.backgroundPosition = bgx+'px '+bgy+'px'
        this.hpbarbg.style.display = 'none'
    }

}