/**
 * This function is used for attacking a target
 * @param {object} attacker 
 * @param {object} victim 
 */
function attack(attacker, victim){

    if(attacker.checkMoves()){

        var dmgmin = attacker.stats['dmg'];
        var dmgAmount = victim.stats.def-dmgmin;
        var angle = getAngle(attacker.pxpos_x, attacker.pxpos_y, victim.pxpos_x, victim.pxpos_y)
        var victim_x = victim.pxpos_x;
        var victim_y = victim.pxpos_y;
        var anglevar = 0;

        attacker.flip(angle)

        if(dmgAmount >= 0){
            dmgAmount = -1;
        }

        if(angle == 0){
            anglevar = 0;
        }else if(angle == 180 || angle == -180){
            anglevar = 180;
        }else if(angle == 90){
            anglevar = 90;
        }else if(angle == -90){
            anglevar = -90;
        }
        else if(angle > -90 && angle < 0){
            anglevar = -45;
        }
        else if(angle < 90 && angle > 0){
            anglevar = 45;
        }
        else if(angle < -90 && angle > -180){
            anglevar = -135;
        }
        else if(angle < 180 && angle > 90){
            anglevar = 135;
        }

        if(this.subtype == "archer"){
            var projectile = document.createElement("div");
            projectile.className = "arrow";
            projectile.setAttribute("style", "transform: rotate("+angle+"deg); z-index: "+(victim.dom.style.zIndex+1)+"; top: "+(this.pxpos_y-32)+"px; left: "+this.pxpos_x+"px;");
            document.getElementById("gamearea").appendChild(projectile)
            translate(projectile,victim_x,victim_y-32)
        }

        attacker.updateMoves(-1)
        attacker.dom.classList.remove('attack_0','attack_180','attack_45','attack_-45','attack_90','attack_-90','attack_135','attack_-135');
        void attacker.dom.offsetWidth;
        attacker.dom.classList.add('attack_'+anglevar);
        victim.takeDmg(dmgmin)
        createMoveArea(attacker)
    }
}

/**
 * Loops through all enemy teams and looks for targets
 * @param {object} attacker 
 */
function seekTarget(attacker){
    var distance = 0;
    var closest = 9999;
    targets = {"in_range":[], "not_in_range":[], "closest": [], "atkareas": []};

    game.teams.forEach(function (team, key, map) {
        if(key != game.whosturn){

            team.objects.forEach(function (enemy) {
                if(enemy.alive){
                    distance = getDistance(attacker.pxpos_x, attacker.pxpos_y, enemy.pxpos_x, enemy.pxpos_y)

                    if(distance <= attacker.stats.range*64){ 

                        targets["in_range"].push({"victim": enemy, "distance": distance, "angle": getAngle(attacker.pxpos_x, attacker.pxpos_y, enemy.pxpos_x, enemy.pxpos_y)});
                        //createAtkMarkers(value); //value.dom.style.border = '1px solid red'
        
                        var atkmarker = document.createElement('div')
                        atkmarker.classList.add('atkmarker', 'indicator')
                        atkmarker.style.left = enemy.pxpos_x;
                        atkmarker.style.top = enemy.pxpos_y;
                        atkmarker.target = enemy
                        enemy.target = true

                        //document.getElementById('gamearea').appendChild(atkmarker)
                        enemy.dom.appendChild(atkmarker)
        
                        //console.log({'left': attacker.tile.x,'top': attacker.tile.y}, {'left': value.tileindex_x,'top': value.tileindex_y})
        
                        if(attacker.stats.range > 1.5){
                            bresenhamLine({'left': attacker.tile.x,'top': attacker.tile.y}, {'left': enemy.tile.x,'top': enemy.tile.y})
                        }
        
                        //attacker.targets.atkareas.push(atkmarker)
                    }else{
                        enemy.target = false
                        targets["not_in_range"].push({"victim": enemy, "distance": distance, "angle": getAngle(attacker.pxpos_x, attacker.pxpos_y, enemy.pxpos_x, enemy.pxpos_y)});
                    }
                    
                }
            })

        }
    })

    return targets
}

/**
 * Creates a move area around the selected unit
 * @param {object} unitobj 
 */
