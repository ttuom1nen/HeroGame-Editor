class Item extends Entity{

    constructor(type, slot){
        super()
        var _this = this
        this.elm
        this.name
        this.slot = slot

        /* World Sprite */
        this.sprite = document.createElement('div')
        this.sprite.classList.add('gear-'+type.size, type.cls)
        this.sprite.style.backgroundPositionX = type.bgpos_x
        this.sprite.style.backgroundPositionY = type.bgpos_y 
        
    }

    delete(){
        this.elm = null
        this.sprite = null
        return true
    }

}

/*
var armor = new Item(
    {'cls': 'armor', 'size': 'small', 'bgpos_x': 0, 'bgpos_y': 0},
    'torso')

var sword = new Item(
    {'cls': 'onehander', 'size': 'small', 'flip': false, 'bgpos_x': 0, 'bgpos_y': 0},
    'handr')

var flail = new Item(
    {'cls': 'onehander', 'size': 'small', 'flip': true, 'bgpos_x': '-32px', 'bgpos_y': 0},
    'handr')
*/

class ItemSlot {

    constructor(){
        var _this = this
        this.occupied = false
        this.item
        this.elm = document.createElement('div')
        this.elm.classList.add('item-slot')

        this.elm.addEventListener('mousedown', function(evt){
            if(_this.occupied){
                game.selectedUnit.equip(_this.item)
                _this.unpopulate()
            }
        })

    }

    populate(item){
        this.occupied = true
        this.item = item
        this.elm.appendChild(item.sprite)
        return item
    }

    unpopulate(){
        this.occupied = false
        this.item.delete()
        this.item = null
        return true
    }

}

class Inventory{

    constructor(size, id){
        this.slots = []
        this.create(size)
        this.render(document.getElementById(id))
    }

    create(size){

        for(var i = 0; i < size; i++){
            var slot = new ItemSlot()
            this.slots.push(slot)
        }

        return this.slots
    }

    render(container){

        for(var i = 0; i < this.slots.length; i++){
            container.appendChild(this.slots[i].elm)
        }

        return true
    }

}