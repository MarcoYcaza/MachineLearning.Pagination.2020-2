var canvas_w = 1200
var canvas_h = 900

var number_of_layers = 6;
var neurons_by_layers_qty;
var neuron_single_position = []
var neuron_positions = []
var neuron_activation_values = []
var neurons_spacing_Y_axis = 0
var hide_state = 1;

var glow_line_state = 0;
var move_line_state = 0;

var glow_neuron_state = 0;
var move_neuron_state = 0;

var neurons_by_layers_qty_inputs = [];
var neurons = [];
var weigth_lines = [];
var index_temp = 0;



function setup() {
    createCanvas(canvas_w, canvas_h);


    //neuron_activation_values  = [0.2,-0.1,0.3,0.9,]

    //User interface controllers
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

    hide_button = createButton("Hide ALL").position(canvas_w - 240 + 175, canvas_h - 50).size(50);
    moveLines_button = createButton("Shake L").position(canvas_w - 320 + 175, canvas_h - 50).size(50);
    glowLines_button = createButton("Glow L").position(canvas_w - 400 + 175, canvas_h - 50).size(50);
    moveNeurons_button = createButton("Shake N").position(canvas_w - 480 + 175, canvas_h - 50).size(50);
    glowNeurons_button = createButton("Glow N").position(canvas_w - 560 + 175, canvas_h - 50).size(50);
    
    neurons_by_layers_qty_inputs = [bin1, bin2, bin3, bin4, bin5, bin6, bin7];

    update_neurons_by_layers();
}

function draw() {

    background(220);

    frameRate(5);


    number_of_layers = inputLayers.value();

    hide_button.mousePressed(hide_picture);

    moveLines_button.mousePressed(move_line);
    glowLines_button.mousePressed(glow_line);
    moveNeurons_button.mousePressed(move_neuron);
    glowNeurons_button.mousePressed(glow_neuron);

    update_neurons_by_layers();

    var layer_spacing_X_axis = floor(canvas_w / number_of_layers);
    neurons_spacing_Y_axis = floor(canvas_h / (max(neurons_by_layers_qty) + 1));
    var neuron_radius = neurons_spacing_Y_axis / 2.5;

    //Fill neuron positions
    //Note that i and j are very important since represent index of the weight and neuron arrays
    for (i = 0; i < number_of_layers; i++) {
        neuron_single_position = [];

        var vertical_layer_offset = (canvas_h - (neurons_spacing_Y_axis * neurons_by_layers_qty[i])) / 2 - neurons_spacing_Y_axis / 2;

        for (j = 0; j < neurons_by_layers_qty[i]; j++) {
            
            let temp = [(i + 0.5) * layer_spacing_X_axis, (j + 1) * neurons_spacing_Y_axis + vertical_layer_offset, i, j];

            neuron_single_position.push(temp);
        }

        neuron_positions.push(neuron_single_position);
        

    }

    console.log(neuron_positions)
    if (hide_state) {

        //Create Lines

        for (i = 0; i < neuron_positions.length - 1; i++) {

            prevLayer = neuron_positions[i]
            nextLayer = neuron_positions[i + 1]

            for (var prevNeuron of prevLayer) {
                for (var nextNeuron of nextLayer) {
                    weigth_lines.push(new WeightLine(prevNeuron[0], prevNeuron[1], nextNeuron[0], nextNeuron[1], 2));
                }
            }

        }
        //Create Neurons


        for (var neuron_position of neuron_positions) {

            for (neuron_single_position of neuron_position) {

                

                var x = neuron_single_position[0]     // HAY UN ERROR ACA
                var y = neuron_single_position[1]

                let index_Layer = neuron_single_position[2]
                let index_Neuron = neuron_single_position[3]
                

                let r = ((Math.random() * 2) + -1).toFixed(1);

                activationValue = r

                if (activationValue < 0) {
                    activationString = activationValue.toString()
                } else {
                    activationString = "+" + activationValue.toString()
                }

                console.log(index_temp);

                neurons.push(new NeuronBubble(x, y, neuron_radius, index_Layer, index_Neuron, activationString));
                index_temp = index_temp+1;

                
            }

            

        }

       // console.log(neurons)
    }

    strokeWeight(3)

    neuron_positions = [];

    for (weigth_line of weigth_lines) {

        if (glow_line_state){
            glow_thing(weigth_line);
        }
        if (move_line_state){
            weigth_line.move();
        }        
        weigth_line.show();

    }


    for (neuron of neurons) {

        if (glow_neuron_state){
            glow_thing(neuron);
        } 

        if (move_neuron_state){
            neuron.move();
        } 
        
        neuron.show();

    }

    neurons = [];
    weigth_lines = [];


    var hyper_parameters = 0;

    for (k = 0; k < number_of_layers - 1; k++) {
        var hyper_parameters = hyper_parameters + neurons_by_layers_qty[k] * neurons_by_layers_qty[k + 1];
    }
    var sum = 0;

    for (p = 1; p < number_of_layers - 1; p++) {
        sum = sum + neurons_by_layers_qty[p];
    }

    hyper_parameters = hyper_parameters + sum;

    //An embeded message

    text("Parámetros: " + parseInt(hyper_parameters), 300, canvas_h - 40);

    index_temp = 0;
}
