var text;
const typeSpeed = 60;

var matSelected = 1;
var timerId, typeTarget = $("#typer"),
    tWrapper = $("#toast-wrapper"),
    ti = 0,
    currentStep = 0,
    contrast = 0,
    brightness = 0,
    vac = 0,
    av = 0,
    on = false,
    dropped = false,
    imgs = [],
    mode = 1,
    removeButtonclicked=false,
    spot_val=0,
    inp=0;

let isImageYDropped = false; // Flag to track if image-y has been dropped

// typing function
function type(txt, cur = 0) {
    if (cur == txt.length) {
        timerId = -1;
        return;
    }
    if (cur == 0) {
        typeTarget.html("");
        clearTimeout(timerId);
    }
    typeTarget.append(txt.charAt(cur));
    timerId = setTimeout(type, typeSpeed, txt, cur + 1);
}

// text to speech function

let english = true;
function toggleVoice(btn) {
  english = !english;
  if (english) btn.innerHTML = "ENG";
  else btn.innerHTML = "HIN";
}

function textToSpeech(text, lang) {
  // Check if the SpeechSynthesis API is available in the browser
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance();

    // Set the text to be spoken
    utterance.text = text;

    // Set the language
    if (lang) {
      utterance.lang = lang;
    }

    // Start the speech synthesis
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
}
// text to speech fxn end

// switch on
function toggleSwitch(toggleElement) {
    if (toggleElement.checked) {
        // Switch is ON, trigger strt()
        strt();
    } else {
        // Switch is OFF, reload the page
        location.reload();
    }
}

function removeHolder() {
    $(".move").on("dragstart", function (e) {
        var selected = e.target;
        $(".placeSampleHolder").on("dragover", function (e) {
        e.preventDefault();
        });
        $(".placeSampleHolder").on("drop", function (e) {
        $(".placeSampleHolder").append(selected);
       
        insertSample();
        return;
        });
    });
}

function insertHolder() {
    $(".placeSampleHolder").on("dragstart", function (e) {
        var selected = e.target;
        $(".placed").on("dragover", function (e) {
        e.preventDefault();
        });
        $(".placed").on("drop", function (e) {
        $(".placed").append(selected);

        if (english) {
            type("Now set the accelerating voltage to 200KV.");
            textToSpeech("Now set the accelerating voltage to 200KV.");
          } else {
            type("अब त्वरित वोल्टेज को 200 किलोवोल्ट पर सेट करें।");
            textToSpeech("अब त्वरित वोल्टेज को 200 किलोवोल्ट पर सेट करें", "hi-IN");
          }

        if(isImageYDropped==true){
            showToast("Set accelearting voltage");
            setTimeout(function(){
                $("#part11").css('visibility','visible');
            },1500);
            // $("#vslider").slider("option", "disabled", false);
            // $("#setvac").prop("disabled", false);

            $("#setav").prop("disabled", false);
            $("#avslider").slider("option", "disabled", false);
        }
        else{
            showToast("Please drag and drop sample before proceeding.",1);
            insertHolder();
        }

        return;
        });
    });
}

function strt() {
    // $('#removeButton').prop("disabled", false);
    removeHolder();

    showToast("Remove the sample holder");
    if (english) {
      type(
        "Now remove the holder, drag and drop the sample on it and insert the sample holder back into the machine."
      );
      textToSpeech(
        "Now remove the holder, drag and drop the sample on it and insert the sample holder back into the machine"
      );
    } else {
      type(
        "अब होल्डर को बाहर निकालें, उस पर सैंपल रखें और सैंपल होल्डर को वापस मशीन में डालें।"
      );
      textToSpeech(
        "अब होल्डर को बाहर निकालें, उस पर सैंपल रखें और सैंपल होल्डर को वापस मशीन में डालें",
        "hi-IN"
      );
    }
}

