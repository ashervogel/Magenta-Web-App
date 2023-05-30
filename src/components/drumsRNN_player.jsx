/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { buildPlayer, startProgram, generatePattern } from '../services/drumsRNN';
import { fetchMidiFile } from '../services/midiFileReader.js';
import { blobToNoteSequence, sequenceProtoToMidi } from '@magenta/music';
import { quantizeNoteSequence } from '@magenta/music/esm/core/sequences';

const styles = [
  {style: 'Punk', filename: 'groove_data/drummer1/session2/62_punk_144_beat_4-4.mid'},
  {style: 'Jazz', filename: 'groove_data/drummer1/session2/5_jazz_200_beat_3-4.mid'},
  {style: 'Jazz Swing', filename: 'groove_data/drummer1/session3/2_jazz-swing_185_beat_4-4.mid'},
  {style: 'Rock', filename: 'groove_data/drummer3/session2/1_rock_100_beat_4-4.mid'},
  {style: 'Hip-Hop', filename: 'groove_data/drummer3/session2/31_hiphop_92_beat_4-4.mid'},
  {style: 'Pop', filename: 'groove_data/drummer7/session3/11_pop-soft_83_beat_4-4.mid'}
]

function DrumsRNNPlayer(props) {
  const [player, setPlayer] = useState(null);
  const [midiFilePath, setMidiFilePath] = useState("");
  const [modelBuilt, setModelBuilt] = useState(false);
  const [influence, setInfluence] = useState(null);
  const [sample, setSample] = useState(null);
  const [sampleLength, setSampleLength] = useState(64);
  const [temperature, setTemperature] = useState(1);

  // start the player
  useEffect(() => {
    setPlayer(buildPlayer());
  }, []);

  function handleStyleChange(event) {
    setMidiFilePath(event.target.value);
    setModelBuilt(false);
    document.getElementById('build-model-check').style.visibility = 'hidden';
    setInfluence(null);
    setSample(null);
    document.getElementById('generation-check').style.visibility = 'hidden';
    document.getElementById('style-picker-check').style.visibility = 'visible';
  }

  async function convertMidiFileToQuantizedNoteSequence(midiFilePath) {
    try {
      const midiFile = await fetchMidiFile(midiFilePath);
      const noteSequence = await blobToNoteSequence(midiFile).then((seq) => quantizeNoteSequence(seq));
      return noteSequence;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function onBuildModelClick() {
    try {
      if (!midiFilePath) {
        document.getElementById('build-model-error-message').style.display = 'block';
        return;
      }
      document.getElementById('build-model-error-message').style.display = 'none';
      convertMidiFileToQuantizedNoteSequence(midiFilePath).then((seq) => setInfluence(seq));
      await startProgram();
      setModelBuilt(true);
      document.getElementById('build-model-check').style.visibility = 'visible';
    } catch (error) {
      throw new Error(error);
    }
  }

  async function generateSample() {
    try {
      if (!modelBuilt) {
        document.getElementById('generate-sample-error-message').style.display = 'block';
        return;
      }
      document.getElementById('generate-sample-error-message').style.display = 'none';
      setSample(await generatePattern(influence, sampleLength, temperature));
      document.getElementById('generation-check').style.visibility = 'visible';
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleSampleLengthChange(event) {
    setSampleLength(parseInt(event.target.value));
  }

  function handleTemperatureChange(event) {
    setTemperature(parseFloat(event.target.value));
  }

  async function playSample() {
    try {
      if (!sample) {
        document.getElementById('play-sample-error-message').style.display = 'block';
        return;
      }
      document.getElementById('play-sample-error-message').style.display = 'none';
      await player.start(sample);
    } catch (error) {
      throw new Error(error);
    }
  }

  // taken from Matt Keating: https://git.dartmouth.edu/music-and-ai/code/-/tree/a2116d4dd595f4a7d0f8effe6e3e27d7d89b2ef1/projects23W/MattKeating_MidiMeMusicVAE
  async function downloadSample() {
    try {
      if (!sample) {
        document.getElementById('download-sample-error-message').style.display = 'block';
        return;
      }
      document.getElementById('download-sample-error-message').style.display = 'none';

      // Taken from https://stackoverflow.com/q/64179468
      const magentaMidi = sequenceProtoToMidi(sample);
      const magentaFile = new Blob([magentaMidi], { type: 'audio/midi' })
      const url = URL.createObjectURL(magentaFile);

      // Taken from https://stackoverflow.com/a/9834261
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'generated-sample.MID';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className='webpage'>
      <h1>Neural Drum Beat Engine</h1>

      <div className='generation-step'>
        <h2>Step 1: Pick a Style</h2>
        <div className='step-and-check-container'>
          <div id='style-options'>
            {
            Object.entries(styles).map(([index, value]) => {
              return <div key={value.style} className='style-option'>
                <input
                  type='radio'
                  value={value.filename}
                  name='style'
                  selected={midiFilePath === value.filename}
                  onChange={ handleStyleChange }
                  className='style-checkbox'
                />
                <label className='style-label'>{value.style}</label>
              </div>
            })}
          </div>
          <img id='style-picker-check' src={'src/img/check.png'} />
        </div>
      </div>

      <div className='generation-step'>
        <h2>Step 2: Build Your Model</h2>
        <div className='step-and-check-container'>
          <div>
            <button id='build-model-button' onClick={ onBuildModelClick }>Build Model</button>
            <p id='build-model-error-message'>Please select a style first</p>
          </div>
          <img id='build-model-check' src={'src/img/check.png'} />
        </div>
      </div>
      
      <div className='generation-step'>
        <h2>Step 3: Adjust Parameters</h2>
        <div className='step-and-check-container'>
          <div>
            <div id='parameter-sliders'>
              <div id='sample-length-slider'>
                <input
                  type="range"
                  min="4"
                  max="100"
                  step="4"
                  value={sampleLength}
                  onChange={handleSampleLengthChange}
                />
                <p>Sample Length: {sampleLength}</p>
              </div>
              <div id='temperature-slider'>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={handleTemperatureChange}
                />
                <p>Temperature: {temperature}</p>
              </div>
            </div>
          </div>
          <img id='parameters-check' src={'src/img/check.png'} />
        </div>
      </div>

      <div className='generation-step'>
        <h2>Step 4: Generate a Sample</h2>
        <div className='step-and-check-container'>
          <div>
            <button id='generate-sample-button' onClick={ generateSample } >Generate Sample</button>
            <p id='generate-sample-error-message'>Please build your model first</p>
          </div>
          <img id='generation-check' src={'src/img/check.png'} />
        </div>
      </div>

      <div className='generation-step'>
        <h2>Step 5: Listen to Your Sample</h2>
        <button id='play-sample-button' onClick={ playSample }>Play Sample</button>
        <p id='play-sample-error-message'>Please generate a sample first</p>
      </div>

      <div className='generation-step'>
        <h2>Step 6: Down MIDI File of Your Sample</h2>
        <button id='download-sample-button' onClick={ downloadSample }>Download Sample</button>
        <p id='download-sample-error-message'>Please generate a sample first</p>
      </div>
    </div>
  );
}


export default DrumsRNNPlayer;