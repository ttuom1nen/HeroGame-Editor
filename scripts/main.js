var Game = function(){
    var _this = this
    this.gamemode = false
    this.teamlist = []
    this.obslist = []
    this.teams = new Map()
    this.selectedTeam
    this.selectedUnit
    this.selectedPiece
    this.selectedObs
    this.whosturn = 'T0'
    this.teamindex = 0
    this.paused = false

    this.addTeam = function(amount){

        if(amount === undefined){
            amount = 1
        }

        for(var i = 0; i<amount; i++){
            var teamid = 'T'+_this.teamlist.length
            var teamobj = new Team(teamid, 'teamname', false)
            _this.teamlist.push(teamid)
            _this.teams.set(teamid, teamobj)
            _this.selectedTeam = teamobj
        }

        return _this.teams

    }

    this.removeTeam = function(id){
        _this.teams.delete(id)
    }

    this.selectTeam = function(id){
        _this.selectedTeam = _this.teams.get(id)
        return _this.selectedTeam
    }

    this.selectUnit = function(obj){
        this.selectedUnit = obj
        this.selectedPiece = obj
        return obj
    }

    this.addObstacle = function(obj){
        _this.obslist.push(obj)
        return obslist
    }

    this.export = function(){

        var exported = {
            'teams': [],
            'obstacles': [],
            'board': {
                'layout': []
            }
        }
        
        _this.teams.forEach(function(team, teamid, map){
    
            if(team.list.length > 0){
                var teamobj  = {'id': teamid, 'name': team.name, 'units': []}
    
                team.objects.forEach(function(unit){
                    teamobj.units.push(unit.export())
                })
    
                exported.teams.push(teamobj)
            }
    
        })
    
        _this.obslist.forEach(function(obstacle){
            exported.obstacles.push(obstacle.export())
        })
    
        exported.board.layout = board.export()
    
        console.log(exported)
    
        return JSON.stringify(exported)
    
    }

    this.save = function(){
        sessionStorage.setItem('save', _this.export())
    }

    this.load = function(){

        if(sessionStorage.getItem('save')){

            var imported = JSON.parse(sessionStorage.getItem('save'))
            board.setBoard(imported.board.layout)
    
            console.log(imported)
    
            for(var i = 0; i < imported.teams.length; i++){
                _this.selectTeam(imported.teams[i].id)
    
                for(var k = 0; k < imported.teams[i].units.length; k++){
    
                    var curunit = imported.teams[i].units[k]
                    console.log(curunit)
    
                    var newunit = new Soldier(curunit.info.race, curunit.info.faction, curunit.info.type)
                    newunit.team = _this.selectedTeam
                    newunit.id = imported.teams[i].id+'U'+newunit.team.list.length
                    newunit.dom.id = imported.teams[i].id+'U'+newunit.team.list.length
                    
                    if(curunit.flipped == -1){
                        newunit.flip()
                    }

                    newunit.team.add(newunit)
    
                    board.placeOnBoard(newunit, curunit.loc.tilex, curunit.loc.tiley)
    
                }
    
            }

            for(var i = 0; i < imported.obstacles.length; i++){
                var curobs = imported.obstacles[i]
                var newobs = new Obstacle(curobs.info.type, curobs.info.subtype, curobs.info.bgpos)
                _this.addObstacle(newobs)
                board.placeOnBoard(newobs, curobs.loc.tilex, curobs.loc.tiley)
            }

        }
    
        game.selectedTeam = game.teams.get(game.teamlist[0])
    }

    this.toggleMode = function(){
        this.gamemode = !this.gamemode

        return this.gamemode
    }

}

var game = new Game()

initGame()

function initGame(){
    board.initBoard(12, 8);
}

function setTurn(){
    game.teamindex++

    if(game.teamindex >= game.teamlist.length){
        game.teamindex = 0
    }

    var index = game.teamindex

    game.selectedTeam = game.teams.get(game.teamlist[game.teamindex])
    game.whosturn = game.teamlist[game.teamindex]
    game.selectedUnit = null

    for(var k = 0; k < game.selectedTeam.list.length; k++){
        var curunit = game.selectedTeam.objects.get(game.selectedTeam.list[k])

        if(curunit.alive){
            curunit.stats.moves = curunit.stats.moves_max
        }
        
    }

    delIndicators()
    updateTurnText()

}

function updateTurnText(){
    var turntext = document.getElementById('turntext')
    turntext.innerText = 'Turn: '+ game.selectedTeam.name
}

document.getElementById('controls').addEventListener("click", function(e){

    if(e.target.id == 'endturn'){
        setTurn()
    }

});

function endGame(){
    if(game.selectedTeam.list.length == 0){
        return true
    }else{
        return false
    }
}


/*
function incrementInterval(){
    if(interval_index < current_team.units.size){

        var unitid = current_team.unitlist[interval_index].id;
        current_unit = current_team.units.get(unitid);

        console.log("--- info ---");
        console.log("interval_index: "+interval_index);
        console.log("unitid: "+unitid);
        console.log("unitlist.length: "+current_team.unitlist.length);
        console.log(current_unit.dom);
        
        if(current_unit.stats.alive){
            console.log("UNIT ALIVE");
            executeTurn();
        }else{
            console.log("UNIT IS NOT ALIVE!");
        }

        console.log("");
        interval_index++;
    }else{
        interval_index = 0;
        setTurn();
    }
}
*/