// toast message function
function showToast(msg, type = 0) {
    tWrapper.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${type == 1 ? '#ff0000' : (type == 2 ? '#31a66a' : '#007aff')}" /></svg>
        <strong class="mr-auto">Notification</strong>
    </div>
    <div class="toast-body">
        ${msg}
</div>
</div>`);
    $(`#t${ti - 1}`).toast({
        delay: 5500
    });
    $(`#t${ti - 1}`).toast('show');
}
// end of toast msg function

$(function () {
    
    if (english) {
        type("Welcome, Get started by switching on the machine.");
        textToSpeech("Welcome, Get started by switching on the machine.");
      } else {
        type("मशीन को स्टार्ट बटन द्वारा आँन करके प्रारंभ करें|");
        textToSpeech("मशीन को स्टार्ट बटन द्वारा आन करके प्रारंभ करें", "hi-IN");
      }

    // var vhandle = $("#vslider").find(".custom-handle");
    var avhandle = $("#avslider").find(".custom-handle");
    var mhandle = $("#mslider").find(".custom-handle");

    //  acc voltage slider
    $("#avslider").slider({
        min: 10,
        max: 11,
        value: 10,
        // animate: "slow",
        animate: 5000,
        orientation: "horizontal",
        disabled: true,
        create: function () {
            avhandle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            if (ui.value == 10) {
                avhandle.text("10");
                ac = '100'
            }
            if (ui.value == 11) {
                avhandle.text("200");
                ac = '200'
            }
        }
    });

    // magnification slider
    $("#mslider").slider({
        min: 0,
        max: 3,
        disabled: true,
        create: function () {
            mhandle.text("0");
        },
        slide: function (event, ui) {
            var txt = "0";
            switch (ui.value) {
                case 0:
                    txt = "0";
                    mag = '0';
                    showToast("Set the magnification to VH",1);
                    break;
                case 1:
                    txt = "L";
                    mag = 'L';
                    showToast("Set the magnification to VH",1);
                    break;
                case 2:
                    txt = "H";
                    mag = 'H';
                    showToast("Set the magnification to VH",1);
                    break;
                case 3:
                    txt = "VH";
                    mag = 'VH';
                    showToast("Magnification set. Click the button.",2);
                    break;
            }
            mhandle.text(txt);
        }
    });

    // beam on
    $("#on").one("click", function () {
        $('#on').css('backgroundColor', '#21e76e');
        // beam comes here
        clearInterval(beamTimer);
        clearInterval(beamTimer2);
        beamy = 0;
        ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
        ctx2.clearRect(0, 0, beam2W, beam2H);
        beamTimer = beamTimer2 = -1;
        beamTimer = setInterval(drawBeam, 10);
        // beam ends
        $("#setav").prop("disabled", true);
        $("#avslider").slider("option", "disabled", true);
    });

    // acc voltage
    $("#setav").click(function () {

        av = $("#avslider").slider("option", "value");

        if (english) {
          type("Switch on the beam after AV is set to 200KV.");
          textToSpeech("Switch on the beam after AV is set to 200KV");
        } else {
          type("बीम को आँन करें|");
          textToSpeech("बीम को आन करें", "hi-IN");
        }

        $("#on").prop("disabled", false);

        showToast("Switch on the beam");
    });

    // magnification
    $("#setmag").click(function () {
        showToast("Image generated successfully",2);
        type("Now you can see the output image.");
        if(english){
          type("Now you can see the output image.");
          textToSpeech("Now you can see the output image");
        }
        else{
          type("अब आप आउटपुट छवि देख सकते हैं।");
          textToSpeech("अब आप आउटपुट छवि देख सकते हैं");
        }
        
        mode = $(".imgMode option:selected").text();
        // inp = $("#position :selected").val();  

        url = "../images/outputs/" + mag + item + mode + ".jpg";
// bf             VHceramicBright Field
// bf-haadf       VHceramicBright Field(HAADF)
// df             VHceramicDark Field(CDF)
// sadp- df       VHceramicDiffraction(SADP)
            // $("#outImage3").attr("src",url);
            // $("#outImage3").attr("alt", url);

var containsVH = url.includes("VH");

if (containsVH) {
  $("#outImage3").attr("src",url);
  $("#outImage3").attr("alt", url);
} 
else {
  showToast("Image is not available");
  if(english){
    type(
      "Set the magnification to VH (Very High)"
    );
    textToSpeech(
      "Set the magnification to VH (Very High)"
    );
  }
  else{
    type(
      "आवर्धन को VH (बहुत अधिक) पर सेट करें|"
    );
    textToSpeech(
      "आवर्धन को VH (बहुत अधिक) पर सेट करें", "hi-IN"
    );
  }
}
    });

});

