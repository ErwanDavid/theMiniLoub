var pwbtn = document.getElementById('powerButton');
pwbtn.addEventListener('click', updateBtn);

var rmBtn = document.getElementById('rmSnd');
rmBtn.addEventListener('click', rmSnd);

var addBtn = document.getElementById('addSnd');
addBtn.addEventListener('click', addSnd);

window.step_array = [];

diala2.on('change', function (v) {
  changVOL1(volume_range, 1, v, false);});
dialb2.on('change', function (v) {
  changVOL2(volume_range, 1, v, false);});
diala4.on('change', function (v) {
  changeGate(gate_range, 1, v, false);});
  //changeFilter(filter_range, 1, v, false);});
dialb4.on('change', function (v) {
  changeDisto(disto_range, 1, v, false);});
//diala5.on('change', function (v) {
//  changeAttack(1, 1, v, false);});
//dialb5.on('change', function (v) {
//  changeRelease(1, 1, v, false);});
diala3.on('change', function (v) {
  changeBpm(bpm_range, 1, v, false);});
dialb3.on('change', function (v) {
  changeDetune2(detune_range, 1, v, false);});

function addSnd() {
  updateDisplay("added voice");
  noteOn(60, 127);
}
function rmSnd() {
  updateDisplay("removed voice");
  noteOff(60, 127);
}
function updateBtn() {
  updateDisplay("play thru button");
  noteOnOff("C3");
}
navigator.permissions.query({ name: "midi"}).then((result) => {
  if (result.state === "granted") {
    console.log("granted");
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else if (result.state === "prompt") {
    // Using API will prompt for permission
    console.log("prompt");

  }
});

function onMIDISuccess(midiAccess) {
  updateDisplay("This browser support WebMIDI!");
  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;

  for (var input of midiAccess.inputs.values()) {
    console.log("Id " + input.id + ' ' + input.name);
    console.log("manufacturer " + input.manufacturer);
    myName = input.name.toLowerCase()

    if (myName.includes("lab")) {
      updateDisplay("Getting from " + myName);
      input.onmidimessage = getMIDIMessage;
    }
  }
}

function manageKeys(midiData) {
  type = midiData[0],
  note = midiData[1],
  velocity = midiData[2];
  console.log("Midi Data " +  type +  " note " + note + " velo " + velocity);
  switch (type) {
    case 144: // noteOn message 
      noteOn(note, velocity);
      break;
    case 128: // noteOff message 
      noteOff(note, velocity);
      break;
    case 176: // All top button message 
      manageButton(note, velocity);
      break;
    case 153: // All top button message 
      managePad(note, velocity);
      break;

  }
}
function managePad(note, curValue) {
  switch (note) { // 44-1 45-2 46-3 47-4
    case 50:
      console.table(window.step_array);
      if (window.played_notes.length > 0) {
        console.log("add empty note");
      }
      addStep(played_notes[0]);
      console.table(window.step_array);
      break;
    case 51: //  PAD 2
    delStep();
      break;
    case 49: //  PAD 5
      playAllStep(window.step_array);
      break;
    case 48: //  PAD 6
      stopStep(window.step_array);
      break;
    case 46: //  PAD 6
      changOsc2();
      break;
    case 47: //  PAD 8
      location.reload();
      break;
    } 
  }  

function manageButton(note, curValue) {
  switch (note) {
    case 113: // push 1st button
      if (curValue == 127) {
        changOsc1(false);
      }
      break;
    case 115: // push 1st button
      if (curValue == 127) {
        changOsc2(false);
      }
      break;
    case 74:  // rotate row 1 col 2
      // curValue = 127-curValue;
      changVOL1(volume_range, 127, curValue, true);
      break;
    case 93:  // rotate row 2 col 2
      changVOL2(volume_range, 127, curValue, true);
      break;
    case 71:  // rotate row 1 col 3
      changeBpm(bpm_range, 127, curValue, true);
      break;
    case 18:  // rotate row 2 col 3
      changeDetune2(detune_range, 127, curValue, true);
      break;
    case 19:  // rotate row 2 col 4
      changeDisto(disto_range, 127, curValue, true);
      break;
    case 76:  // rotate row 1 col 4
      changeGate(filter_range, 127, curValue, true);
      //changeFilter(filter_range, 127, curValue, true);
      break;
    case 82:  // Fader 1
      changeAttack(1, 127, curValue, true);
      break;
    case 83:  // Fader 2
      changeRelease(1, 127, curValue, true);
      break;  
    case 85:  // Fader 3
      changeFilter(filter_range, 127, curValue, true);
      break;  
    case 17:  // Fader 4
      changeQ(Q_range, 127, curValue, true);
      break;
    case 77:  // rotate row 1 col 6
      changeDelay(1, 127, curValue, true);
      break;
      
    case 16:  // rotate row 2 col 6
      changeDelayTime(2, 127, curValue, true);
      break; 
  }
}
function getMIDIMessage(midiMessage) {
  myTS = midiMessage.timeStamp;
  manageKeys(midiMessage['data']);
  myData = midiMessage.data;
  return myData;
}

function onMIDIFailure(msg) {
  updateDisplay("Error with WebMIDI!");
  console.error("Failed to get MIDI access - " + msg);
}