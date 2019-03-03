var human_names = ["George", "Paul", "Joel", "Margaret", "Simo", "Timo", "Hasan", "Alex", "Tommy", "Jarmo"];

function chooseName(namearr){
    return namearr[Math.floor(Math.random()*namearr.length)];
}



/***
*   Heroes
*
***/
function HeroStats(cls, sex){

    var _this = this

    this.stats = {
        "list": ["war","wiz","pal"],
        "war": {
            "female": {},
            "male": {
                "meta": {
                    "disabled": false,
                    "type": "Hero",          
                    "sheet-cls": "hero_main_war_male",
                    "sheet-size": 256,
                    "width": 64,
                    "height": 128,
                    "flipped": 1             
                },
                "stats": {
                    "alive": true,
                    "lvl": 0,
                    "lvl_max": 3,
                    "lvl_prog":[{"dmg":11},{"hp_max":53},{"dex":7}],
                    "exp": 0,
                    "exp_max": [100,200,300],
                    "name": "unit name",
                    "moves": 2,
                    "moves_max": 2,
                    "hp": 50,
                    "hp_max": 50,
                    "mp": 0,
                    "mp_max": 0,
                    "def": 0,
                    "dmg": 10,
                    "dex": 5,
                    "agi": 2,
                    "int": 10,
                    "range": 1.5,
                    "height": 1 
                }
            }       
        }
    }

    this.getStats = function(cls, sex){
        return _this.stats[cls][sex]
    }
    
}

/***
*   Units
*
***/

function UnitStats(){
    var _this = this

    this.stats = {
        "human":{
            "military":{
                "militia":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Militia",            
                        "cls": "militia",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"dmg":11},{"hp_max":53},{"dex":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 10,
                        "dex": 5,
                        "agi": 2,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                },
                "herbalist":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Herbalist",            
                        "cls": "herbalist",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                },        
                "woodsman":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Woodsman",            
                        "cls": "woodsman",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1,
                        "height": 1 
                    }
    
                },
                "archer":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Archer",            
                        "cls": "archer",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 3.5,
                        "height": 1 
                    }
    
                },
                "soldier":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Soldier",            
                        "cls": "soldier",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1,
                        "height": 1 
                    }
    
                },
                "pikeman":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Pikeman",            
                        "cls": "pikeman",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                },
                "priest":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Priest",            
                        "cls": "priest",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 3.5,
                        "height": 1 
                    }
    
                },
                "cavalry":{
                    "meta": {
                        "disabled": false,
                        "type": "Human",
                        "subtype": "Cavalry",            
                        "cls": "cavalry",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 3,
                        "moves_max": 3,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                }             
            }
        },
        "undead":{
            "legion":{
                "zombie":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Legion",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"dmg":11},{"hp_max":53},{"dex":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 10,
                        "dex": 5,
                        "agi": 2,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
                },
                "bombie":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Legion",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                },        
                "bambie":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Legion",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1.5,
                        "height": 1 
                    }
    
                },
                "undead1":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Legion",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 3.5,
                        "height": 1 
                    }
    
                },
                "undead2":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Soldier",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 1,
                        "height": 1 
                    }
    
                },
                "undead3":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Pikeman",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 3.5,
                        "height": 1 
                    }
    
                },
                "undead4":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Priest",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 50,
                        "hp_max": 50,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 12,
                        "dex": 6,
                        "agi": 5,
                        "int": 10,
                        "range": 3.5,
                        "height": 1 
                    }
    
                },
                "undead5":{
                    "meta": {
                        "disabled": false,
                        "type": "Undead",
                        "subtype": "Giant",            
                        "cls": "",
                        "width": 64,
                        "height": 128,
                        "flipped": 1,
                        "imgpoint": {"x":0, "y":64},
                        "midpoint": {"x":32, "y":64}
                    },
                    "stats": {
                        "alive": true,
                        "lvl": 0,
                        "lvl_max": 3,
                        "lvl_prog":[{"hp_max":55},{"dmg":15},{"agi":7}],
                        "exp": 0,
                        "exp_max": [100,200,300],
                        "name": "unit name",
                        "moves": 2,
                        "moves_max": 2,
                        "hp": 150,
                        "hp_max": 150,
                        "mp": 0,
                        "mp_max": 0,
                        "def": 0,
                        "dmg": 22,
                        "dex": 2,
                        "agi": 2,
                        "int": 2,
                        "range": 1.5,
                        "height": 3 
                    }
    
                }             
            }
        }
    }

    this.getStats = function(race, faction, type){
        return _this.stats[race][faction][type];
    }    
}

var races = {
    "racelist": ["human","undead"],
    "human": {
        "name": "Humans",
        "description": "",
        "factionlist": ["military"],
        "military": {
            "name": "Human military",
            "description": "Human military description",
            "sheet-cls": "human_military_blue",
            "sheet-size": 256,
            "units":
            ["militia","herbalist","woodsman",
            "archer","soldier","pikeman","priest","cavalry"]
        },
        "imperium": {
            "name": "Human imperium",
            "description": "Human imperium description",
            "sheet-cls": "",
            "sheet-size": 256
        }
        
    },

    "undead": {
        "name": "The undead",
        "description": "The undead are scary",
        "factionlist": ["legion"],
        "legion":{
            "name": "Undead legion",
            "description": "Undead legion description",
            "sheet-cls": "undead_legion",
            "sheet-size": 256,
            "units":
            ["zombie","bombie","bambie",
            "undead1","undead2","undead3","undead4","undead5"]            
        },
        "deathcult":{
            "name": "Death cult",
            "description": "Cult ruling the dead",
            "sheet-cls": "",
            "sheet-size": 256                
        }
    
    }

}


/***
*   Obstacles
*
***/

function getObsStats(type, subtype){
    console.log('type:'+type+' subtype:'+subtype )
    console.log(obsStats[type][subtype])
    return obsStats[type][subtype]
}

var obsStats = 
{
    "list": ["tree"],
    "tree":{
        "list": ["green", "barren"],
        
        "green":{
            "meta":{
                "disabled": false,
                "type": "Tree",          
                "sheet-cls": "trees_green",
                "sheet-size": 256,
                "width": 64,
                "height": 128,
                "flipped": 1,
                "imgpoint": {"x":0, "y":64},
                "midpoint": {"x":32, "y":64}
            },
            "stats":{
                "hp": 100,
                "hp_max": 100,
                "height": 3,
                "block": 1
            }
        },
        "barren":{
            "meta":{
                "disabled": false,
                "type": "Tree",          
                "sheet-cls": "trees_barren",
                "sheet-size": 256,
                "width": 64,
                "height": 128,
                "flipped": 1,
                "imgpoint": {"x":0, "y":64},
                "midpoint": {"x":32, "y":64}
            },
            "stats":{
                "hp": 70,
                "hp_max": 70,
                "height": 3,
                "block": 0.7
            }
        }
    }   
}