function createMoveArea(unitobj){
    var unitx = unitobj.tile.x;
    var unity = unitobj.tile.y;
    var areax = unitx-unitobj.stats.moves;
    var areay = unity-unitobj.stats.moves;
    var corr = (unitobj.stats.moves > 1) ? 1:0;
    var areas = []
    delMoveArea()

    for(var y = 0; y < (3*unitobj.stats.moves)-corr; y++){

        for(var x = 0; x < (3*unitobj.stats.moves)-corr; x++){

            if(areax != unitx || areay != unity){
                if(board.layout[areax] != undefined){
                    if(board.layout[areax][areay] != undefined){

                        var targetTile = board.layout[areax][areay];

                        if(!targetTile.occupied){
                            var dist = getDistance(unitx,unity,areax,areay)

                            if(dist < 2.1){
                                var movemarker = document.createElement('div');
                                movemarker.classList.add('movemarker', 'indicator');
                                movemarker.style.zIndex = 1
                                
                                if(dist > 1 || unitobj.stats.moves == 1){

                                    if(lineofsight({'left': unitx, 'top': unity}, {'left': areax, 'top': areay})){
                                        movemarker.classList.add('mvmrkr-orange');
                                        movemarker.apcost = -2;
                                        areas.push(movemarker)
                                    }
                                    
                                }else{
                                    movemarker.classList.add('mvmrkr-green');
                                    movemarker.apcost = -1;
                                    areas.push(movemarker)
                                }

                                movemarker.tile = targetTile;
                                movemarker.addEventListener('mousedown', function(evt){
                                    game.selectedUnit.move(evt.target.apcost, evt.target.tile.x, evt.target.tile.y);
                                })

                                targetTile.dom.appendChild(movemarker);
                                
                            }
                        }

                    }
                }
            }
            areax++;
        }

        areax = unitx-unitobj.stats.moves;
        areay++;
    }

    unitobj.mvmrkrs = areas
    return areas
}

/**
 * Deletes current move area
 */
function delMoveArea(){
    var markers = document.querySelectorAll('.movemarker');

    if(markers.length > 0){
        for(i=0; i<markers.length; i++){
            var elem = markers[i];
            elem.parentNode.removeChild(elem);
        }
    }
    
    /*
    if(game.selectedUnit.mvmrkrs.length > 0){
        for(var i = 0; i < game.selectedUnit.mvmrkrs.length; i++){
            game.selectedUnit.mvmrkrs[i].parentNode.removeChild(game.selectedUnit.mvmrkrs[i]);
        }

        game.selectedUnit.mvmrkrs = []

        return true
    }else{
        return false
    }*/
}

/**
 * Delete indicators
 */
function delIndicators(){
    var markers = document.querySelectorAll('.indicator');

    if(markers.length > 0){
        for(i=0; i<markers.length; i++){
            var elem = markers[i];
            elem.parentNode.removeChild(elem);
        }
    }
}

/**
 * Creates a dmg marker / blood
 * @param {int} bloodx 
 * @param {int} bloody 
 * @param {int} dmg 
 */
function createDmgMarker(bloodx, bloody, dmg){

    var bloodsplat = document.createElement('div');
    bloodsplat.classList.add('bloodsplat');
    bloodsplat.style.zIndex = 99;
    bloodsplat.style.left = bloodx;
    bloodsplat.style.top = bloody;

    var dmgtext = document.createElement('p');
    dmgtext.className = "dmgtext";
    dmgtext.innerHTML = dmg;
    dmgtext.style.top = '0px';
    bloodsplat.appendChild(dmgtext);

    var inttime = 0;

    var fadeEffect = setInterval(function () {

        if(inttime > 5){
            clearInterval(fadeEffect);
            document.getElementById("gamearea").removeChild(bloodsplat);
        }else{
            inttime++;
        }

    }, 100);

    document.getElementById("gamearea").appendChild(bloodsplat);

}

/**
 * Shows unit information
 * @param {object} unitobj 
 */
function showUnitInfo(unitobj){

    document.getElementById("modal-header").innerText = "Unit information";

    var modalinfo = document.getElementById("modal-info");
    modalinfo.innerHTML = "";

    var leftside = document.createElement("div");
    leftside.classList.add("unit_infoleft");
    leftside.id = "infoleft";

    var unit_portrait = document.createElement("div");
    unit_portrait.classList.add("unit", unitobj.stats.classname);

    leftside.appendChild(unit_portrait);

    var rightside = document.createElement("div");
    rightside.classList.add("unit_inforight");
    rightside.id = "inforight";

    for (var key in unitobj.stats) {
        
        if(key != "imgpoint" && key != "midpoint" && key != "classname" && key != "alive"){
            var infoblock = document.createElement("div");
            var div_left = document.createElement("div");
            div_left.classList.add("infoblock_left");
            var div_right = document.createElement("div");
            div_right.classList.add("infoblock_right");

            div_left.innerText = key;
            div_right.innerText = unitobj.stats[key];

            infoblock.appendChild(div_left);
            infoblock.appendChild(div_right);
            infoblock.classList.add("unit_infoblock");

            rightside.appendChild(infoblock);
        }
    }

    modalinfo.appendChild(leftside);
    modalinfo.appendChild(rightside);
    document.getElementById("modal").style.visibility = "visible";

}