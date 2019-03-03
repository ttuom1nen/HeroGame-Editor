setHeaderBar()
createTabs()

var selicon = document.createElement('div')
selicon.classList.add('selector')

function setHeaderBar(){
    var teamlist = document.getElementById('teamlist')

    for(var i=0; i<game.teamlist.length; i++){
        var option = document.createElement("option");
        option.value = game.teamlist[i];
        option.innerHTML = game.teamlist[i];

        teamlist.appendChild(option)
    }

}

document.getElementById('teamlist').addEventListener("change", function() {
    
    var teamsel = document.getElementById('teamlist')
    var teamvalue = teamsel[teamsel.selectedIndex].value;

    console.log("value: "+teamvalue+" innerHTML: "+teamsel[teamsel.selectedIndex].innerHTML)

    game.selectedTeam = game.teams.get(teamvalue)
    //game.selectTeam(teamvalue)

});

document.getElementById('racelist').addEventListener("change", function() {
    
    var selector = document.getElementById('racelist')
    var value = selector[selector.selectedIndex].value;

    console.log("value: "+value+" innerHTML: "+selector[selector.selectedIndex].innerHTML)

    changeRace(value, selector[selector.selectedIndex].innerHTML)

});

document.getElementById('obslist').addEventListener("change", function() {
    
    var selector = document.getElementById('obslist')
    var value = selector[selector.selectedIndex].value;

    console.log("value: "+value+" innerHTML: "+selector[selector.selectedIndex].innerHTML)

    changeObs(value, selector[selector.selectedIndex].innerHTML)

});

document.getElementById('tabs_buttons').addEventListener('click', function(evt){

    if(evt.target.classList.contains('tabbtn')){
        console.log(evt.target)

        if(evt.target.id == 'tabbtn1'){
            disableClkZones()
            hideObjBtns()
        }else{
            enableClkZones()
            showObjBtns()
        }

        changeTab(evt.target.tabid)
    }

})

function createTabs(){
    var tabs = document.getElementsByClassName('tab')
    console.log(tabs)

    var tabs_buttons = document.getElementById('tabs_buttons')
    //var tabs_container = document.getElementById('tabs_container')

    for(var index = 0; index<tabs.length; index++){
        var item = tabs[index]
        var tabbtn = document.createElement('span')
        var tabname = item.attributes.name.value

        tabbtn.innerText = tabname
        tabbtn.tabid = tabs[index].id
        tabbtn.classList.add('tabbtn')
        tabbtn.active = false
        tabbtn.id = "tabbtn"+index
        tabbtn.name = tabname

        tabs_buttons.appendChild(tabbtn)
 
        var tabcontent = document.getElementById(tabs[index].id+'-content')

        console.log(tabs[index].id+'-content')
        console.log('tabname: '+tabname)

        if(tabname == 'Units'){
            populateUnitsTab(tabcontent)

        }else if(tabname == 'Tiles'){
            populateTilesTab(tabcontent)
            
        }else if(tabname == 'Obstacles'){
            populateObsTab(tabcontent)
        }

        //tabs_container.appendChild(tabcontent)

    }

    changeTab('tab0')

}

function changeTab(tabid){
    var tabcontent;

    tabcontent = document.getElementsByClassName("tab");
 
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tabid).style.display = "block";
    console.log("show tab: "+tabid)
}

function populateTilesTab(container){

    for(var y=0;y<8;y++){

        for(var x=0;x<8;x++){

            var tilebtn = document.createElement('div')
            tilebtn.classList.add('tile','tile_grass','tile_btn')
            tilebtn.bgposx = (x*64)*-1
            tilebtn.bgposy = (y*64)*-1
            tilebtn.style.backgroundPosition = ''+tilebtn.bgposx+' '+tilebtn.bgposy

            tilebtn.addEventListener('click', function(evt){
                Editor.setMode('tile')
                Editor.setObj({'bgx': evt.target.bgposx, 'bgy': evt.target.bgposy})
            })

            container.appendChild(tilebtn)
        }

    }

}

function changeRace(value, race){
    var container = document.getElementById('tab0-content')
    container.innerHTML = ""
    var raceobj = races[race]
    var factions = raceobj.factionlist
    console.log(raceobj)
    console.log(factions)

    for(var i = 0; i < factions.length; i++){
        var faction = raceobj[factions[i]]
        var factionname = factions[i]
        console.log(faction)

        for(var k = 0; k < faction.units.length; k++){

            var unittype = faction.units[k]
            //var unitstats = UnitStats.getStats(race, factionname, unittype)
            var unitbtn = document.createElement('div')
            unitbtn.id = 'unitbtn'+k
            unitbtn.classList.add('unitbtn', faction['sheet-cls'], factionname+'_'+unittype)
            unitbtn.style.marginLeft = (64*i)+'px'
            unitbtn.race = race
            unitbtn.faction = factionname
            unitbtn.type = unittype
    
            unitbtn.addEventListener('click', function(evt){
                console.log(evt.target.race)
                console.log(evt.target.type)
                Editor.setMode('unit')
                Editor.setObj({'race': evt.target.race, 'faction': evt.target.faction, 'type': evt.target.type})
            })

            container.appendChild(unitbtn)

        }

    }

}

