var canvas_w = 800
var canvas_h = 600

var qtyLayers = 6;
var neurons_by_layers;
var Position = []
var Positions = []
var layerSpacingY = 0
var state = 1;

var input, button;
var myoutput;
var inputs_XY = [];

var neurons = [];


function setup() {
    createCanvas(canvas_w, canvas_h);
    /////////////////////////////////
    inputLayers = createSlider(3, 7, 6, 1).position(canvas_w - 200, 20).size(120);
    createDiv('layers').position(canvas_w - 300, 20).size(60);

    createDiv('neurons').position(canvas_w - 300, 40).size(60);

    bin1 = createInput("9").position(canvas_w - 220 + 25, 40).size(15);
    bin2 = createInput("6").position(canvas_w - 220 + 50, 40).size(15);
    bin3 = createInput("7").position(canvas_w - 220 + 75, 40).size(15);
    bin4 = createInput("4").position(canvas_w - 220 + 100, 40).size(15);
    bin5 = createInput("5").position(canvas_w - 220 + 125, 40).size(15);
    bin6 = createInput("3").position(canvas_w - 220 + 150, 40).size(15);
    bin7 = createInput("0").position(canvas_w - 220 + 175, 40).size(15);

    playButton = createButton("Hide").position(canvas_w - 240 + 175, 550).size(50);

    inputs_XY = [bin1, bin2, bin3, bin4, bin5, bin6, bin7];

    neurons_by_layers = [parseInt(bin1.value()), parseInt(bin2.value()), parseInt(bin3.value()), parseInt(bin4.value()), parseInt(bin5.value()), parseInt(bin6.value()), parseInt(bin7.value())]

    
}
function stateSW() {
    if (state == 0) {
        state = 1;
    } else {
        state = 0;
    }

}

function draw() {

    background(220);


    qtyLayers = inputLayers.value();

    playButton.mousePressed(stateSW);

    //console.log(inputs_XY[0].value())
    //neurons_by_layers =[9,6,7,4,5,3,0]
    neurons_by_layers = [parseInt(bin1.value()), parseInt(bin2.value()), parseInt(bin3.value()), parseInt(bin4.value()), parseInt(bin5.value()), parseInt(bin6.value()), parseInt(bin7.value())]

    //////////////////////////////////////////////////////////////////

    var layerSpacingX = floor(canvas_w / qtyLayers);
    layerSpacingY = floor(canvas_h / (max(neurons_by_layers) + 1));
    var neuron_radius = layerSpacingY / 3;

    for (i = 0; i < qtyLayers; i++) {

        var layerCentroid = (canvas_h - (layerSpacingY * neurons_by_layers[i])) / 2 - layerSpacingY / 2;

        for (j = 0; j < neurons_by_layers[i]; j++) {
            Position.push([(i + 0.5) * layerSpacingX, (j + 1) * layerSpacingY + layerCentroid,i,j])
        }

        Positions.push(Position)
        Position = []
    }
    //////////////////////////////////////////////////////////////////

    if (state) {
        for (i = 0; i < Positions.length - 1; i++) {

            prevLayer = Positions[i]
            nextLayer = Positions[i + 1]

            for (var prevNeuron of prevLayer) {
                for (var nextNeuron of nextLayer) {
                    line(prevNeuron[0], prevNeuron[1], nextNeuron[0], nextNeuron[1]);
                }
            }

        }

        for (var layerPositions of Positions) {

            for (var neuronPosition of layerPositions) {
                let x = neuronPosition[0]
                let y = neuronPosition[1]
                let index_Layer = neuronPosition[2]
                let index_Neuron = neuronPosition[3]


                let c1 = color(147, 204, 0);
              
                //fill(c);
                bub = new Bubble(x, y, neuron_radius,c1,index_Layer,index_Neuron);

                neurons.push(bub);

                //console.log(index_Layer);
                //console.log(index_Neuron);

                //bub.glow(c1);
                //bub.move();
                //bub.show();

            }


        }
    }
    //////////////////////////////////////////////////
    
    strokeWeight(2)

    Positions = [];
    
    
    for (let i = 0; i < neurons.length; i++) {
        
        rand1 =Math.floor((Math.random() * 4) + 0);
        rand2 =Math.floor((Math.random() * 4) + 0);

        if (neurons[i].index_Layer==rand1){
            if (neurons[i].index_Neuron==rand2){

                let c2 = color(255,0,0);
                console.log("sad");
                neurons[i].glow(c2);
                neurons[i].move();
            }
        }
        neurons[i].show();
    }

    neurons = []; 

    fill(0);

    var parameters = 0;

    for (k=0;k<qtyLayers-1;k++){
        var parameters = parameters + neurons_by_layers[k]*neurons_by_layers[k+1];
    }
   var sum = 0;

    for(p=1;p<qtyLayers-1;p++){
        sum = sum + neurons_by_layers[p];
    }

    parameters = parameters + sum ;
    
    text("Parámetros: "+parseInt(parameters), 300, canvas_h - 40);
}

class Bubble {
    constructor(x, y, r,c,index_Layer,index_Neuron) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = c;
        this.index_Layer = index_Layer;
        this.index_Neuron = index_Neuron;
    }

    move() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    }

    show() {
		fill(this.color);
        ellipse(this.x, this.y, this.r, this.r);
    }

    glow(newColor) {
		this.color = newColor;
    }
}


