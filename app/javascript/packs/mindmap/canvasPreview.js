import {Canvas} from "./canvas";

export class CanvasPreview extends Canvas {
    constructor(canvas, ctx, canvas_width, canvas_height){
        super(canvas, ctx, canvas_width, canvas_height);
        this.overIdeaIndex = undefined;
        this.loadData(ctx);
    }

    displayIdeasDefault = (ctx) => {
        this.redrawBackground(ctx)
        this.bubbles.forEach(function(bubble) {
            bubble.display(ctx)
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
    }

    mouseUpEvent = (event) => {
    }

}


