function main() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Vector 3 Instatiatied
    var v1 = new Vector3([0, 0, 0]);
    var v2 = new Vector3([0, 0, 0]);

    // Draw a black rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    // Red vector
    drawVector(v1, "red");
}

function drawVector(v, color) {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Canvas center
    var center = [canvas.width / 2, canvas.height / 2];

    // Draw vector
    ctx.beginPath();

    // Start from center
    ctx.moveTo(center[0], center[1]);
    
    // Y-axis is inverted
    ctx.lineTo(center[0] + (v.elements[0] * 20), center[1] - (v.elements[1] * 20));  // used ChatGPT to learn lineTo()

    // Line style
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function handleDrawEvent() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Input vars
    var xa = parseFloat(document.getElementById('x1').value) || 0;  // used ChatGPT to learn parseFloat()
    var ya = parseFloat(document.getElementById('y1').value) || 0;
    var xb = parseFloat(document.getElementById('x2').value) || 0;
    var yb = parseFloat(document.getElementById('y2').value) || 0;
    var scl = parseFloat(document.getElementById('sclr').value) || 1;
    var oper = document.getElementById('op').value;

    // Input check 
    if (isNaN(xa) || isNaN(ya) || isNaN(xb) || isNaN(yb) || isNaN(scl)) {  // used ChatGPT to learn isNaN()
        console.log('Invalid input values. Please enter numbers.');
        return false;
    }

    // Red vector
    var v1 = new Vector3([xa, ya, 0]);
    drawVector(v1, "red");

    // Blue vector
    var v2 = new Vector3([xb, yb, 0]);
    drawVector(v2, "blue");

    // Op vectors
    var v3 = new Vector3([0, 0, 0]);
    var v4 = new Vector3([0, 0, 0]);

    if (oper === 'add') {
        v3 = v1.add(v2);
    } else if (oper === 'sub') {
        v3 = v1.sub(v2);
    } else if (oper === 'mul') {
        v3 = v1.mul(scl); 
        v4 = v2.mul(scl);
    } else if (oper === 'div') {
        if (scl === 0) {
            console.log('Divide by zero error.');
            return false;
        }
        v3 = v1.div(scl);
        v4 = v2.div(scl);
    } else if (oper === 'mag') {
        console.log('Magnitude v1: ', v1.magnitude());
        console.log('Magnitude v2: ', v2.magnitude());
    } else if (oper === 'norm') {
        v3 = v1.normalize();
        v4 = v2.normalize();
    } else if (oper === 'angbtw') {
        var dp = Vector3.dot(v1, v2);
        var mag1 = v1.magnitude();
        var mag2 = v2.magnitude();

        if (mag1 > 0 && mag2 > 0) {
            var cos = dp / (mag1 * mag2);
            var rad =  Math.acos(cos);  // angle in radians
            console.log('Angle: ', (rad * 180) / Math.PI); //angle in degrees
        }
    } else if (oper === 'area') {
        var crp = Vector3.cross(v1, v2);
        var mag = crp.magnitude();
        console.log('Area of the triangle: ', 0.5 * mag);
    } else {
        console.log('Unknown operation.');
        return false;
    }

    drawVector(v3, "green");
    drawVector(v4, "green");
}