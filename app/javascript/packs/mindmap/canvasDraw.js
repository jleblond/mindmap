import {Canvas} from "./canvas";
import {postRequest, putRequest} from "./api";


export class CanvasDraw extends Canvas {
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.isDrawing = false;
        this.selectedDataIndex = undefined;
        this.selectedBubble = undefined;
        this.data = {}

        this.loadData(ctx);
    }

    createIdea(x, y){
        let url = this.canvas.getAttribute('data-idea-url')
        let data = { idea:
                { label: 'New Label',
                    description: "",
                    url: "",
                    shape_type: 'CIRCLE',
                    x_pos: x,
                    y_pos: y,
                    diameter: 60 }
        }
        postRequest(url, data)
        this.loadData(this.ctx);
    }

    updateSelectedIdea(x, y){
        let selectedIdea = this.data[this.selectedDataIndex]
        let url = `/diagrams/${this.canvas.getAttribute('data-diagram-id')}/canvas/ideas/${selectedIdea.id}/update_position`
        let data = { idea: { x_pos: x, y_pos: y } }

        putRequest(url, data)

        this.loadData(this.ctx);
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
                this.isDrawing = true;
                return;
            }
        }
        if(!this.isDrawing){
            this.createIdea(x, y);
        }
    }

    mouseMoveEvent = (event) => {
        if( this.isDrawing && this.selectedDataIndex) {
            let x = event.pageX - this.elemLeft,
                y = event.pageY - this.elemTop;

            this.selectedBubble = this.bubbles[this.selectedDataIndex]
            this.selectedBubble.updatePosition(x,y)
        }
    }

    mouseUpEvent = (event) => {
        this.canvas.style.cursor = 'auto';
        if( this.isDrawing && this.selectedDataIndex) {
            let x = event.pageX - this.elemLeft,
                y = event.pageY - this.elemTop;
            this.updateSelectedIdea( x, y)

            this.isDrawing = false;
            this.selectedDataIndex = undefined;
        }
    }


}
