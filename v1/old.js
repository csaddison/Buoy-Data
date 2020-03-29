//
// 1/6/2020
//
// Buoy GIS Renderer
//
/////////////////////////////////////////////////////////////////////////////////////////////


// Load buoy list JSON
let buoyJSON = "buoys.json";
let buoys;

function loadJSON (path) {
    let json;
    $.ajax({
        'async': false,
        'global': false,
        'url': path,
        'dataType': "json",
        'success': data => json = data
    });
    return json;
}

buoys = loadJSON(buoyJSON);




/////////////////////////////////////////////////////////////////////////////////////////////


// Load JSON data for selected buoy
let station = 'santa_barbara'
let data = loadJSON(`${station}.json`);
let waves = {
    height : data.WVH[0],
    direction : parseFloat(data.DIR[0]),
    period : parseFloat(data.PER[0])
}




/////////////////////////////////////////////////////////////////////////////////////////////


// Swell class
class Swell {

    constructor(height, direction, period) {
        this.height = 8;
        this.direction = direction;
        this.period = period;
    }
    
    // Matrix rotation of 2-dimensional vectors in degrees
    rotateVector(vx, vy, angle) {
        let theta = angle * Math.PI / 180;
        let newVec = {
            x : Math.cos(theta) * vx - Math.sin(theta) * vy,
            y : Math.sin(theta) * vx + Math.cos(theta) * vy
        }
        return newVec;
    }

    // Sets origin to center
    setCanvasCenter(width, height) {
        this.center = {
            w : width / 2,
            h : height / 2
        }
    }

    // Shapes and colors swell bars
    shapeBars() {
        let fillWidth = 2.8 * Math.max(this.center.w, this.center.h);
        let size = ((this.period/20) ** 2) * 30;
        let shape = {

            p1 : this.rotateVector(
                -(fillWidth / 2),
                -(size / 2),
                this.direction
            ),

            p2 : this.rotateVector(
                (fillWidth / 2),
                -(size / 2),
                this.direction
            ),

            p3 : this.rotateVector(
                (fillWidth / 2),
                (size / 2),
                this.direction
            ),

            p4 : this.rotateVector(
                -(fillWidth / 2),
                (size / 2),
                this.direction
            )

        }

        let c = [
            (this.height / 12) * 255,
            255 * (12 - this.height) / 12,
            0
        ]
        return [shape, c];
    }

    // Draws swell forecast
    drawSwell() {
        let shape = this.shapeBars()[0];
        let c = this.shapeBars()[1];
        noStroke();
        fill(c);

        quad(

            shape.p1.x + this.center.w,
            shape.p1.y + this.center.h,
            shape.p2.x + this.center.w,
            shape.p2.y + this.center.h,
            shape.p3.x + this.center.w,
            shape.p3.y + this.center.h,
            shape.p4.x + this.center.w,
            shape.p4.y + this.center.h

        )

    }

}




/////////////////////////////////////////////////////////////////////////////////////////////


// Render a p5.js canvas
let wave;
let w = 500;
    h = 500;

function setup() {
    createCanvas(w, h);
    wave = new Swell(waves.height, waves.direction, waves.period);
    wave.setCanvasCenter(w, h);
}

function draw() {
    background(0);

    wave.drawSwell();

    circle(mouseX, mouseY, 20);
}
