let currentColor = '#ffffff'; // Default color to white
let currentShape = '';
let drawingStates = [];

function setup() {
    let cnv = createCanvas(windowWidth - 60, windowHeight - 150);
    smooth(); // Anti-aliasing to smooth out the lines
    resetDrawingArea();
    cnv.style('display', 'block'); // Prevents down-scrolling
    resetDrawingArea();

    textSize(16); // Set the text size
    fill(255); // White text color
    textAlign(CENTER, BOTTOM); // Align text centrally at the bottom
    
    select('#black').mousePressed(() => setCurrentColor('#000000'));
    select('#white').mousePressed(() => setCurrentColor('#ffffff'));
    select('#red').mousePressed(() => setCurrentColor('#ff0000'));
    select('#green').mousePressed(() => setCurrentColor('#00ff00'));
    select('#blue').mousePressed(() => setCurrentColor('#0000ff'));
    
    select('#drawSquare').mousePressed(() => setCurrentShape('square'));
    select('#drawCircle').mousePressed(() => setCurrentShape('circle'));
    select('#undo').mousePressed(undoLast);
}

function draw() {
  if (mouseIsPressed) {
    stroke(currentColor); // Set the stroke color
    strokeWeight(2); // Set the stroke weight for smoother lines
    
      // Draw a semi-transparent rectangle at the bottom of the canvas
      fill(0, 0, 0, 150); // Black with semi-transparency
      noStroke();
      rect(0, height - 40, width, 40);
    
      // Set text properties
      fill(255); // White text color
      textSize(20); // Larger text size
      textAlign(CENTER, CENTER);
      text('Press C or c to clear the canvas', width / 2, height - 20);

    let current = createVector(mouseX, mouseY);
    let previous = createVector(pmouseX, pmouseY);

    for (let i = 0; i < 1; i += 0.001) {
      let inter = p5.Vector.lerp(previous, current, i);
      line(previous.x, previous.y, inter.x, inter.y);
      previous = inter; // Update the previous point so the line continues from the last interpolated point
      
      // Only activate drawing if no shape has been selected
  if (mouseIsPressed && currentShape === '') {
    stroke(currentColor);
    strokeWeight(2);
    line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  }
}

function mousePressed() {
    if (currentShape !== '') {
        drawShape(mouseX, mouseY);
        drawingStates.push(get()); // Save the current drawing state
        if (currentShape === '') {
          drawingStates.push(get());
        }
    }
}

function mouseReleased() {
  // If you're drawing freehand, save the state when the user releases the mouse
  if (currentShape === '') {
    drawingStates.push(get());
  }
}

function drawShape(x, y) {
    fill(currentColor);
    noStroke();
    if (currentShape === 'square') {
        rect(x - 25, y - 25, 50, 50); // Draw square centered at mouse
    } else if (currentShape === 'circle') {
        ellipse(x, y, 50, 50); // Draw circle centered at mouse
    }
    // Implement draw functions for other shapes
}

function setCurrentColor(color) {
    currentColor = color;
    currentShape = ''; // Reset to freehand drawing
}

function setCurrentShape(shape) {
    currentShape = shape;
}

function keyPressed() {
    if (key === 'c' || key === 'C') {
        resetDrawingArea();
    }
}

function resetDrawingArea() {
    background('#111111');
}


function undoLast() {
  if (drawingStates.length > 0) {
    drawingStates.pop(); // Remove the latest drawing state
    if (drawingStates.length > 0) {
      // If there are still states in the stack, display the last one
      image(drawingStates[drawingStates.length - 1], 0, 0);
    } else {
      // If there are no more states, reset to a blank canvas
      resetDrawingArea();
    }
  }
}


