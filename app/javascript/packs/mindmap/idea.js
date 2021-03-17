export class BubbleIdea{
    constructor(id, x, y, width, height, name, background_color, text_color) {
        this.id = id
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.background_color = background_color;
        this.text_color = text_color;

        this.left = (x - this.width/4);
        this.top = (y - this.height/4);
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    redraw(ctx){
        this.erase(ctx)
        this.draw(ctx)
    }

    erase(ctx){
        ctx.clearRect(this.left, this.top, this.width/2, this.height/2);
    }



    // Display the Bubble
    draw(ctx) {
        // context.fillStyle = element.colour;
        // doc: ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
        // ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI*2);

        this.erase(ctx)
        ctx.fillStyle = this.background_color;
        ctx.fillRect(this.left, this.top, this.width/2, this.height/2);


        ctx.font = "16px Georgia";
        ctx.fillStyle = this.text_color;
        ctx.fillText(this.name, this.left + this.width/8, this.top + this.height/4);
    }
}