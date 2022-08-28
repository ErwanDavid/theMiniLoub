
///// DECLARATION
// Line A
var diala1 = new Nexus.Button('#dial-a1');
var diala2 = new Nexus.Dial('#dial-a2');
var diala3 = new Nexus.Dial('#dial-a3');
var diala4 = new Nexus.Dial('#dial-a4');
var diala5 = new Nexus.Dial('#dial-a5');
var diala6 = new Nexus.Dial('#dial-a6');
var diala7 = new Nexus.Dial('#dial-a7');
var diala8 = new Nexus.Dial('#dial-a8');
// Line B
var dialb1 = new Nexus.Button('#dial-b1');
var dialb2 = new Nexus.Dial('#dial-b2');
var dialb3 = new Nexus.Dial('#dial-b3');
var dialb4 = new Nexus.Dial('#dial-b4');
var dialb5 = new Nexus.Dial('#dial-b5');
var dialb6 = new Nexus.Dial('#dial-b6');
var dialb7 = new Nexus.Dial('#dial-b7');
var dialb8 = new Nexus.Dial('#dial-b8');
// Pads
var pad1 = new Nexus.TextButton('#pad1',{'size': [90,90],'text': 'P1'});
var pad2 = new Nexus.TextButton('#pad2',{'size': [90,90],'text': 'P2'});
var pad3 = new Nexus.TextButton('#pad3',{'size': [90,90],'text': 'P3'});
var pad4 = new Nexus.TextButton('#pad4',{'size': [90,90],'text': 'P4'});
var pad5 = new Nexus.TextButton('#pad5',{'size': [90,90],'text': 'P5'});
var pad6 = new Nexus.TextButton('#pad6',{'size': [90,90],'text': 'P6'});
var pad7 = new Nexus.TextButton('#pad7',{'size': [90,90],'text': 'P7'});
var pad8 = new Nexus.TextButton('#pad8',{'size': [90,90],'text': 'P8'});

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
    console.log("visualKeys " + visualKeys[ i ]  + " " + len);
    visualKeys[ i ].addEventListener("mousedown", () => {
        console.log("pressed " + i );
      });
}


