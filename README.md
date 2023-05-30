# Magenta Web App
built by Asher Vogel

This web app makes many of Magenta's MusicVAE models, as well as the DrumsRNN, accessible without having to code!

## Usage

This web app is currently only available to run locally. To use it, follow these steps:

1. clone the repository: `git clone git@github.com:ashervogel/Magenta-Web-App.git`
2. install dependencies: `npm install`
3. run locally: `npm run dev`

## Credits

1. [Matt Keating's MidiMe Web App](https://git.dartmouth.edu/music-and-ai/code/-/blob/a2116d4dd595f4a7d0f8effe6e3e27d7d89b2ef1/projects23W/MattKeating_MidiMeMusicVAE/Magenta.html)

2. Training Data: 
<p>
  Jon Gillick, Adam Roberts, Jesse Engel, Douglas Eck, and David Bamman. <br>
  "Learning to Groove with Inverse Sequence Transformations." <br>
    International Conference on Machine Learning (ICML), 2019. </p>
    
3. [Magenta Music](https://magenta.github.io/magenta-js/music/)

## Issues

* The MIDI files that the DrumsRNN page downloads don't work properly. I pulled this code from Matt Keating's `download()` function but couldn't figure out why it doesn't work with my code
* Unable to deploy; Render, how go-to hosting platform, couldn't bundle the magenta packages even though they run locally with no problem.

## Future Directions

* Find samples of bass, snare, kick, and other drums sounds to make the Tone player sound better.
* Upload your own MIDI file rather than choosing between preselected influences.