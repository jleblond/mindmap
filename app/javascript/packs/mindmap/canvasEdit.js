import {canvas, bubbles, ideas, elemLeft, elemTop, loadData} from "./canvas";
import {postRequest, getRequest, putRequest} from "./api";

let isDrawing = false;
let selectedIdeaIndex = undefined;
let selectedBubble = undefined;

canvas.addEventListener('mousedown', function(event) {
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    // Collision detection between clicked offset and element.
    bubbles.forEach(function(element, index) {
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
            console.log('in element!')
            selectedIdeaIndex = index
            isDrawing = true;

            let idea = ideas[index]
            let url = `/diagrams/${canvas.getAttribute('data-diagram-id')}/canvas/ideas/${idea.id}/edit?format=js`

            getRequest(url)
            canvas.style.cursor = "grab";
            return;
        }
    });

    if(!isDrawing){
        createIdea(x, y);
    }

}, false);

canvas.addEventListener('mousemove', function(event) {
    if( isDrawing && selectedIdeaIndex) {
        let x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        selectedBubble = bubbles[selectedIdeaIndex]
        selectedBubble.updatePosition(x,y)
    }
}, false);

canvas.addEventListener('mouseup', function(event) {
    if( isDrawing && selectedIdeaIndex) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        updateSelectedIdea( x, y)

        isDrawing = false;
        selectedIdeaIndex = undefined;
    }
}, false);


function createIdea(x, y){
    let url = canvas.getAttribute('data-idea-url')
    let data = { idea:
                    { label: 'New Label',
                        description: "",
                        url: "",
                        shape_type: 'CIRCLE',
                        x_pos: x,
                        y_pos: y,
                        diameter: 60 }
    }
    postRequest(url, data)
}

function updateSelectedIdea(x, y){
    let selectedIdea = ideas[selectedIdeaIndex]

    let url = `/diagrams/${canvas.getAttribute('data-diagram-id')}/canvas/ideas/${selectedIdea.id}/update_position`
    let data = { idea: { x_pos: x, y_pos: y } }

    putRequest(url, data)

    loadData();
}


canvas.addEventListener('mouseup', function(event) {
    canvas.style.cursor = 'auto';
}, false);