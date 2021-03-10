import {canvas, bubbles, ideas, elemLeft, elemTop} from "./canvas";


let overIdeaIndex = undefined;

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
                let redirectWindow = window.open(`${idea.url}`, '_blank');
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