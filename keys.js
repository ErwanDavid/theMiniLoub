var pwbtn = document.getElementById('powerButton');
pwbtn.addEventListener('click', updateBtn);

var rmBtn = document.getElementById('rmSnd');
rmBtn.addEventListener('click', rmSnd);

var addBtn = document.getElementById('addSnd');
addBtn.addEventListener('click', addSnd);

window.step_array = [];

diala1.on('click', function (v) {
  changOsc1(false);});
dialb1.on('click', function (v) {
  changOsc2(false);});
diala2.on('change', function (v) {
  changVOL1(volume_range, 1, v, false);});
dialb2.on('change', function (v) {
  changVOL2(volume_range, 1, v, false);});
diala4.on('change', function (v) {
  changeFilter(filter_range, 1, v, false);});
dialb4.on('change', function (v) {
  changeQ(Q_range, 1, v, false);});
diala5.on('change', function (v) {
  changeAttack(1, 1, v, false);});
dialb5.on('change', function (v) {
  changeRelease(1, 1, v, false);});
diala3.on('change', function (v) {
  changeDetune1(detune_range, 1, v, false);});
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
  noteOn(60, 127);
  noteOff(60, 127);
}

navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

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
  switch (note) {
    case 36: // PAD 1
    window.step_array = addStep(window.step_array, played_notes);
      break;
    case 37: //  PAD 2
    window.step_array =  addEmptyStep(window.step_array);
      break;
    case 38: //  PAD 3
    window.step_array = delStep(window.step_array);
      break;
    case 39: //  PAD 4
      delAllStep(window.step_array);
      break;
    case 40: //  PAD 4
      playAllStep(window.step_array);
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
    case 18:  // rotate row 2 col 2
      changVOL2(volume_range, 127, curValue, true);
      break;
    case 71:  // rotate row 1 col 3
      changeDetune1(detune_range, 127, curValue, true)
      break;
    case 19:  // rotate row 2 col 3
      changeDetune2(detune_range, 127, curValue, true)
      break;
    case 76:  // rotate row 1 col 4
      changeFilter(filter_range, 127, curValue, true);
      break;
    case 16:  // rotate row 2 col 4
      changeQ(Q_range, 127, curValue, true)
      break;
    case 77:  // rotate row 1 col 5
      changeAttack(1, 127, curValue, true);
      break;
    case 17:  // rotate row 2 col 5
      changeRelease(1, 127, curValue, true)
      break;    
    case 93:  // rotate row 1 col 6
      changeDelay(1, 127, curValue, true);
      break;
    case 91:  // rotate row 2 col 6
    changeDelayTime(1, 127, curValue, true)
      break;    
  }
}
function getMIDIMessage(midiMessage) {
  myTS = midiMessage.timeStamp;
  manageKeys(midiMessage['data']);
  myData = midiMessage.data;
  return myData;
}

function onMIDIFailure() {
  updateDisplay('Could not access your MIDI devices.');
}