var canvas_w = 500
var canvas_h = 500

var qtyLayers = 6;
var neurons_by_layers = [9, 6, 7, 4, 5, 3]
var Position = []
var Positions = []
var layerSpacingY = 0

function setup() {
    createCanvas(canvas_w, canvas_h);

    var layerSpacingX = floor(canvas_w / qtyLayers);

    layerSpacingY = floor(canvas_h / (max(neurons_by_layers) + 1));

    for (i = 0; i < qtyLayers; i++) {

        var layerCentroid = (canvas_h - (layerSpacingY * neurons_by_layers[i])) / 2 - layerSpacingY / 2;

        for (j = 0; j < neurons_by_layers[i]; j++) {
            Position.push([(i + 0.5) * layerSpacingX, (j + 1) * layerSpacingY + layerCentroid])
        }

        Positions.push(Position)
        Position = []
    }

    //console.log(Positions)  
}


function draw() {

    background(220);

    var neuron_radius = layerSpacingY / 3;


    for (i=0 ; i < Positions.length-1; i++ ) {

            prevLayer = Positions[i] 
            nextLayer = Positions[i+1] 

            for( var prevNeuron of prevLayer){
                for( var nextNeuron of nextLayer){
                    line(prevNeuron[0], prevNeuron[1],nextNeuron[0], nextNeuron[1]);
                }
            }

    }

    for (var layerPositions of Positions) {

        for (var neuronPosition of layerPositions) {
            //console.log(neuronPosition[0])
            //console.log(neuronPosition[1])
            ellipse(neuronPosition[0], neuronPosition[1], neuron_radius)
        }


    }

    strokeWeight(2) 
    
}