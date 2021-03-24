import {CanvasShow} from "./mindmap/canvasShow";
import {CanvasDraw} from "./mindmap/canvasDraw";

import {DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT} from "./mindmap/constants";


$(document).ready(function(){
    const canvas = document.getElementById(`myCanvas`);
    const ctx = canvas.getContext("2d");
    let canvasObj;

    const canvasAction = canvas.getAttribute('data-canvas-action')
    switch(canvasAction){
        case 'DRAW':
            canvasObj = new CanvasDraw(canvas, ctx, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT)
            break;
        default:
            canvasObj = new CanvasShow(canvas, ctx, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT)
            break;
    }


    canvas.addEventListener('mousedown', function(event) {
        canvasObj.mouseDownEvent(event)
    }, false);

    canvas.addEventListener('mousemove', function(event) {
        canvasObj.mouseMoveEvent(event)
    }, false);

    canvas.addEventListener('mouseup', function(event) {
        canvasObj.mouseUpEvent(event)
    }, false);
})



