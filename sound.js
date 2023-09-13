var osc_type =  ['fatsawtooth', 'square', 'fatsquare', 'triangle', 'sine','sawtooth'];
var notSub = [0,12, 24]

// PRESETS
var cur_notSub = 0;
var cur_osc_id2 = 0;
var detune_range = 300;
var cur_detune1 =  0.0;
var cur_detune2 =  0.0;
var volume_range = -40;
var cur_volume1 =  127;
var cur_volume2 =  0;

var bpm_range = 190; // Will get +60
var cur_bpm = 0.5;

var filter_range = 9000;
var cur_filter_freq = 0.8;
var Q_range = 30;
var cur_Q = 0.15;

var cur_enveloppe_attack = 0.2;
var cur_enveloppe_sustain =  0.9;


cur_delay =  0.0;
cur_delay_time =  0;

cur_poly = 0;

played_notes = [];

const filter = new Tone.Filter({type : "lowpass" ,frequency : cur_filter_freq ,rolloff : -12 ,Q : 5 ,gain : 0});
const pingpongdelay =  new Tone.PingPongDelay(cur_delay_time, cur_delay);

const synth1 = new Tone.Sampler({
  urls: {
    A0: "A0.mp3",
    C1: "C1.mp3",
    "D#1": "Ds1.mp3",
    "F#1": "Fs1.mp3",
    A1: "A1.mp3",
    C2: "C2.mp3",
    "D#2": "Ds2.mp3",
    "F#2": "Fs2.mp3",
    A2: "A2.mp3",
    C3: "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    A3: "A3.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
    C5: "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    A5: "A5.mp3",
    C6: "C6.mp3",
    "D#6": "Ds6.mp3",
    "F#6": "Fs6.mp3",
    A6: "A6.mp3",
    C7: "C7.mp3",
    "D#7": "Ds7.mp3",
    "F#7": "Fs7.mp3",
    A7: "A7.mp3",
    C8: "C8.mp3"
  },
  release: 1,
  baseUrl: 'https://tonejs.github.io/audio/salamander/'
}).toDestination();

const synth2  = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
      type: osc_type[cur_osc_id2],
      count: 2
  }
}).toDestination();

//Tone.Destination.chain(filter, distortion, pingpongdelay);
Tone.Destination.chain(filter, pingpongdelay);
Tone.start()
osc.connect(Tone.Master);

updateDisplay("Tone JS Synth ready");

// APPLY PRESTS
changeFilter(filter_range, 1, cur_filter_freq, true);
changeBpm(bpm_range, 1, cur_bpm, true);

changeQ(Q_range, 1, cur_Q, true);
changeDetune1(detune_range, 1, cur_detune1, true);
changeDetune2(detune_range, 1, cur_detune2, true);
changeAttack(1, 1, cur_enveloppe_attack, true);
changeRelease(1, 1, cur_enveloppe_sustain, true);
changVOL1(volume_range, 127, cur_volume1, true);
changVOL2(volume_range, 127, cur_volume2, true);

function midiNoteFromID(note) {
    const hertz = Tone.Frequency(note, "midi").toNote();
    return hertz;
}
function noteForSub(note) {
  octaveNum = parseInt(note.match(/\d+/)[0])
  octaveSub = octaveNum - cur_notSub
  subNote = note.replace(/\d+/, octaveSub) ;
  //updateDisplay("sub " + note + " and " + subNote)
  return subNote;
}

