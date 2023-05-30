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
  }

  async function onBuildModelClick() {
    await startProgram(model);
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
      <button id='build-model-button' onClick={ onBuildModelClick }>Build Model</button>
      <button id='sample-button' onClick={ onSampleClick } >Sample</button>
    </div>
  );
}


export default MusicVAEPlayer;