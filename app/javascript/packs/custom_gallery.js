var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

var background = new Image();
background.src = canvas.getAttribute('data-background-src')

background.onload = function() {
    ctx.drawImage(background, 0, 0);
    drawAll();
}

var elemLeft = canvas.offsetLeft + canvas.clientLeft;
var elemTop = canvas.offsetTop + canvas.clientTop;

let ideas = {}
let bubbles = {}


let overIdeaIndex = undefined;

$(document).ready(function(){
    loadData();
})


canvas.addEventListener('mousedown', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    // Collision detection between clicked offset and element.
    bubbles.forEach(function(element, index) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            console.log('in element!')
            overIdeaIndex = index

            let idea = ideas[index]
            if(idea.url){
                var redirectWindow = window.open(`${idea.url}`, '_blank');
                redirectWindow.location;
            }

            return;
        }
    });



}, false);

canvas.addEventListener('mousemove', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    let isOverElement = false;

    // Collision detection between clicked offset and element.
    bubbles.forEach(function(element, index) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            overIdeaIndex = index
            return;
        }
    });

    let idea = ideas[overIdeaIndex]
    if(idea?.url){
        console.log("hey")
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }



}, false);


function loadData() {
    $.ajax({
        type: "GET",
        url: canvas.getAttribute('data-idea-url'),
        dataType: "json",
        success: function(data){
            bubbles = []
            console.log(data)
            ideas = data

            for (let i = 0; i < data.length; i++) {
                // Get each object in the array
                let bubble = data[i];
                // Get x,y from position
                let x = bubble['x_pos'];
                let y = bubble['y_pos'];

                // Get diameter and label
                let diameter = bubble['diameter'];
                let label = bubble['label'];

                // Put object in array
                bubbles.push(new BubbleIdea(x, y, diameter, label));
            }

            drawAll();
        }
    });

}

function drawAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0);
    bubbles.forEach(function(bubble) {
        bubble.draw()
    });

}


class BubbleIdea{
    constructor(x, y, diameter, name) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.radius = diameter / 2;
        this.name = name;

        this.left = (x - this.radius/2);
        this.top = (y - this.radius/2);
        this.width = this.radius;
        this.height = this.radius;
    }



    // Display the Bubble
    draw() {
        // context.fillStyle = element.colour;
        // doc: ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
        // ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI*2);


        ctx.fillStyle = '#05EFFF';
        ctx.fillRect(this.left, this.top, this.radius, this.radius);
        ctx.fillStyle = '#0a0000';
        ctx.fillText(this.name, this.left, this.top+10);
    }
}