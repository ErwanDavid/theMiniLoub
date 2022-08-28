var osc_type =  ['sawtooth', 'fatsawtooth', 'square', 'fatsquare', 'triangle', 'sine'];

// PRESETS
var cur_osc_id1 = 0;
var cur_osc_id2 = 0;
var detune_range = 127;
var cur_detune1 =  0.0;
var cur_detune2 =  0.0;
var volume_range = -40;
var cur_volume1 =  1;
var cur_volume2 =  0;

 filter_range = 9000;
 cur_filter_freq = 0.9;
 Q_range = 30;
 cur_Q = 0.15;

cur_enveloppe_attack = 0.3;
cur_enveloppe_sustain =  0.9;


cur_disto =  0.0;
cur_delay =  0.0;
cur_delay_time =  '128n';

cur_poly = 0;

played_notes = [];

const filter = new Tone.Filter({type : "lowpass" ,frequency : cur_filter_freq ,rolloff : -12 ,Q : 5 ,gain : 0});
const pingpongdelay =  new Tone.PingPongDelay(cur_delay_time, cur_delay);
const distortion = new Tone.Distortion(cur_disto);

const synth1  = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
        type: osc_type[cur_osc_id1],
        count: 2
    }
}).toDestination();

const synth2  = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
      type: osc_type[cur_osc_id2],
      count: 2
  }
}).toDestination();

Tone.Destination.chain(filter, distortion, pingpongdelay);
Tone.start()
osc.connect(Tone.Master);

updateDisplay("Tone JS Synth ready");

// APPLY PRESTS
changeFilter(filter_range, 1, cur_filter_freq, true);
changeQ(Q_range, 1, cur_Q, true);
changeDetune1(detune_range, 1, cur_detune1, true);
changeDetune2(detune_range, 1, cur_detune2, true);
changeAttack(1, 1, cur_enveloppe_attack, true);
changeRelease(1, 1, cur_enveloppe_sustain, true);
changOsc1(true);
changOsc2(true);
changVOL1(1, 1, cur_volume1, true);
changVOL2(1, 1, cur_volume2, true);

function midiNoteFromID(note) {
    const hertz = Tone.Frequency(note, "midi").toNote();
    return hertz;
}
function noteOn(noteID, velo) {
    freqNote = midiNoteFromID(noteID);
    cur_poly += 1;
    played_notes.push(noteID);
    updateDisplay("Note ON " + freqNote + " - " + velo + " - " + played_notes);
    synth1.triggerAttack(noteID, Tone.now(), 1);
    synth2.triggerAttack(noteID, Tone.now(), 1);
}
function noteOff(noteID, velo) {
    freqNote = midiNoteFromID(noteID);
    cur_poly -= 1;
    played_notes.pop(noteID);
    updateDisplay("Note OFF " + freqNote + " - " + velo + " - " + played_notes);
    synth1.triggerRelease(noteID);
    synth2.triggerRelease(noteID);
}
function changOsc1(changeDisplay) {
  cur_osc_id1 = cur_osc_id1 + 1
  if (cur_osc_id1 >= osc_type.length) {cur_osc_id1 = 0}
  updateOsc("OSC 1 set to " + osc_type[cur_osc_id1])
  synth1.set({oscillator: { type: osc_type[cur_osc_id1] } })
  if (changeDisplay) {
    //diala1.flip();
  }
}
function changOsc2(changeDisplay) {
  cur_osc_id2 = cur_osc_id2 + 1
  if (cur_osc_id2 >= osc_type.length) {cur_osc_id2 = 0}
  updateOsc("OSC 2 set to " + osc_type[cur_osc_id2])
  synth2.set({oscillator: { type: osc_type[cur_osc_id2] } })
  if (changeDisplay) {
    //dialb1.flip();
  }
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
    synth1.set({oscillator: { volume: cur_value } });
    
  }
}
function changVOL2(amplitude, range,value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    if (changeDisplay) {
      dialb2.value = convertTo(1, amplitude,cur_value);
    }
    value = range - value;
    cur_value = convertTo(amplitude, range,value);
    //console.log("VOL 2 set to " + cur_value + " " + value);
    synth2.set({oscillator: { volume: cur_value } });
    
  }
}
function changeFilter(amplitude, range,value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Filter set to " + cur_value + " " + value);
    filter.set( { frequency : cur_value});
    if (changeDisplay) {
      diala4.value = convertTo(1, amplitude,cur_value);
    }
  }
}
function changeAttack(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    synth1.set({envelope: { attack: cur_value } });
    synth2.set({envelope: { attack: cur_value } });
  if (changeDisplay) {
    diala5.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeRelease(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    synth1.set({envelope: { release: cur_value } });
    synth2.set({envelope: { release: cur_value } });
  if (changeDisplay) {
    dialb5.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeQ(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("Q set to " + cur_value + " " + value);
    filter.set( { Q : cur_value});
  if (changeDisplay) {
    dialb4.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeDetune1(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("detune 1 set to " + cur_value + " " + value);
    synth1.set({oscillator: { detune: cur_value } });
  if (changeDisplay) {
    diala3.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeDetune2(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("detune 2 set to " + cur_value + " " + value);
    synth2.set({oscillator: { detune: cur_value } });
  if (changeDisplay) {
    dialb3.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeDelay(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("detune 2 set to " + cur_value + " " + value);
    pingpongdelay.set({ feedback: cur_value });
  if (changeDisplay) {
    dialb6.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function changeDelayTime(amplitude, range, value, changeDisplay) {
  if (value === undefined) {
    console.log("undefined " + value);
  }
  else {
    cur_value = convertTo(amplitude, range,value);
    //console.log("detune 2 set to " + cur_value + " " + value);
    pingpongdelay.set({ delayTime: cur_value });
  if (changeDisplay) {
    dialb6.value = convertTo(1, amplitude,cur_value);
  }
  }
}
function addStep(step_array,played_notes) {
  console.table(step_array);
  step_array[step_array.length+1] = played_notes;
  console.table(step_array);
  updatePoly(step_array);
  return step_array;
}
function addEmptyStep(step_array) {
  step_array[step_array.length+1] = [];
  updatePoly(step_array);
  return step_array;
}
function delStep(step_array) {
  step_array.pop();
  updatePoly(step_array);
  return step_array;
}
function delAllStep(step_array) {
  step_array.splice();
  updatePoly(step_array);
  return step_array;
}
function playAllStep(step_array) {
  console.table(step_array);
  updatePoly(step_array);
}
function convertTo(amplitude, range, value) {
  returnVal = amplitude*value/range;
  // console.log("   " + value +  " / " +  range + " to " + returnVal + " / " + amplitude);
  return returnVal; //.toFixed(3);
}