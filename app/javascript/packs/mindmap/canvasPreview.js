import {Canvas} from "./canvas";
import {pointIsInEllipse} from "./utils";

export class CanvasPreview extends Canvas {
    constructor(canvas, ctx, canvas_width, canvas_height){
        super(canvas, ctx, canvas_width, canvas_height);
        this.overIdeaIndex = undefined;
        this.loadData(ctx);
    }

    displayBubbles = (ctx) => {
        this.redrawBackground(ctx)
        this.bubbles.forEach(function(bubble) {
            bubble.drawLabel(ctx)
        });
    }

    mouseDownEvent = (event) => {
        let x = event.pageX - this.elemLeft,
            y = event.pageY - this.elemTop;

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                this.overIdeaIndex = index

                let idea = this.data[index]
                if(idea.url){
                    let redirectWindow = window.open(`${idea.url}`, '_blank');
                    redirectWindow.location;
                }
                return;
            }
        }
    }

    mouseMoveEvent = (event) => {
        let x = event.pageX - this.elemLeft,
            y = event.pageY - this.elemTop;

        this.canvas.style.cursor = "default";
        this.overIdeaIndex = undefined

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (pointIsInEllipse(x,y, element.x, element.y, element.rx, element.ry)) {
                this.overIdeaIndex = index
                let idea = this.data[this.overIdeaIndex]
                if(idea?.url){
                    this.canvas.style.cursor = "pointer";
                }
                return;
            }
        }
    }

    mouseUpEvent = (event) => {

    }
}


