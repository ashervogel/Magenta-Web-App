
// Music and AI, 2023
// Dartmouth College
// CS 89/189 MUS14
// Original author: Prof. Michael Casey
// Adapted by: Asher Vogel - written as pure JavaScript module

// music conversion functions, Magenta and SonicPI
// Node.js v18.12.1
//
// Convert between: QuantizedNoteSequence <--> SonicPI lists
//
// exported functions:
//
// to_magenta(pitches, durations, bpm=120, timesig=[4,4], ticksPerQuarter=220)
//     pitches   - [p1,p2,...,pm]
//     durations - [d1,d2,...,dn]
//     optional bpm and time sig [4,4]
// returns:
//     QuantizedNoteSequence
//
// to_sonicpi(sequence)
//     sequence  - QuantizedNoteSequence
// returns:
//     pitches, durations - SonicPI lists
//
// Author: Michael A. Casey and Asher Vogel, Dartmouth College, CS Dept., 2023


// removed bpm as parameter
export function to_magenta(pitches, durations, timesig=[4,4], ticksPerQuarter=220) {
  if (pitches.length != durations.length) {
    throw Error("pitches.length != durations.length: "+pitches.length+" != "+durations.length);
  }
  let sequence = {
    ticksPerQuarter: ticksPerQuarter,
    totalTime: 0.0,
    timeSignatures: [{time: 0, numerator: timesig[0], denominator: timesig[1]}],
    tempos: [{time: 0, qpm: 120}],
    notes: [ ]
  };
  let s = 0;
  for(let i = 0; i < pitches.length; i++){
    let d = durations[i];
    sequence.notes.push({pitch: pitches[i], startTime: s, endTime: s+d});
    s += d;
  }
  sequence.totalTime = s;
  console.log(sequence);
  return sequence;
}

export function to_sonic_pi(sequence) {
  console.log(sequence);
  const stepDur = 60.0 / (sequence.tempos[0].qpm * sequence.quantizationInfo.stepsPerQuarter);
  let pitches = [];
  let starts = [];
  let durations = [];
  for (let n of sequence.notes){
    pitches.push(n.pitch);
    starts.push(n.quantizedStartStep*stepDur);
    durations.push(n.quantizedEndStep*stepDur - n.quantizedStartStep*stepDur);
  }
  return {pitches:pitches, starts:starts, durations:durations}
}