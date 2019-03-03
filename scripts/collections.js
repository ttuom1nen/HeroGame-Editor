class Group{

    constructor(){
        this.list = []
        this.objects = new Map()
        this.selectedObject
    }

    add(obj){
        this.list.push(obj.id)
        this.objects.set(obj.id, obj)
    }

    selectObject(id){
        this.selectedObject = this.objects.get(id)
        return this.selectedObject
    }

    deleteFromList(id){
        for(var i = 0; i<this.list.length; i++){
            if(this.list[i] == id){
                this.list.splice(i,1)
                return this.list
            }
        }
    }

    export(){
        var arr = []

        this.objects.forEach(function(obj,key,map){
            if(!obj.meta.disabled){
                arr.push(obj.export())
            }
        })

        return arr
    }

}

class Team extends Group{

    constructor(id, name, ai){
        super()
        
        this.id = id
        this.name = name 
        this.ai = ai
    }

    setName(name){
        this.name = name
        return name
    }

    toggleAI(set){

        if(set !== undefined){
            if(set){
                this.ai = true
            }else{
                this.ai = false
            }
        }else{
            this.ai = !this.ai
        }

        if(this.ai){
            doAIsequence()
        }

        return this.ai
    }

}

class Obstacles extends Group{

    constructor(obj){
        super()

        this.name = 'obs'
        this.info = obj
    }

}

/**********************
*    Collection
*
*********************

var Collection = function(){
    var this = this

    this.list = []
    this.objects = new Map()
    this.selectedObject
    this.name = 'collection'

    this.add = function(obj){
        obj.id = this.name+''+this.list.length
        this.list.push(obj.id)
        this.objects.set(obj.id, obj)
    }

    this.selectObject = function(id){
        this.selectedObject = this.objects.get('id')
        return this.selectedObject
    }

    this.deleteFromList = function(id){
        for(var i = 0; i<this.list.length; i++){
            if(this.list[i] == id){
                this.list[i].splice(i,1)
                break
            }
        }
    }

    this.export = function(){
        var arr = []

        this.objects.forEach(function(obj,key,map){
            if(!obj.meta.disabled){
                arr.push(obj.export())
            }
        })

        return arr
    }

}

var Obstacles = function(obj){
    Collection.call(this)
    var this = this;
    this.name = 'obs'
    this.info = obj
}

var Team = function(obj){
    Collection.call(this)
    var this = this;
    this.info = obj
    this.ai = false

    this.toggleAI = function(set){

        if(set !== undefined){
            if(set){
                this.ai = true
            }else{
                this.ai = false
            }
        }else{
            this.ai = !this.ai
        }

        if(this.ai){
            doAIsequence()
        }

        return this.ai
    }
*/
    /*this_team.unitlist = []
    this_team.units = new Map()
    this_team.dead_units = new Map()

    this.addUnit = function(obj){
        this_team.unitlist.push(obj.id)
        this_team.units.set(obj.id, obj)
    }

    this.removeUnit = function(obj){}

    this.export = function(){

        this_team.units.forEach(function(value,key,map){
            if(!value.meta.disabled){
                console.log(value)
            }
        })

    }
*/
/*    
    this.killUnit = function(Unit){
        var unitToKill;

        for(i=0; i<this_team.unitlist.length;i++){
            unitToKill = this_team.unitlist[i]

            if(unitToKill.id == Unit.id){
                this_team.unitlist.splice(i, 1)
                break;
            }
        }

        this_team.dead_units.set(Unit.id, Unit)
        this_team.units.delete(Unit.id)

    }

    this.populateTeam = function(roster){
        for(i = 0; i<roster.length; i++){
            this_team.addUnit(new unit(roster[i]["race"], roster[i]["subtype"], this_team, i)) 
        }
    }
*/
/*
    this.placeUnit = function(unit, targetx, targety){

        unit.setPos(targetx, targety)
        this_team.units.set(unit.id, this_team.unitlist[i])

    }
*/
/*
    this.placeUnits = function(placement_type, set_id){
        var randnum = 0;
        var randtile = 0;

        if(placement_type == "pre"){
            this_team.unitlist[0].setPos(0,0)
        }
        else if(placement_type == "random"){

                for(i = 0; i<this_team.unitlist.length; i++){

                    document.getElementById('gamearea').appendChild(this_team.unitlist[i].dom);
                    randnum = Math.floor(Math.random() * board.unoccupied_tiles.length);
                    randtile = board.unoccupied_tiles[randnum];

                    this_team.unitlist[i].setPos(randtile.x, randtile.y);
                    this_team.units.set(this_team.unitlist[i].id, this_team.unitlist[i]);
                    board.unoccupied_tiles.splice(randnum, 1);
                }
            
        }
    }

}*/
