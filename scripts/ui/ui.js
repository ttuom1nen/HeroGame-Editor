/*
class UiElement{

    constructor(){
        this.type = "uielm"
        this.disabled = false
        this.elm
        this.visible = true
    }

    show(){
        this.visible = true
        this.elm.style.visibility = 'visible'        
    }

    hide(){
        this.visible = false
        this.elm.style.visibility = 'hidden'
    }

    toggle(){

    }

    setContent(){

    }

    appendContent(){

    }

    export(){

    }

}

class ModalWin extends UiElement(){

    constructor(){
        super()

        this.modalbg = document.createElement('div')
        this.modalbg.classList.add('modal-bg')
        this.modalwin = document.createElement('div')
        this.modalwin.classList.add('modal-window')
        this.header = document.createElement('div')
        this.header.classList.add('modal-header')
        this.content = document.createElement('div')
        this.content.classList.add('modal-content')
        this.footer = document.createElement('div')
        this.footer.classList.add('modal-footer')
        this.closebtn = document.createElement('input')
        this.closebtn.type = 'button'
        this.closebtn.classList.add('modal-closebtn')
        this.closebtn.value = 'Sulje'
    
        this.footer.appendChild(this.closebtn)
        this.modalwin.appendChild(this.header)
        this.modalwin.appendChild(this.content)
        this.modalwin.appendChild(this.footer)
        this.modalbg.appendChild(this.modalwin)

        this.elm = this.modalbg
    }

}*/

/**
*   ModalWindow
*
**/

/*
function ModalWindow(container){
    var _this = this
    this.visible = false

    this.modalbg = document.createElement('div')
    this.modalbg.classList.add('modal-bg')

    this.modalwin = document.createElement('div')
    this.modalwin.classList.add('modal-window')

    this.header = document.createElement('div')
    this.header.classList.add('modal-header')

    this.content = document.createElement('div')
    this.content.classList.add('modal-content')

    this.footer = document.createElement('div')
    this.footer.classList.add('modal-footer')

    this.closebtn = document.createElement('input')
    this.closebtn.type = 'button'
    this.closebtn.classList.add('modal-closebtn')
    this.closebtn.value = 'Sulje'

    this.footer.appendChild(this.closebtn)
    this.modalwin.appendChild(this.header)
    this.modalwin.appendChild(this.content)
    this.modalwin.appendChild(this.footer)
    this.modalbg.appendChild(this.modalwin)

    this.show = function(){
        _this.visible = true
        _this.modalbg.style.visibility = 'visible'
    }

    this.hide = function(){
        _this.visible = false
        _this.modalbg.style.visibility = 'hidden'
    }

    this.toggle = function(){
        _this.visible = !_this.visible

        if(_this.visible){
            _this.show()
        }else{
            _this.hide()
        }

    }

    this.setContent = function(obj){

        if(obj.hasOwnProperty('header')){
            _this.header.innerHTML = obj.header
        }
        if(obj.hasOwnProperty('content')){
            _this.content.innerHTML = obj.content
        }

    }

    this.appendContent = function(obj){

        if(typeof(obj) == 'object'){
            if(obj.hasOwnProperty('content')){
                _this.content.innerHTML += obj.content
            }
        }else{
            _this.content.innerHTML += obj
        }

    }

    this.appendElmToContent = function(elm){
        _this.content.appendChild(elm)
    }

    this.modalbg.addEventListener('mousedown', function(evt){
        if(evt.target.classList.contains('modal-bg')){
            _this.hide()
        }
    })

    this.closebtn.addEventListener('mousedown', function(evt){
        _this.hide()
    })

    container.appendChild(this.modalbg)

}*/

//var modalwin = new ModalWin()