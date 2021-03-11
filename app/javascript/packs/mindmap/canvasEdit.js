import {Canvas} from "./canvas";
import {getRequest} from "./api";


export class CanvasEdit extends Canvas {
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.selectedDataIndex = undefined;
        this.selectedBubble = undefined;
        this.data = {}

        this.loadData(ctx);
    }

    // handleEvent(e) {
    //     console.log(e)
    //     switch(e.type) {
    //         case "mousedown":
    //             this.mouseDownEvent(e);
    //             break;
    //         case "mousemove":
    //             this.mouseMoveEvent(e);
    //             break;
    //         case "mouseup":
    //             this.mouseUpEvent(e);
    //             break;
    //     }
    // }


    mouseDownEvent = (event) => {
        let x = event.pageX - this.elemLeft,
            y = event.pageY - this.elemTop;

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                console.log('in element!')
                this.selectedDataIndex = index

                let idea = this.data[index]
                let url = `/diagrams/${this.canvas.getAttribute('data-diagram-id')}/canvas/ideas/${idea.id}/edit?format=js`
                getRequest(url)
                return;
            }
        }

    }




}
