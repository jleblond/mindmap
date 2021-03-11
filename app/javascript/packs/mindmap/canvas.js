import {getRequest} from '../mindmap/api'
import {BubbleIdea} from '../mindmap/idea'
import {DIAMETER} from "./constants";


export class Canvas{
    constructor(canvas, ctx){
        this.bubbles = []
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.data = []

        this.background = new Image();
        this.background.src = this.canvas.getAttribute('data-background-src')

        this.background.onload = () => {
            this.ctx.drawImage(this.background, 0, 0)
            this.drawAll(this.ctx);
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

                    // let diameter = bubble['diameter'];
                    let label = bubble['label'];
                    let color = bubble['color']

                    this.bubbles.push(new BubbleIdea(id, x, y, DIAMETER, label, color));
                }
                this.drawAll(ctx);
            })
    }

    redrawBackground = (ctx) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(this.background, 0, 0);
    }

    drawAll = (ctx) => {
        this.redrawBackground(ctx)
        this.bubbles.forEach(function(bubble) {
            bubble.draw(ctx)
        });
    }
}


