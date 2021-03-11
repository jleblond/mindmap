import {Canvas} from "./canvas";
import {getRequest, postRequest, putRequest} from "./api";
import {BubbleIdea} from "./idea";


export class CanvasDraw extends Canvas {
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.isDrawing = false;
        this.selectedBubbleID = undefined;
        this.data = {}

        this.loadData(ctx);
    }

    createIdea(x, y){
        let diameter = 60
        let label = 'New label'

        // TODO: promises or callbacks
        this.bubbles.push(new BubbleIdea(x, y, diameter, label))
        this.drawAll(this.ctx)

        let url = this.canvas.getAttribute('data-idea-url')
        let data = { idea:
                { label: label,
                    description: "",
                    url: "",
                    shape_type: 'CIRCLE',
                    x_pos: x,
                    y_pos: y,
                    diameter: diameter }
        }
        postRequest(url, data)
        this.loadData(this.ctx);
    }

    updateSelectedIdea(x, y){
        let url = `/diagrams/${this.canvas.getAttribute('data-diagram-id')}/canvas/ideas/${this.selectedBubbleID}/update_position`
        let data = { idea: { x_pos: x, y_pos: y } }

        putRequest(url, data)
    }

    mouseDownEvent = (event) => {
        let x = event.pageX - this.elemLeft,
            y = event.pageY - this.elemTop;

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                this.selectedBubbleID = element.id
                this.isDrawing = true;

                let url = `/diagrams/${this.canvas.getAttribute('data-diagram-id')}/canvas/ideas/${this.selectedBubbleID}/edit?format=js`
                getRequest(url)

                return;
            }
        }
        if(!this.isDrawing){
            this.createIdea(x, y);
        }
    }

    mouseMoveEvent = (event) => {
        if( this.isDrawing) {
            let x = event.pageX - this.elemLeft,
                y = event.pageY - this.elemTop;

            const ctx = this.ctx
            this.redrawBackground(ctx)

            let copy = new Object()

            for(let i=0;i<this.bubbles.length;i++){
                if(this.bubbles[i].id == this.selectedBubbleID){
                    copy = this.bubbles[i]
                    this.bubbles.splice(i, 1);
                }
                this.bubbles = this.bubbles
            }

            this.bubbles.push(new BubbleIdea(this.selectedBubbleID, x, y, copy.diameter, copy.name))
            this.bubbles.forEach(function(bubble) {
                bubble.draw(ctx)
            });
        }
    }

    mouseUpEvent = (event) => {
        this.canvas.style.cursor = 'auto';
        if( this.isDrawing) {
            let x = event.pageX - this.elemLeft,
                y = event.pageY - this.elemTop;

            this.updateSelectedIdea( x, y)

            this.isDrawing = false;
            this.selectedBubbleID = undefined;
        }
    }


}
