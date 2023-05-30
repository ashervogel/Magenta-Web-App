/* eslint-disable no-unused-vars */
import * as Tone from 'tone';
import * as mm from '@magenta/music';
import * as music_rnn from '@magenta/music/es6/music_rnn';
import _ from 'lodash';
import { DrumsConverter } from '@magenta/music/esm/core/data';

const drums_rnn = new music_rnn.MusicRNN("https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn");
const drums_converter = new DrumsConverter(0, 0);

export function buildPlayer() {
  const player = new mm.Player();
  if (player) {
    console.log("Core Player successfully built");
    return player;
  }
  else {
    console.log("Couldn't build Core Player");
    throw new Error("Couldn't build Core Player");
  }
}

export async function startProgram() {
  try {
    await drums_rnn.initialize();
    await Tone.start();
  } catch(error) {
    console.log(`Error starting DrumsRNN program: ${error}`);
    throw new Error(`Error starting DrumsRNN program: ${error}`);
  }
}

export async function generatePattern(seed, steps, temperature) {
  const quantizedSeed = mm.sequences.quantizeNoteSequence(seed, 4);
  const res = await drums_rnn.continueSequence(quantizedSeed, steps, temperature);
  console.log(res);
  return res;
}









// let temperature = 1.0;
// let midiDrums = [36, 38, 42, 46, 41, 43, 45, 49, 51];
// let reverseMidiMapping = new Map([
//   [36, 0],
//   [35, 0],
//   [38, 1],
//   [27, 1],
//   [28, 1],
//   [31, 1],
//   [32, 1],
//   [33, 1],
//   [34, 1],
//   [37, 1],
//   [39, 1],
//   [40, 1],
//   [56, 1],
//   [65, 1],
//   [66, 1],
//   [75, 1],
//   [85, 1],
//   [42, 2],
//   [44, 2],
//   [54, 2],
//   [68, 2],
//   [69, 2],
//   [70, 2],
//   [71, 2],
//   [73, 2],
//   [78, 2],
//   [80, 2],
//   [46, 3],
//   [67, 3],
//   [72, 3],
//   [74, 3],
//   [79, 3],
//   [81, 3],
//   [45, 4],
//   [29, 4],
//   [41, 4],
//   [61, 4],
//   [64, 4],
//   [84, 4],
//   [48, 5],
//   [47, 5],
//   [60, 5],
//   [63, 5],
//   [77, 5],
//   [86, 5],
//   [87, 5],
//   [50, 6],
//   [30, 6],
//   [43, 6],
//   [62, 6],
//   [76, 6],
//   [83, 6],
//   [49, 7],
//   [55, 7],
//   [57, 7],
//   [58, 7],
//   [51, 8],
//   [52, 8],
//   [53, 8],
//   [59, 8],
//   [82, 8]
// ]);





// export async function sampleDrumsRNN(player) {
//   console.log('here');
//   drumsrnn.
//   drumsrnn.sample(1).then(
//     (samps) => {player.start(samps[0]); console.log(samps[0].notes)}
//     ).catch(error => {
//       console.log(`Error sampling from DrumsRNN: ${error}`);
//       throw new Error(`Error sampling from DrumsRNN: ${error}`);
//     });
// }

// function toNoteSequence(pattern) {
//   return mm.sequences.quantizeNoteSequence(
//     {
//       ticksPerQuarter: 220,
//       totalTime: pattern.length / 2,
//       timeSignatures: [
//         {
//           time: 0,
//           numerator: 4,
//           denominator: 4
//         }
//       ],
//       tempos: [
//         {
//           time: 0,
//           qpm: 120
//         }
//       ],
//       notes: _.flatMap(pattern, (step, index) => {
//         console.log(step);
//         console.log(index);
//         step.map(d => ({
//           pitch: midiDrums[d],
//           startTime: index * 0.5,
//           endTime: (index + 1) * 0.5
//         }))}
//       )
//     },
//     1
//   );
// }

// function fromNoteSequence(seq, patternLength) {
//   let res = _.times(patternLength, () => []);
//   for (let { pitch, quantizedStartStep } of seq.notes) {
//     res[quantizedStartStep].push(reverseMidiMapping.get(pitch));
//   }
//   return res;
// }

// export function generatePattern(seed, length) {
//   let seedSeq = toNoteSequence(seed);
//   return drums_rnn
//     .continueSequence(seedSeq, length, temperature)
//     .then(r => seed.concat(fromNoteSequence(r, length)));
// }