function populateUnitsTab(){

    for(var i = 0; i < races.racelist.length; i++){
        var race = races.racelist[i]
        var raceobj = races[race]

        var list = document.getElementById('racelist')
        var option = document.createElement("option");
        option.value= i;
        option.innerHTML = race;

        list.appendChild(option)
    }

    changeRace(0, 'human')
}

function changeObs(type, subtype){
    var container = document.getElementById('tab2-content')
    container.innerHTML = ""
    var obsobj = obsStats[type][subtype]

    var sheetsize = obsobj.meta["sheet-size"]
    var singlewidth = obsobj.meta.width
    var singleheight = obsobj.meta.height

    var singles_x = sheetsize/singlewidth
    var singles_y = sheetsize/singleheight

    console.log(obsobj)

    for(var i = 0; i < singles_y; i++){

        for(var k = 0; k < singles_x; k++){
            var bgpos_x = (singlewidth*k)*-1
            var bgpos_y = (singleheight*i)*-1

            var btn = document.createElement('div')
            btn.type = type
            btn.subtype = subtype
            btn.classList.add('piece-btn', obsobj.meta["sheet-cls"])
            btn.style.height = singleheight+'px'
            btn.style.width = singlewidth+'px'
            btn.bgx = bgpos_x
            btn.bgy = bgpos_y
            btn.style.backgroundPositionX = bgpos_x+'px'
            btn.style.backgroundPositionY = bgpos_y+'px'

            btn.addEventListener('click', function(evt){
                Editor.setMode('obstacle')
                Editor.setObj({'type': evt.target.type, 'subtype': evt.target.subtype, 'bgpos':{'bgx': evt.target.bgx, 'bgy': evt.target.bgy}})
            })

            container.appendChild(btn)
        }

    }
/*
        var unittype = faction.units[k]
        var unitstats = getUnitStats(race, factionname, unittype)
        var unitbtn = document.createElement('div')
        unitbtn.id = 'unitbtn'+k
        unitbtn.classList.add('unitbtn', faction['sheet-cls'], factionname+'_'+unittype)
        unitbtn.style.marginLeft = (64*i)+'px'
        unitbtn.race = race
        unitbtn.faction = factionname
        unitbtn.type = unittype

        unitbtn.addEventListener('click', function(evt){
            console.log(evt.target.race)
            console.log(evt.target.type)
            editormode = 'unit'
            editobj = {'race': evt.target.race, 'faction': evt.target.faction, 'type': evt.target.type}
        })

        container.appendChild(unitbtn)
*/
}

function populateObsTab(){

    for(var i = 0; i < obsStats.list.length; i++){

        var name = obsStats.list[i]
        var listelm = document.getElementById('obslist')
        var optionelm = document.createElement("option");
        optionelm.value= i;
        optionelm.innerHTML = name;

        listelm.appendChild(optionelm)

        var curobj = obsStats[name]

        for(var k = 0; k < curobj.list.length; k++){
            
            var subname = curobj.list[k]
            var sublistelm = document.getElementById('obssublist')
            var suboptionelm = document.createElement("option");
            suboptionelm.value= i;
            suboptionelm.innerHTML = subname;
    
            sublistelm.appendChild(suboptionelm)            

        }
    
    }

    changeObs('tree', 'green')
}

/*--- Object buttons ---*/
/*
function createObjBtns(container){

    var btnmove = document.createElement('img')
    btnmove.classList.add('obj-btn')
    btnmove.type = 'move'
    btnmove.src = 'images/btnmove.jpg'

    var btnrotate = document.createElement('img')
    btnrotate.classList.add('obj-btn')
    btnrotate.type = 'rotate'
    btnrotate.src = 'images/btnrotate.jpg'

    var btndel = document.createElement('img')
    btndel.classList.add('obj-btn')
    btndel.type = 'delete'
    btndel.src = 'images/btndel.jpg'

    container.appendChild(btnmove)
    container.appendChild(btnrotate)
    container.appendChild(btndel)

    container.addEventListener('click', function(evt){
        objectClick(evt, newunit)
    })

    return container
}*/

function hideObjBtns(){
    var objbtns = document.getElementsByClassName('objbtns')

    for(i=0; i<objbtns.length; i++){
        objbtns[i].style.display = 'none'
    }
    
}

function showObjBtns(){
    var objbtns = document.getElementsByClassName('objbtns')

    for(i=0; i<objbtns.length; i++){
        objbtns[i].style.display = 'block'
    }
    
}
/*
function objectClick(evt, obj){
    console.log(evt.target.type)
    if(evt.target.type == 'move'){
        Editor.setMode('move')'
        editobj = {'obj': obj}
    }else if(evt.target.type == 'rotate'){
        editormode = 'rotate'
        board.flipObj(obj)
    }else if(evt.target.type == 'delete'){
        console.log(evt.target.type)
        board.removeFromBoard(obj)
    }
}*/

function enableClkZones(){
    var zones = document.getElementsByClassName('clkzone')

    for(i=0; i<zones.length; i++){
        zones[i].classList.remove('disabled')
    }

}

function disableClkZones(){
    var zones = document.getElementsByClassName('clkzone')

    for(i=0; i<zones.length; i++){
        zones[i].classList.add('disabled')
    }

}