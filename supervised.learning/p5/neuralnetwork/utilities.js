function update_neurons_by_layers() {
    neurons_by_layers_qty = [parseInt(bin1.value()), parseInt(bin2.value()), parseInt(bin3.value()), parseInt(bin4.value()), parseInt(bin5.value()), parseInt(bin6.value()), parseInt(bin7.value())]
}
function glow_thing(neuron_stuff) {

    let r = Math.floor((Math.random() * 255) + 0);
    let g = Math.floor((Math.random() * 255) + 0);
    let b = Math.floor((Math.random() * 255) + 0);

    this.neuron_stuff = neuron_stuff
    this.neuron_stuff.glow(color(r, g, b))
}

function hide_picture() {
    hide_state = (hide_state == 1) ? (0) : (1)

}
function move_line() {
    move_line_state = (move_line_state == 1) ? (0) : (1)
}
function glow_line() {
    glow_line_state = (glow_line_state == 1) ? (0) : (1)
}
function move_neuron() {
    
    move_neuron_state= (move_neuron_state == 1) ? (0) : (1)
}
function glow_neuron() {
    glow_neuron_state = (glow_neuron_state == 1) ? (0) : (1)
}