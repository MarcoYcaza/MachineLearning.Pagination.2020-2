
class Bubble {
    constructor(x, y, r,c,index_Layer,index_Neuron,activationValue) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = c;
        this.index_Layer = index_Layer;
        this.index_Neuron = index_Neuron;
        this.activationValue = activationValue;
    }

    move() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    }

    show() {
        fill(this.color);
        stroke(0);
        ellipse(this.x, this.y, this.r, this.r);
        fill(0);
        noStroke();
        text(this.activationValue, this.x-13, this.y+5);
    }

    glow(newColor) {
		this.color = newColor;
    }
}

//line(prevNeuron[0], prevNeuron[1], nextNeuron[0], nextNeuron[1]);

class WeightLine {
    constructor(x_i, y_i,x_f,y_f,activationColor,weigthValue) {

        this.x_i = x_i;
        this.y_i = y_i;
        this.x_f = x_f;
        this.y_f = y_f;

        this.colorW = activationColor;
        this.weigthValue = weigthValue;
    }

    move() {

        this.x_i = this.x_i + random(-1, 1);
        this.y_f = this.y_f + random(-1, 1);
    }

    show() {
        stroke(this.colorW);
        strokeWeight(random(1, 5));
        line(this.x_i,this.y_i,this.x_f, this.y_f);
        
     //   text(this.activationValue, this.x-13, this.y+5);
    }

    glow(newColor) {
		this.colorW = newColor;
    }
}
