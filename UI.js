
///// DECLARATION
var butH = 80
var butW = 80

// Line A
var diala2 = new Nexus.Dial('#dial-a2',{'size': [butH,butW]});
var diala3 = new Nexus.Dial('#dial-a3',{'size': [butH,butW]});
var diala4 = new Nexus.Dial('#dial-a4',{'size': [butH,butW]});
var diala5 = new Nexus.Dial('#dial-a5',{'size': [butH,butW]});

 // Line B
var dialb2 = new Nexus.Dial('#dial-b2',{'size': [butH,butW]});
var dialb3 = new Nexus.Dial('#dial-b3',{'size': [butH,butW]});
var dialb4 = new Nexus.Dial('#dial-b4',{'size': [butH,butW]});
var dialb5 = new Nexus.Dial('#dial-b5',{'size': [butH,butW]});

// sliders
var sliderAttack = new Nexus.Slider('#sliderAttack',{'size': [40,160]})
var sliderDecay = new Nexus.Slider('#sliderDecay',{'size': [40,160]})
var sliderSustain = new Nexus.Slider('#sliderSustain',{'size': [40,160]})
var sliderRelease = new Nexus.Slider('#sliderRelease',{'size': [40,160]})

// Pads
var pad1 = new Nexus.TextButton('#pad1',{'size': [90,90],'text': 'ARP'});
var pad2 = new Nexus.TextButton('#pad2',{'size': [90,90],'text': 'PAD'});
var pad3 = new Nexus.TextButton('#pad3',{'size': [90,90],'text': 'PROG'});
var pad4 = new Nexus.TextButton('#pad4',{'size': [90,90],'text': 'RELOAD'});
var pad5 = new Nexus.TextButton('#pad5',{'size': [90,90],'text': 'STOP'});
var pad6 = new Nexus.TextButton('#pad6',{'size': [90,90],'text': 'PLAY'});
var pad7 = new Nexus.TextButton('#pad7',{'size': [90,90],'text': 'REC'});
var pad8 = new Nexus.TextButton('#pad8',{'size': [90,90],'text': 'TAP'}); 

// Update of the main synth display
function updateDisplay(textLog) {
    console.log(textLog);
    myTestarea = document.getElementById("displayLog");
    var current = myTestarea.value;
    myTestarea.value = current + textLog + "\n";
    if(myTestarea.selectionStart == myTestarea.selectionEnd) {
        myTestarea.scrollTop = myTestarea.scrollHeight;
     }
}
function updateOsc(textLog) {
    console.log(textLog);
    myTestarea = document.getElementById("displayOsc");
    var current = myTestarea.value;
    myTestarea.value = current + textLog + "\n";
    if(myTestarea.selectionStart == myTestarea.selectionEnd) {
        myTestarea.scrollTop = myTestarea.scrollHeight;
     }
}
function updatePoly(textLog) {
    console.log(textLog);
    myTestarea = document.getElementById("displayPoly");
    var current = myTestarea.value;
    myTestarea.value = current + textLog + "\n";
    if(myTestarea.selectionStart == myTestarea.selectionEnd) {
        myTestarea.scrollTop = myTestarea.scrollHeight;
     }
}

let osc = new Nexus.Oscilloscope("#scope", {'size': [440,680] });
osc.colorize("accent",'#1fd3ee')
osc.colorize("fill","rgb(245, 245, 245)")

var visualKeys = document.getElementById("keyboard").children;
for (var i = 0, len = visualKeys.length; i < len; i++ ) {
    console.log("visualKeys " + visualKeys[ i ].getAttribute('note')  + " " + i);
    (function(index) {
        visualKeys[index].addEventListener("mousedown", function() {
            var note =  visualKeys[ index ].getAttribute('note');
           console.log("Note " + note);
           noteOnOff(note);
         })
   })(i);

}