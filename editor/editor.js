/**
 * Editor
 */

var Editor = (function() {
    var mode = ''
    var obj = {}

    function isUndefined(value){
        if(value === undefined){
            return true
        }else{
            return false
        }
    }

    return {
        setObj: function (setobj){
            obj = setobj
        },
        getObj: function (){
            return obj
        },
        setMode: function (setmode){
            mode = setmode
        },
        getMode: function (){
            return mode
        }      
    };
})()

document.addEventListener("keyup", function(event) {

    if(game.selectedPiece !== undefined){   
    
        if(event.keyCode === 70) {
            game.selectedPiece.flip()
        }else if(event.keyCode === 71 || event.keyCode === 77){
            Editor.setMode('move')
        }

    }

})

//var obstacles = new Obstacles()

/*
board.placeOnBoard(hero, 5, 5)

var inv = new Inventory(3, 'controls')
inv.slots[0].populate(armor)
inv.slots[1].populate(flail)
inv.slots[2].populate(sword)
*/
game.addTeam(2)
game.selectTeam('T0')