import {Canvas} from "./canvas";
import {getRequest, postRequest, putRequest} from "./api";
import {BubbleIdea} from "./idea";
import {DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR, DEFAULT_IDEA_LABEL} from "./constants";


export class CanvasDraw extends Canvas {
    constructor(canvas, ctx, canvas_width, canvas_height){
        super(canvas, ctx, canvas_width, canvas_height);
        this.isDrawing = false;
        this.selectedBubbleID = undefined;
        this.loadData(ctx);
    }

    createIdea(x, y){
        this.bubbles.push(new BubbleIdea(undefined, x, y,
            DEFAULT_WIDTH, DEFAULT_HEIGHT,
            DEFAULT_IDEA_LABEL,
            DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR))
        this.drawAll(this.ctx)

        let create_idea_url = this.canvas.getAttribute('data-idea-url') + '?format=json'
        let data = { idea:
                { label: DEFAULT_IDEA_LABEL,
                    background_color: DEFAULT_BACKGROUND_COLOR,
                    text_color: DEFAULT_TEXT_COLOR,
                    description: "",
                    url: "",
                    shape_type: 'DEFAULT',
                    x_pos: x,
                    y_pos: y,
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT}
        }

        postRequest(create_idea_url, data)
            .then((data) =>{
                for(let index=0;index<this.bubbles.length;index++){
                    const element = this.bubbles[index]
                    if(element.id == undefined){
                        element.id = data.id
                        return element.id
                    }
            }})
            .then((id) => {
                let edit_idea_url = `/diagrams/${this.canvas.getAttribute('data-diagram-id')}/canvas/ideas/${id}/edit?format=js`
                getRequest(edit_idea_url)
            })
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
                this.canvas.style.cursor = "grabbing";

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
        let x = event.pageX - this.elemLeft,
            y = event.pageY - this.elemTop;

        if( this.isDrawing) {
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

            this.bubbles.push(new BubbleIdea(this.selectedBubbleID, x, y,
                copy.width, copy.height, copy.name,
                copy.background_color, copy.text_color))
            this.bubbles.forEach(function(bubble) {
                bubble.draw(ctx)
            });
        } else {
            this.canvas.style.cursor = 'crosshair';
            for(let index=0;index<this.bubbles.length;index++){
                const element = this.bubbles[index]
                if (y > element.top && y < element.top + element.height
                    && x > element.left && x < element.left + element.width) {
                    this.canvas.style.cursor = 'grab';
                    return;
                }
            }
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
