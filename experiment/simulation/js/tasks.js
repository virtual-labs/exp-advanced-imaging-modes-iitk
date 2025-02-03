// toast message function

//function showToast(msg, type = 0) {
//     tWrapper.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
//     <div class="toast-header">
//         <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${type == 1 ? '#ff0000' : (type == 2 ? '#31a66a' : '#007aff')}" /></svg>
//         <strong class="mr-auto">Notification</strong>
//     </div>
//     <div class="toast-body">
//         ${msg}
// </div>
// </div>`);
//     $(`#t${ti - 1}`).toast({
//         delay: 5500
//     });
//     $(`#t${ti - 1}`).toast('show');
// }

// end of toast msg function


var text;
const typeSpeed = 60;

var matSelected = 1;
var timerId,
    typeTarget = $("#typer"),
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
    removeButtonclicked = false,
    inp = 0;

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
// function toggleVoice(btn) {
//   english = !english;
//   if (english) btn.innerHTML = "ENG";
//   else btn.innerHTML = "HIN";
// }

function hindiVoice(btn) {
    english = false;
    start();
    document.getElementById("dialogue-box-parent").style.display = 'none';
}

function englishVoice(btn) {
    english = true;
    start();
    document.getElementById("dialogue-box-parent").style.display = 'none';
}

// text to speech 

function textToSpeech(text, lang) {
    const isSpeechSynthesisSupported = 'SpeechSynthesisUtterance' in window;
    
    if (isSpeechSynthesisSupported) {
        const utterance = new SpeechSynthesisUtterance();
        
        utterance.text = text;

        if (lang) {
            utterance.lang = lang;
        }

        // Check if speech synthesis is paused and resume it if necessary
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }

        // Start the speech synthesis
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Synthesis Not Supported !");
        console.error("Speech synthesis is not supported in this browser.");
    }
}
// text to speech fxn end


// Add an event listener to the button
// document.getElementById("reloadButton").addEventListener("click", reloadPage);

function start() {
    if (english) {
        type("Welcome, Get started by switching on the machine.");
        textToSpeech("Welcome, Get started by switching on the machine.");
    } else {
        type("मशीन को स्टार्ट बटन द्वारा चालू  करें|");
        textToSpeech("मशीन को स्टार्ट बटन द्वारा चालू करें", "hi-IN");
    }
}


// toggle interruption facility 
function handleToggle() {
    var toggleSwitch = document.getElementById("toggle");

    if (toggleSwitch.checked) {
        strt();
        // The toggle is in the "ON" position, so execute your functionality here
        showToast("Machin On !");
        // alert("Machine Started ! Swtiched ON...");
    } else {
        // The toggle is in the "OFF" position, do nothing or show a message
        // alert("Machine  is OFF. Reloading the page...");
        location.reload();

        // You can also prevent further actions or code execution here if needed
    }
}


// SE and BSE Mode Functionality 

function toggleMode() {
    var checkbox = document.getElementById("status");
    // var rangeInput = document.getElementById("vaccum-selection");

    if (checkbox.checked) {
        if (english) {

            type("Now Machine is in BSE Mode . Next Step is to Select the Sample.");
            textToSpeech("Now Machine is in BSE Mode. Next Step is to Select the Sample");
        }
        else {
            type("अभी मशीन बीएसई मोड में है । आप चाहें तो मशीन के मोड में बदलाव कर सकते  हैं। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।");
            textToSpeech("अभी मशीन बीएसई मोड में है । आप चाहें तो मशीन के मोड में बदलाव कर सकते  हैं। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।", "hi-IN");

        }
        // rangeInput.removeAttribute("disabled");
    } else {
        if (english) {
            type("Now Machine is in SE Mode , Select the Sample");
            textToSpeech("Now Machine is in SE Mode,Select the Sample. ");
        }
        else {
            type("मशीन एसई मोड में चयन हो चुकी है। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।");
            textToSpeech("मशीन एसई मोड में चयन हो चुकी है। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।","hi-IN");
        }



    }
}


// switch on
function strt() {
    $('#sam').prop("disabled", false);
    // $('#voltageSlider').prop("disabled", false);
    $('#status').prop("disabled", false); // SE and BSE 

    // $('#dropzone').css('display', 'block');
    // $('#removeButton').prop("disabled", false);
    // $('#insertButton').prop("disabled", false);

    if (english) {
        type("Now Machine is in default Mode, You can Change the Mode.");
        textToSpeech("Now Machine is in default Mode, You can Change the Mode");
    } else {
        type("मशीन अपने डिफॉल्ट एसई मोड में है। आप चाहें तो मशीन के मोड में बदलाव कर सकते  हैं। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।");
        textToSpeech("मशीन अपने डिफॉल्ट एसई मोड में है। आप चाहें तो मशीन के मोड में बदलाव कर सकते  हैं। तथा अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।", "hi-IN");
    }


    // showToast("Machine ON");
}

// default voice and text started
// window.addEventListener('load', function() {
//     textToSpeech("WELCOME TO THE SCANNING ELECTRON MICROSCOPE SIMULATION ");

