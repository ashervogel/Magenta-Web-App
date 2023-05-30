/* eslint-disable no-unused-vars */
import * as Tone from 'tone';
import * as tf from '@tensorflow/tfjs';
import * as core from '@magenta/music'
import * as mvae from '@magenta/music/es6/music_vae'

export function buildPlayer() {
  const player = new core.Player();
  if (player) {
    console.log("Core Player successfully built");
    return player;
  }
  else {
    console.log("Couldn't build Core Player");
    throw new Error("Couldn't build Core Player");
  }
}

export function buildModel(model_URL) {
  console.log(model_URL);
  const model = new mvae.MusicVAE(model_URL);
  if (model) {
    console.log("Music VAE model successfully built");
    console.log(model);
    return model;
  } 
  else {
    console.log("Couldn't build Music VAE model");
    throw new Error("Couldn't build Music VAE model");
  }
}

export async function sampleMVAE(mvae, player) {
  mvae.sample(1).then(
    (samps) => {player.start(samps[0]); console.log(samps[0].notes)}
    ).catch(error => {
      console.log(`Error sampling from Music VAE: ${error}`);
      throw new Error(`Error sampling from Music VAE: ${error}`);
    });
}

export async function startProgram(model) {
  try {
    await model.initialize();
    await Tone.start();
    console.log(model);
  } catch(error) {
    console.log(`Error starting music VAE program: ${error}`);
    throw new Error(`Error starting music VAE program: ${error}`);
  }
  
}