// beam code start 
var beamCanvas = document.getElementById("beam");
var ctx = beamCanvas.getContext('2d');
var beamy = 0,
    beamx = parseInt(beamCanvas.width / 2),
    beamWidth, beamTimer = -1;
var beamCanvas2 = document.getElementById("beam2");
var ctx2 = beamCanvas2.getContext('2d');
var beam2H = beamCanvas2.height,
    beam2W = beamCanvas2.width,
    beamx2 = parseInt(beamCanvas2.width / 2),
    beamTimer2 = -1;

function randEx(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBeam() {
    ctx.beginPath();

    beamWidth = Math.sin(beamy * 3.14 / 160) * 7;
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'red';
    ctx.strokeStyle = "green";
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = beamWidth;
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

    ctx.shadowOffsetX = -beamWidth;
    ctx.moveTo(beamx, beamy);
    beamy += 1;
    ctx.lineTo(beamx, beamy);
    ctx.stroke();
    if (beamy >= beamCanvas.height) {
        clearInterval(beamTimer);
        beamTimer = -1;
        beamTimer2 = setInterval(drawBeam2, 100);

        if (english) {
            type(
              "The output image is displaying on the right side. This is Bright Field Imaging."
            );
            textToSpeech(
              "The output image is displaying on the right side. This is Bright Field Imaging"
            );
          } else {
            type(
              "आउटपुट छवि दाईं ओर प्रदर्शित हो रही है| यह ब्राइट फील्ड चित्रण है।"
            );
            textToSpeech(
              "आउटपुट छवि दाईं ओर प्रदर्शित हो रही है| यह ब्राइट फील्ड चित्रण है",
              "hi-IN"
            );
          }
        
          showToast("Set imaging mode");
        $('#position').prop("disabled", false);
// range slider
        $("#rs").prop("disabled", false);
        // $("#avslider").slider("option", "disabled", true);

        $('#downloadButton').show();
        // $("#outImage4").hide();

        if (item == "ceramic") {
          $('#outImage3').show(500, function() {
          });
          showToast("TEM Image Generated successfully", 2);
        }
      
        if (english) {
          type(
            "Select spot size between 2-5 for bright field and dark field imaging and 4-5 for Selectefd Area Diffraction Pattern."
          );
          textToSpeech(
            "Select spot size between 2-5 for bright field and dark field imaging and 4-5 for Selectefd Area Diffraction Pattern"
          );
        }
        else{
          type(
            "ब्राइट फील्ड और डार्क फील्ड चित्रण के लिए 2-5 के बीच स्पॉट साइज़ का चयन करें और सेलेक्टेड एरिया डिफ्रैक्सन पैटर्न के लिए 4-5 का चयन करें।"
          );
          textToSpeech(
            "ब्राइट फील्ड और डार्क फील्ड चित्रण के लिए 2 से 5 के बीच स्पॉट साइज़ का चयन करें और सेलेक्टेड एरिया डिफ्रैक्सन पैटर्न के लिए 4 से 5 का चयन करें",
            "hi-IN"
          );
        }
    }
}

function drawBeam2() {
    ctx2.beginPath();
    ctx2.clearRect(0, 0, beam2W, beam2H);
    ctx2.strokeStyle = "#FFFFFFBB";
    ctx2.moveTo(beamx2, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.moveTo(beamx2 - 6, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.stroke();
}
// beam code end

// sample and holder move
function insertSample() {
  
    $("#image-b").on("dragstart", function (e) {
      e.originalEvent.dataTransfer.setData("text/plain", "dragging-b"); // Allow image B to be draggable
    });
  
    $("#image-x").on("dragover", function (e) {
      e.preventDefault();
    });
  
    $("#image-x").on("drop", function (e) {
      e.preventDefault();
      const draggedItem = e.originalEvent.dataTransfer.getData("text/plain");
  
      if (draggedItem === "dragging-b" && !isImageYDropped) {
        $("#image-b").css("visibility", "hidden");
        isImageYDropped = true; // Set the flag when image-_ is dropped
        $("#image-x").attr("src", "../images/parts/sh3.png"); // Replace image X with image Z when any image is dropped onto it
        insertHolder();
        item = "ceramic";
      }
      else{
        showToast("Put the holder in the machine",1);
        type("You need to put the sample holder with the sample back in machine from where it was removed. Restart the machine if you forgot where it was placed.");
      }
      return;
    });
  }

// sample and holder move end

// Get references to the button, modal, and close button
const toggleButton_tem = document.getElementById('toggleButton_tem');
const imageModal = document.getElementById('imageModal');
const closeButton_tem = document.getElementById('closeButton_tem');
const image_tem = document.querySelector('#imageModal img');

// Flag to track the state of the modal
let modalVisible = false;

// Function to toggle the modal and button text
function toggleModal() {
    if (modalVisible) {
        // Hide the modal
        imageModal.style.display = 'none';
        toggleButton_tem.textContent = 'See TEM';
    } else {
        // Show the modal
        imageModal.style.display = 'block';
        toggleButton_tem.textContent = 'Hide TEM';
    }
    modalVisible = !modalVisible;
}

// Add a click event listener to the button
toggleButton_tem.addEventListener('click', toggleModal);

// Add a click event listener to the close button
closeButton_tem.addEventListener('click', toggleModal);

// Make the modal draggable
let isDragging = false;
let offsetX, offsetY;

imageModal.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - imageModal.getBoundingClientRect().left;
    offsetY = e.clientY - imageModal.getBoundingClientRect().top;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        imageModal.style.left = newX + 'px';
        imageModal.style.top = newY + 'px';
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// button, modal, and close button end

// Function to download the image
function downloadImage() {
  const image_op = document.getElementById("image_op");
  const imageUrl = image_op.src;
  const a = document.createElement("a");
  a.href = imageUrl;
  a.download = "../images/outputs/tem_bf.jpg"; // Set the desired filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Add a click event listener to the download button
const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", downloadImage);
// end of Function to download the image 

// range slider
function rangeSlide(value) {
  document.getElementById('rangeValue').innerHTML = value;
  // if(english){
  //   type(
  //     "Select Mode"
  //   );
  //   textToSpeech(
  //     "Select Mode"
  //   );
  // }
  // else{
  //   type(
  //     "मोड चुनें"
  //   );
  //   textToSpeech(
  //     "मोड चुनें"
  //   );
  // }
  change();
}

// Enable/disable options based on spot size range value
function change() {
  var spot_val = parseInt(document.getElementById('rangeValue').innerHTML);
  var selectBox = document.getElementById('position');
  
  // Disable all options initially
  for (var i = 0; i < selectBox.options.length; i++) {
    selectBox.options[i].disabled = true;
  }

  // Enable options based on spot size range value
  if (spot_val >= 1 && spot_val <= 2) {
    selectBox.options[0].disabled = false; // Bright Field(CDF)
    selectBox.options[1].disabled = false; // Bright Field(HAADF)
    selectBox.options[2].disabled = false; // Dark Field(CDF)
  } else if (spot_val >= 4 && spot_val <= 5) {
    selectBox.options[3].disabled = false; // Diffraction(SADP)
  }
  enable_mag();
}

// imaging mode selection
function enable_mag(){
  $("#setmag").prop("disabled", false);
  $("#mslider").slider("option", "disabled", false);
}
// imaging mode selection code end