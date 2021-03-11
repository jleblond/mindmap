export class BubbleIdea{
    constructor(id, x, y, diameter, name, color) {
        this.id = id
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.radius = diameter / 2;
        this.name = name;
        this.color = color;

        this.left = (x - this.radius/2);
        this.top = (y - this.radius/2);
        this.width = this.radius;
        this.height = this.radius;
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
        ctx.clearRect(this.left, this.top, this.width, this.height);
    }



    // Display the Bubble
    draw(ctx) {
        // context.fillStyle = element.colour;
        // doc: ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
        // ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI*2);

        this.erase(ctx)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.radius, this.radius);
        ctx.fillStyle = '#0a0000';
        ctx.fillText(this.name, this.left, this.top+10);
    }
}