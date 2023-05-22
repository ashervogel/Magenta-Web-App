/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { buildPlayer, buildModel, startProgram, sampleMVAE } from '../services/musicVAE';

// eslint-disable-next-line no-unused-vars
function MusicVAEPlayer(props) {

  // descriptions paraphrased from: https://github.com/magenta/magenta-js/blob/master/music/checkpoints/README.md
  const drumModels = {
    "drums_2bar_lokl_small": "simple 2-bar, 9-class onehot drum model - good for sampling",
    "drums_2bar_hikl_small": "simple 2-bar, 9-class onehot drum model - good for reconstructions and interpolations",
    "drums_2bar_nade_9_q2": "2-bar, 9-class multilabel drum model with NADE decoder",
    "drums_4bar_med_q2": "larger 4-bar, 9-class onehot drum model - good for reconstructions and interpolations",
    "drums_4bar_med_lokl_q2": "larger 4-bar, 9-class onehot drum model - good for sampling",
  };

  const melodyModels = {
    "mel_2bar_small": "simple 2-bar, 90-class onehot melody model",
    "mel_4bar_med_lokl_q2": "larger 4-bar, 90-class onehot melody model - good for sampling",
    "mel_4bar_small_q2": "simple 4-bar, 90-class onehot melody model",
    // "mel_chords": "simple 2-bar, 90-class onehot melody model with chord conditioning",
    "mel_16bar_small_q2": "simple 16-bar, 90-class onehot melody model with 16-step conductor level"
  };

  const trioModels = {
    "trio_4bar": "simple 4-bar trio model - good for sampling",
    "trio_16bar": "massive 16-bar trio model - good for reconstruction and sampling - ONLY RUN LOCALLY"
  }

  const multitrackModels = {

  }

  const allModels = {
    drumModels: {
      name: "Drum Models",
      models: drumModels
    },
    melodyModels: {
      name: "Melody Models",
      models: melodyModels
    },
    trioModels: {
      name: "Trio Models (Melody, Bass, and Drums)",
      models: trioModels
    }
  }


  const [player, setPlayer] = useState(null);
  const [modelName, setModelName] = useState(null);

  useEffect(() => {
    setPlayer(buildPlayer())
  }, []);

  const onModelClick = (event) => {
    setModelName(event.target.value);
  }

  async function onSampleClick() {
    console.log("bulding model");
    const model = await buildModel(modelName);
    console.log("starting program");
    startProgram(model).then(() => sampleMVAE(model, player))
  }


  return (
    <div>
      <div className="model-selector-div">
        <h1>Step 1: Select a Model</h1>
        {Object.entries(allModels).map(([model_type, model_type_info]) => (
          <div key={model_type}>
            <h2>{model_type_info.name}</h2>
            {Object.entries(allModels[model_type].models).map(([model_key, model_title]) => (
              <div key={model_key}>
                <input
                type='radio'
                name='model_selector'
                value={model_key}
                checked={modelName === model_key}
                onChange={onModelClick}
              />
              <label>{model_title}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button id='sample-button' onClick={ onSampleClick } >Sample MVAE</button>
      </div>
    </div>
  );
}


export default MusicVAEPlayer;