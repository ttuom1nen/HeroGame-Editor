/**
 * AI closure
 */
var AI = (function(){

    var obj = {}
    var selunit
    var turn = false

    return{

        setUnit: function(obj){
            selunit = obj
        },
        getUnit: function(){
            return selunit
        },
        setTurn: function(value){
            turn = value
        },
        getTurn: function(){
            return turn
        }

    }

})()

var intval_index = 0

/**
 * Main action for AI. This function gets called when the current player is AI
 */
function doAI(){

    var cur_team = game.selectedTeam
    var cur_unit
    intval_index = 0

    console.log(cur_team)

    //for(var i = 0; i < cur_team.list.length; i++){

    executeTurn(cur_team.objects.get(cur_team.list[0]))

    var timer = setInterval(function(){
        console.log('interval!')

        if(intval_index < cur_team.list.length){
            cur_unit = cur_team.objects.get(cur_team.list[intval_index])
            executeTurn(cur_unit)

            //intval_index++
        }else{
            interval_index = 0
            clearTimeout(timer);
            setTurn()
        }

    }, 500)

    //}

}

/**
 * Executes a series of actions for the current AI unit
 * @param {object} unit 
 */
function executeTurn(unit){

    console.log('--- Executing Turn ---')
    console.log(unit.dom)

    delIndicators()

    var current_unit = unit
    var targets = seekTarget(current_unit)
    var areas = createMoveArea(current_unit)

    console.log(areas)

    if(targets["in_range"].length > 0){
        attack(current_unit, targets["in_range"][0]["victim"]);
    
    }else{
        var closest = getClosestMove(areas)
        console.log(closest)
        current_unit.move(closest.apcost, closest.area.tile.x, closest.area.tile.y)
    }

    if(unit.stats.moves <= 0){
        intval_index++
    }    
}

/**
 * Pick the movement area that is closest to an enemy unit
 * @param {Array} areas 
 */
function getClosestMove(areas){
    var closest = 9999
    var distance = 0
    var closest_area

    for(var i = 0; i<areas.length;i++){

        var curarea = areas[i]
        distance = Math.floor(getDistance(curarea.tile.px_x, curarea.tile.px_y, targets.not_in_range[0].victim.pxpos_x, targets.not_in_range[0].victim.pxpos_y,))

        curarea.innerText = distance

        if(distance < closest){
            closest = distance
            closest_area = curarea
        }

    }

    return {'area': closest_area, 'apcost': closest_area.apcost}
}