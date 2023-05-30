/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { buildPlayer, buildModel, startProgram, sampleMVAE } from '../services/musicVAE';
import music_VAE_Models from '../../music_vae_models.json'

// eslint-disable-next-line no-unused-vars
function MusicVAEPlayer(props) {
  const [player, setPlayer] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    setPlayer(buildPlayer())
  }, []);

  async function onModelClick(event) {
    setModelUrl(event.target.value);
    setModel(await buildModel(event.target.value));
    document.getElementById('no-style-error-message').style.display = 'none';
    document.getElementById('issue-with-model-error-message').style.display = 'none';
    document.getElementById('build-model-check').style.visibility = 'hidden';
  }

  async function onBuildModelClick() {
    try {
      if (!modelUrl) {
        document.getElementById('no-style-error-message').style.display = 'block';
        return;
      }
      document.getElementById('no-style-error-message').style.display = 'hidden';
      await startProgram(model);
      document.getElementById('build-model-check').style.visibility = 'visible';
    } catch (error) {
      document.getElementById('issue-with-model-error-message').style.display = 'block';
      throw new Error(error);
    }
    
  }

  async function onSampleClick() {
    console.log(model);
    if (model.initialized) {
      sampleMVAE(model, player);
    }
  }

  if (!music_VAE_Models) {
    return <div>Loading...</div>
  }

  return (
    <div className='webpage'>
      <div>
        <h1>Step 1: Select a Model</h1>
        {music_VAE_Models.map(((value) => {
          // if (value.size_mb < 200) {
          return <div key={value.id}>
            <input
              type='radio'
              name='model-selector'
              value={value.url}
              checked={modelUrl === value.url}
              onChange={onModelClick}
            />
            <label>{value.description}</label>
          </div>
          // }
        }))
        }
      </div>

      <div>
        <h1>Step 2: Build the Model</h1>
        <div className='step-and-check-container'>
          <div>
            <button id='build-model-button' onClick={ onBuildModelClick }>Build Model</button>
            <p id='no-style-error-message'>Please select a style first</p>
            <p id='issue-with-model-error-message'>This model is currently unavailable.</p>
          </div>
          <img id='build-model-check' src={'src/img/check.png'} />
        </div>
      </div>

      <div>
        <h1>Step 3: Sample</h1>
        <button id='sample-button' onClick={ onSampleClick } >Sample</button>
      </div>
    </div>
  );
}


export default MusicVAEPlayer;