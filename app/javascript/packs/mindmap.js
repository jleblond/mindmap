import {CanvasEdit} from "./mindmap/canvasEdit";
import {CanvasShow} from "./mindmap/canvasShow";
import {CanvasDraw} from "./mindmap/canvasDraw";



$(document).ready(function(){
    const canvas = document.getElementById(`myCanvas`);
    const ctx = canvas.getContext("2d");
    const canvasObj = new CanvasDraw(canvas, ctx);

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