function noteOnOff(freqNote) {
  //updateDisplay("Note ON " + freqNote + " - " + velo + " - " + played_notes);
  synth1.triggerAttackRelease(freqNote, 1);
  synth2.triggerAttackRelease(noteForSub(freqNote), 1);
}
function noteOn(noteID, velo) {
    freqNote1 = midiNoteFromID(noteID);
    freqNote2 = midiNoteFromID(noteID - notSub[cur_notSub]);
    cur_poly += 1;
    played_notes.push(freqNote1);
    updateDisplay("Note ON " + freqNote1  + " & " + freqNote2);
    synth1.triggerAttack(freqNote1, Tone.now(), 1);
    synth2.triggerAttack(freqNote2, Tone.now(), 1);
    freqNote1=freqNote1.replace("#","\\#");
    const curKey = document.querySelector('[note='+freqNote1+']');
    //console.log("Got item " + curKey.getAttribute('note'));
    curKey.style.background = '#1fd3ee';
}
function noteOff(noteID, velo) {
    freqNote1 = midiNoteFromID(noteID);
    freqNote2 = midiNoteFromID(noteID - notSub[cur_notSub]);
    cur_poly -= 1;
    played_notes.pop(freqNote1);
    //updateDisplay("Note OFF " + freqNote + " - " + velo + " - " + played_notes);
    synth1.triggerRelease(freqNote1);
    synth2.triggerRelease(freqNote2);
    freqNote1=freqNote1.replace("#","\\#");
    const curKey = document.querySelector("[note="+freqNote1+"]");
    //console.log("Got item " + curKey.getAttribute('note'));
    if (freqNote1.includes("#")) {
      curKey.style.background = "black";
    }
    else{
      curKey.style.background = "white";
    }
   
}
function changOsc1(changeDisplay) {
  cur_notSub = cur_notSub + 1
  if (cur_notSub >= notSub.length) {cur_notSub = 0}
  updateOsc("OSC 2 sub set to minus " + notSub[cur_notSub])
  
}
function changOsc2() {
  cur_osc_id2 = cur_osc_id2 + 1
  if (cur_osc_id2 >= osc_type.length) {cur_osc_id2 = 0}
  updateOsc("OSC 2 set to " + osc_type[cur_osc_id2])
  synth2.set({oscillator: { type: osc_type[cur_osc_id2] } })
}
function changVOL1(amplitude, range,value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    if (changeDisplay) {
      diala2.value = convertTo(1, amplitude,cur_value);
    }
    value = range - value;
    cur_value = convertTo(amplitude, range,value);
    //console.log("VOL 1 set to " + cur_value + " " + value);
    synth1.set({ volume: cur_value });
    
  }
}
function changVOL2(amplitude, range,value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    if (changeDisplay) {
      dialb2.value = convertTo(1, amplitude,cur_value);
    }
    value = range - value;
    cur_value = convertTo(amplitude, range,value);
    //console.log("VOL 2 set to " + cur_value + " " + value);
    synth2.set({oscillator: { volume: cur_value } });
    
}
function changeFilter(amplitude, range,value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    console.log("Filter set to " + cur_value + " " + value);
    filter.set( { frequency : cur_value});
    if (changeDisplay) {
      diala4.value = convertTo(1, amplitude,cur_value);
    }
}
function changeBpm(amplitude, range,value, changeDisplay) {
    cur_value = parseInt(convertTo(amplitude, range,value));
    cur_value_bpm = cur_value + 60 ;
    console.log("BMP2 set to " + cur_value_bpm + " " + value);
    Tone.Transport.bpm.value = cur_value_bpm;
    if (changeDisplay) {
      diala3.value = convertTo(1, amplitude,cur_value);
    }
}

function changeAttack(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    synth1.set({ attack: cur_value });
    synth2.set({envelope: { attack: cur_value } });
  if (changeDisplay) {
    sliderAttack.value = convertTo(1, amplitude,cur_value);
  }
}
function changeRelease(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    synth1.set({ release: cur_value });
    synth2.set({envelope: { release: cur_value } });
  if (changeDisplay) {
    sliderRelease.value = convertTo(1, amplitude,cur_value);
  }
}
function changeQ(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    filter.set( { Q : cur_value});
  if (changeDisplay) {
    dialb4.value = convertTo(1, amplitude,cur_value);
  }
}
function changeDetune1(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    //console.log("detune 1 set to " + cur_value + " " + value);
    synth1.set({oscillator: { detune: cur_value } });
  if (changeDisplay) {
    diala3.value = convertTo(1, amplitude,cur_value);
  }
}
function changeDetune2(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    synth2.set({oscillator: { detune: cur_value } });
  if (changeDisplay) {
    dialb3.value = convertTo(1, amplitude,cur_value);
  }
}
function changeDelay(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    pingpongdelay.set({ feedback: cur_value });
  if (changeDisplay) {
    diala5.value = convertTo(1, amplitude,cur_value);
  }
}
function changeDelayTime(amplitude, range, value, changeDisplay) {
    cur_value = convertTo(amplitude, range,value);
    pingpongdelay.set({ delayTime: cur_value });
  if (changeDisplay) {
    dialb5.value = convertTo(1, amplitude,cur_value);
  }
}
function addStep(played_notes) {
  if (window.step_array.length === 0) {
    window.step_array[0] = played_notes;
  }
  else {
    window.step_array[window.step_array.length] = played_notes;
  }
  updatePoly(window.step_array);
}
/* function addEmptyStep() {
  window.step_array[step_array.length] = 0;
  updatePoly(window.step_array);
} */
function delStep() {
  window.step_array.pop();
  updatePoly(window.step_array);
}
function delAllStep() {
  window.step_array.splice();
  window.step_array = [];
  updatePoly(window.step_array);

}
function playAllStep(step_array) {
  console.table(step_array);
  const bassPart = new Tone.Sequence(((time, note) => {
    synth1.triggerAttackRelease(note, "8n", time);
    synth2.triggerAttackRelease(noteForSub(note), "8n", time);
  }), step_array, 0.2).start(0); // , "4n").start(0);
  Tone.Transport.start()
  updatePoly(window.step_array);
}

function stopStep(){
  Tone.Transport.stop()
  Tone.Transport.cancel();
}

function convertTo(amplitude, range, value) {
  returnVal = amplitude*value/range;
  // console.log("   " + value +  " / " +  range + " to " + returnVal + " / " + amplitude);
  return returnVal; //.toFixed(3);
}