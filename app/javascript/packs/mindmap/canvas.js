import {getRequest} from '../mindmap/api'
import {BubbleIdea} from '../mindmap/idea'

export var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

export var background = new Image();
background.src = canvas.getAttribute('data-background-src')

background.onload = function() {
    ctx.drawImage(background, 0, 0);
    drawAll();
}

export var elemLeft = canvas.offsetLeft + canvas.clientLeft;
export var elemTop = canvas.offsetTop + canvas.clientTop;

export var ideas = {}
export var bubbles = []

$(document).ready(function(){
    loadData();
})


export const loadData = () => {
    let url = canvas.getAttribute('data-idea-url')
    getRequest(url)
        .then((data) => {
            bubbles = []
            ideas = data

            for (let i = 0; i < data.length; i++) {
                let bubble = data[i];

                let x = bubble['x_pos'];
                let y = bubble['y_pos'];

                let diameter = bubble['diameter'];
                let label = bubble['label'];

                bubbles.push(new BubbleIdea(x, y, diameter, label));
            }
            drawAll();
        })


}

export const drawAll = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0);
    bubbles.forEach(function(bubble) {
        bubble.draw(ctx)
    });
}

