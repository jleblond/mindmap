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

        this.rx = this.width/22;
        this.ry = this.height/8;
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }

    redraw(ctx){
        this.erase(ctx)
        this.drawLabel(ctx)
    }

    erase(ctx){
        ctx.clearRect(this.left, this.top, this.width/2, this.height/2);
    }

    // Display the simple small bubble
    // display(ctx) {
    //     ctx.beginPath();
    //     ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI*2);
    //     ctx.stroke()
    // }

    display(ctx) {
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        let stretchX = this.rx;
        let stretchY = this.ry;
        for (let angle = startAngle; angle < endAngle; angle += Math.PI / 180) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + Math.cos(angle) * stretchX, this.y + Math.sin(angle) * stretchY)
            ctx.lineWidth = 5
            ctx.strokeStyle = this.background_color
            ctx.stroke()
            ctx.closePath()
        }
    }



    // Display the Idea
    drawLabel(ctx) {
        ctx.font = "16px Georgia";
        ctx.fillStyle = this.text_color;
        ctx.fillText(this.name, this.left + this.width/8, this.top + this.height/4);
    }
}