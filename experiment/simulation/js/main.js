



// accerlating voltage output 


function updateImageByVoltage() {
    const voltageSlider = document.getElementById('voltageSlider');
    const imageElement = document.getElementById('image');
    
    voltageSlider.addEventListener('input', () => {
        const sliderValue = voltageSlider.value;
        const imageIndex = sliderValue / 5; // Assuming each step represents 5 kV
    
        $("#Brightness").prop("disabled", false);
        const images = [
            '', // Empty string for zero voltage (no image)
            '../images/outputs/se_5kv.png',
            '../images/outputs/se_10kv.png',
            '../images/outputs/se_15kv.png',
            '../images/outputs/se_20kv.png'
        ];
    
        if (imageIndex >= 0 && imageIndex < images.length) {
            imageElement.src = images[imageIndex];
        } else {
          alert("OOps! You did not Set Accelerating Voltage");
            // Handle the case where imageIndex is out of range
            // You can choose to do nothing or display a default image
            // For example: imageElement.src = 'default_image.png';
            // or imageElement.src = '';
        }
        if (sliderValue === "0") {
          alert("Voltage is set to zero.");
        }
  
    });
  }
  
  // Call the function to set up the voltage slider event listener
  
//   updateImageByVoltage();
  
  




// Beam 

// Get the first canvas element with the id "beam" and its 2D rendering context.
var beamCanvas = document.getElementById("beam");
var ctx = beamCanvas.getContext('2d');

// Initialize variables for the first beam's position, width, and timer.
var beamy = 0,
    beamx = parseInt(beamCanvas.width / 2),
    beamWidth, beamTimer = -1;

// Get the second canvas element with the id "beam2" and its 2D rendering context.
var beamCanvas2 = document.getElementById("beam2");
var ctx2 = beamCanvas2.getContext('2d');

// Initialize variables for the second beam's position, width, and timer.
var beam2H = beamCanvas2.height,
    beam2W = beamCanvas2.width,
    beamx2 = parseInt(beamCanvas2.width / 2),
    beamTimer2 = -1;

// Add a click event listener to the HTML element with id "on".
document.getElementById("on").addEventListener("click", function () {
    // Change the background color of the "on" button.
    var onButton = document.getElementById("on");
    onButton.style.backgroundColor = '#45cf24';

    // Clear both beam animations and reset their positions.
    clearInterval(beamTimer);
    clearInterval(beamTimer2);
    beamy = 0;
    ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
    ctx2.clearRect(0, 0, beam2W, beam2H);
    beamTimer = beamTimer2 = -1;

    // Start the animation for the first beam.
    beamTimer = setInterval(drawBeam, 10);

    // Enable the slider input element with id "avslider".
    var avSlider = document.getElementById("avslider");
    avSlider.disabled = false;
});

// Function to draw the first beam.
function drawBeam() {
    // Begin drawing on the first canvas.
    ctx.beginPath();

    // Calculate the width of the beam based on a sine wave.
    beamWidth = Math.sin(beamy * Math.PI / 140) * 7;

    // Set shadow properties for a glowing effect.
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'blue';
    ctx.strokeStyle = "red";
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = beamWidth;

    // Draw three lines to create a glowing effect.
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();

    ctx.shadowOffsetX = -beamWidth / 2;
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();

    ctx.shadowOffsetX = beamWidth / 2;
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();

    // Draw the main beam.
    ctx.shadowOffsetX = -beamWidth;
    ctx.moveTo(beamx, beamy);
    beamy += 1;
    ctx.lineTo(beamx, beamy);
    ctx.stroke();

    // When the beam reaches the canvas's height, switch to the second beam animation.
    if (beamy >= beamCanvas.height) {
        clearInterval(beamTimer);
        beamTimer = -1;
        beamTimer2 = setInterval(drawBeam2, 100);
        // Get the selected option from a dropdown and switch between two images accordingly.

        const voltageSlider = document.getElementById('voltageSlider');
        const imageElement = document.getElementById('image');
      
            const sliderValue = voltageSlider.value;
            const imageIndex = sliderValue / 5; // Assuming each step represents 5 kV

            const images = [
                '', // Empty string for zero voltage (no image)
                '../images/outputs/se_5kv.png',
                '../images/outputs/se_10kv.png',
                '../images/outputs/se_15kv.png',
                '../images/outputs/se_20kv.png'
            ];
        
            if (imageIndex >= 0 && imageIndex < images.length) {
                imageElement.src = images[imageIndex];
            } else {
              alert("OOps! You did not Set Accelerating Voltage");
                // Handle the case where imageIndex is out of range
                // You can choose to do nothing or display a default image
                // For example: imageElement.src = 'default_image.png';
                // or imageElement.src = '';
            }
            if (sliderValue === "0") {
              alert("Voltage is set to zero.");
            }
         
         updateImageByVoltage();
        // updateImageByVoltage();


        

    }
}

// Function to draw the second beam.
function drawBeam2() {
    // Begin drawing on the second canvas and clear previous drawings.
    ctx2.beginPath();
    ctx2.clearRect(0, 0, beam2W, beam2H);

    // Set stroke style for the second beam.
    ctx2.strokeStyle = "black";

    // Draw two lines to create a different effect for the second beam.
    ctx2.moveTo(beamx2, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.moveTo(beamx2 - 6, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.stroke();
}

// Function to generate a random number between min and max.
function randEx(min, max) {
    return Math.random() * (max - min) + min;
}