//     setTimeout(function () {
//         textToSpeech("अपनी सुविधा अनुसार भाषा का चयन करें।", "hi-IN");
//     }, 2000);
// });




$(function () {
    textToSpeech("WELCOME TO THE SCANNING ELECTRON MICROSCOPE SIMULATION");

    // Trigger another text-to-speech function after 2 seconds
    setTimeout(function () {
        // Call your second text-to-speech function here
        textToSpeech("अपनी सुविधा अनुसार भाषा का चयन करें।", "hi-IN");
    },1000);
});





// sample 

function changeSampleImage() {
    var selectElement = document.getElementById("sam");
    var selectedValue = selectElement.value;
    var specimenImage = document.getElementById("specimen1");
    if (english){
        type("Now Set the Vaccum Level");
        textToSpeech("Now Set the Vaccum Level");
    
    }
    else {
        type("अब,वैक्यूम का लेबल सेट करें।");
        textToSpeech("अब,वैक्यूम का लेबल सेट करें।","hi-IN");
    }


    // Define the image sources for different sample options
    var imageSources = {
        "nanoparticles": "../images/parts/wood.png",
        "zebrafish": "../images/parts/pollen.png",
        "metal": "../images/parts/rock.png",
        "mineral": "../images/parts/steel.png"
    };

    // Set the image source based on the selected value
    specimenImage.src = imageSources[selectedValue];
    $("#vaccum-selection").prop("disabled", false);
    $("#setvac").prop("disabled", false);
}


// vaccum
$("#setvac").click(function () {

    $("#imageslider").prop("disabled", false)
    $("#w-distance").prop("disabled", false);
    if (english) {
        type("Now set Working Distance voltage");
        textToSpeech("Now set Working Distance ");
    }
    else {
        type("वर्किंग डिस्टेंस को सेट करने का प्रयास करें।");
        textToSpeech("वर्किंग डिस्टेंस को सेट करने का प्रयास करें।","hi-IN");
    }
    // $("#avslider").slider("option", "disabled", false);
    // showToast("Vaccum set");
    $("#sam").prop("disabled", true);
    // $("specimen1").prop("disabled",true);

});


// # Workking distace 
$("#w-distance").click(function () {
    if(english){
        type("Now set Accelerating Voltage");
        textToSpeech("Now set Accelerating Voltage ");
    }
    else {
        type("अपने एक्सपेरिमेट के अनुसार एक्लेरेटिंग वोल्टेज का सेटकरने का प्रयास करें |");
        textToSpeech("अपने एक्सपेरिमेट के अनुसार एक्लेरेटिंग वोल्टेज को सेट करने का प्रयास करें |","hi-IN");
    }

    $("#imageslider").prop("disabled", false)
    $('#voltageSlider').prop("disabled", false);
    $("#a-vol").prop("disabled", false);
    // $("#avslider").slider("option", "disabled", false);
    $("#setvac").prop("disabled", true);
    $("#vaccum-selection").prop("disabled", true);
    showToast("Working Distance set ");
});


// # Accelerating volatge

$("#a-vol").click(function () {
    if (english){
        type("Swith On the Beam ");
        textToSpeech("Switch On the Beam ");
    }
    else{
        type("बीम बटन को प्रेस करके ,बीम को चालू करने का प्रयास करें।");
        textToSpeech("बीम बटन को प्रेस करके ,बीम को चालू करने का प्रयास करें।","hi-IN");
    }

    $("#on").prop("disabled", false) //beam Button 
    // $("#avslider").slider("option", "disabled", false);
    // showToast("Accelerating Volateg is On ");
    $("#w-distance").prop("disabled", true);
    $("#imageslider").prop("disabled", true);
});

// ## BEam Control on/off Disabled /unabled

$("#on").click(function () {
    if(english){

        type("Analyze the Output and Adjust the Brightness & Spotsize ");
        textToSpeech("Analyze the Output and Adjust the Brightness & Spotsize");
    }
    else {
        type("परिणाम का विश्लेषण करें |");
        textToSpeech("परिणाम का विश्लेषण करें ","hi-IN");

    }

    $("#Brightness").prop('disabled', false);

    // showToast("Image Formed ! Analyze it ");
    // $("#a-vol").prop("disabled", true);
    // $("#voltageSlider").prop("disabled", true);

});



// drag box javascript 

$(function () {
    $("#cutButton").click(function () {
        $("#draggable").hide();
    });

    $("#info").click(function () {
        $("#draggable").show();
    });

    $("#draggable").draggable();
});





const slider = document.getElementById("imageslider");
const image = document.getElementById("specimen");

slider.addEventListener("input", () => {
    const value = slider.value;
    // Adjust the top margin to move the image upward
    image.style.marginTop = `-${value}%`;
});


// brightness 

function changeBrightness() {
    // Get the range input value
    var brightnessValue = document.getElementById("Brightness").value;

    // Calculate the brightness value for the image
    var brightness = brightnessValue / 50; // Divide by 100 to get a value between 0 and 1

    // Apply the brightness to the image
    document.getElementById("image").style.filter = "brightness(" + brightness + ")";
}


