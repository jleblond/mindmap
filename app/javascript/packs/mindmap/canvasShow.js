import {Canvas} from "./canvas";


export class CanvasShow extends Canvas {
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.overIdeaIndex = undefined;
        this.loadData(ctx);
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

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
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


