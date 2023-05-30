# Magenta Web App
built by Asher Vogel

This web app makes many of Magenta's MusicVAE models, as well as the DrumsRNN, accessible without having to code! It's a React app with no backend - all MIDI files are stored within the repository and the Magenta models are loaded in via import statements. The project consists of two pages, one that provides access to a number of MusicVAE models, and another page that let's you make drum beats with DrumsRNN.

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
* Unable to deploy: Render, my go-to hosting platform, couldn't bundle the magenta packages even though they run locally with no problem.

## Self-Evaluation

<p>
Overall, I'm very proud of the work that I did. The web app is able to produce decent-sounding drum beats with solid variation and stylistic integrity. It's unfortunate that I was unable to figure out how to download the outputs of the generated samples, as an awesome use for the app would have been to export what it generate to a DAW for further editing.
</p>

<p>
I had to over come a number of hurdles just to get the app up and running. The documentation of the Magenta library is rather incomplete and oftentimes leaves you guessing as to how to use its objects and functions. Once I had the models loaded into the React app, however, it was quite fun to play around with them and see what they are capable of.
</p>

## Future Directions

* Fix issues
* Find samples of bass, snare, kick, and other drums sounds to make the Tone player sound better.
* Add functionality to upload your own MIDI file rather than choosing between preselected influences.