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

        // Collision detection between clicked offset and element.
        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                console.log('in element!')
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

        for(let index=0;index<this.bubbles.length;index++){
            const element = this.bubbles[index]
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                this.overIdeaIndex = index
                return;
            }
        }

        let idea = this.data[this.overIdeaIndex]
        if(idea?.url){
            console.log("hey")
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "default";
        }
    }

}


