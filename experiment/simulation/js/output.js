// const fadeImages = document.querySelectorAll('.fade-image');
// const opacitySlider = document.getElementById('voltageSlider');

// opacitySlider.addEventListener('input', () => {
//   const opacityValue = voltageSlider.value;

//   fadeImages.forEach(image => {
//     image.style.opacity = opacityValue;
//   });
// });



// const voltageSlider = document.getElementById('voltageSlider');
// const imageElement = document.getElementById('image');

// voltageSlider.addEventListener('input', () => {
//   const sliderValue = voltageSlider.value;
//   const imageIndex = sliderValue / 5; // Assuming each step represents 5 kV

//   $("#Brightness").prop("disabled", false);
//   const images = [
//     '../images/outputs/se_5kv.png',
//     '../images/outputs/se_10kv.png',
//     '../images/outputs/se_15kv.png',
//     '../images/outputs/se_20kv.png'
//   ];

//   if (imageIndex < images.length) {
//     imageElement.src = images[imageIndex];
//   }
// });



// function updateImageByVoltage() {
//   const voltageSlider = document.getElementById('voltageSlider');
//   const imageElement = document.getElementById('image');
  
//   voltageSlider.addEventListener('input', () => {
//       const sliderValue = voltageSlider.value;
//       const imageIndex = sliderValue / 5; // Assuming each step represents 5 kV
  
//       $("#Brightness").prop("disabled", false);
//       const images = [
//           '', // Empty string for zero voltage (no image)
//           '../images/outputs/se_5kv.png',
//           '../images/outputs/se_10kv.png',
//           '../images/outputs/se_15kv.png',
//           '../images/outputs/se_20kv.png'
//       ];
  
//       if (imageIndex >= 0 && imageIndex < images.length) {
//           imageElement.src = images[imageIndex];
//       } else {
//         alert("OOps! You did not Set Accelerating Voltage");
//           // Handle the case where imageIndex is out of range
//           // You can choose to do nothing or display a default image
//           // For example: imageElement.src = 'default_image.png';
//           // or imageElement.src = '';
//       }
//       if (sliderValue === "0") {
//         alert("Voltage is set to zero.");
//       }

//   });
// }

// // Call the function to set up the voltage slider event listener

// updateImageByVoltage();

// image downlaod 


  // Function to download the image
  function downloadImage() {
      const image = document.getElementById("image");
      const imageUrl = image.src;
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = "downloaded-image.png"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  // Add a click event listener to the download button
  const downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", downloadImage);







