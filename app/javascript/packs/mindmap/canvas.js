import {getRequest} from '../mindmap/api'
import {BubbleIdea} from '../mindmap/idea'


export class Canvas{
    constructor(canvas, ctx, canvas_width, canvas_height){
        this.bubbles = []
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas.width = canvas_width;
        this.canvas.height = canvas_height;
        this.data = []

        this.background = new Image();
        this.background.src = this.canvas.getAttribute('data-background-src')

        this.background.onerror = () => {
            alert('ERROR: Could not load image at: ' + this.background.src);
        }

        this.background.onload = () => {
            this.ctx.drawImage(this.background, 0, 0)
            this.displayBubbles(ctx)
        }

        this.elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft
        this.elemTop = this.canvas.offsetTop + this.canvas.clientTop
    }


    loadData = (ctx) => {
        let url = this.canvas.getAttribute('data-idea-url')
        getRequest(url)
            .then((data) => {
                this.data = data
                this.bubbles = []

                for (let i = 0; i < data.length; i++) {
                    let bubble = data[i];
                    let id = bubble['id'];
                    let x = bubble['x_pos'];
                    let y = bubble['y_pos'];
                    let width = bubble['width'];
                    let height = bubble['height'];

                    let label = bubble['label'];
                    let background_color = bubble['background_color'];
                    let text_color = bubble['text_color'];

                    this.bubbles.push(new BubbleIdea(id, x, y, width, height, label, background_color, text_color));
                }
                this.displayBubbles(ctx);
            })
    }

    redrawBackground = (ctx) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(this.background, 0, 0);
    }

    displayBubbles = (ctx) => {
        this.redrawBackground(ctx)
    }
}


