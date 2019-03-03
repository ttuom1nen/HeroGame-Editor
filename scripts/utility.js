/**********************
*   Utility Functions
*
**********************/

/**
 * Get a random number between values
 * @param {int} min 
 * @param {int} max 
 */
function randomBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Get distance between two points
 * @param {int} x1 
 * @param {int} y1 
 * @param {int} x2 
 * @param {int} y2 
 */
function getDistance(x1,y1,x2,y2){
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );

    return c;
}

/**
 * Get angle between two points
 * @param {int} x1 
 * @param {int} y1 
 * @param {int} x2 
 * @param {int} y2 
 */
function getAngle(x1,y1,x2,y2){
    var angleDeg = Math.floor(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI);
    return angleDeg
}

/**
 * Check line between two points and check
 * if tiles along that line are occupied.
 * @param {object} startCoordinates {x,y}
 * @param {object} endCoordinates {x,y}
 * @todo combine with brasenhamLine function
 */
function lineofsight(startCoordinates, endCoordinates){

    var coordinatesArray = new Array();
    // Translate coordinates
    var x1 = startCoordinates.left;
    var y1 = startCoordinates.top;
    var x2 = endCoordinates.left;
    var y2 = endCoordinates.top;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    while (!((x1 == x2) && (y1 == y2))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }

        if(board.layout[x1][y1].occupied){

            return false;

            /*
            if(x1 == endCoordinates.left && y1 == endCoordinates.top){
                return true;
            }else{
                return false;
                break;
            }*/

        }else{
            return true; 
        }

    }

}
/**
 * Uses the Brasenham line algorithm to check a staggered path along a grid
 * @param {object} startCoordinates 
 * @param {object} endCoordinates 
 * @todo Combine with lineofsight function
 */
function bresenhamLine(startCoordinates, endCoordinates) {
    //console.log('Bresenham')
    var coordinatesArray = new Array();
    // Translate coordinates
    var x1 = startCoordinates.left;
    var y1 = startCoordinates.top;
    var x2 = endCoordinates.left;
    var y2 = endCoordinates.top;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
    // Set first coordinates
    /*var linemarker = document.createElement('div')
    if(!board.layout[x1][y1].occupied){
        linemarker.classList.add('indicator', 'lnmark_green')
      }else{
        linemarker.classList.add('indicator', 'lnmark_red')
      }
    board.layout[x1][y1].dom.appendChild(linemarker)
    coordinatesArray.push(board.layout[x1][y1]);*/
    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }

        var linemarker = document.createElement('div')
        var pctmarker = document.createElement('div')
        pctmarker.classList.add('pctmarker', 'indicator')

        if(!board.layout[x1][y1].occupied){
            linemarker.classList.add('indicator', 'lnmark_green')
        }else{

            if(board.layout[x1][y1].occupant.stats.height >= 3){
                pctmarker.innerText = '100%'
                board.layout[x1][y1].dom.appendChild(pctmarker)
                break;
            }

            linemarker.classList.add('indicator', 'lnmark_red')
        }

        //board.layout[x1][y1].dom.appendChild(linemarker)
        coordinatesArray.push(board.layout[x1][y1]);

    }

    // Return the result
    return coordinatesArray;
}

/**
 * Tweens between two points
 * @param {object} elem 
 * @param {int} x 
 * @param {int} y 
 */
function translate(elem, x, y) {
    //elem.style.transition = "left, top 2s ease-in";

    var left = parseInt( css( elem, 'left' ), 10 ),
        top = parseInt( css( elem, 'top' ), 10 ),
        dx = left - x,
        dy = top - y
        i = 1,
        count = 20,
        delay = 20;

    function loop() {
        if ( i >= count ) { document.getElementById("gamearea").removeChild(elem); return; }
        i += 1;
        elem.style.left = ( left - ( dx * i / count ) ).toFixed( 0 ) + 'px';
        elem.style.top = ( top - ( dy * i / count ) ).toFixed( 0 ) + 'px';
        setTimeout( loop, delay );
    }

    loop();
}

function css(element, property) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}