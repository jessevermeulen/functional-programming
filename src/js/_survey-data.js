import { surveyData } from '../data/node/dv-survey';

const data = surveyData;

// Reformat eye colors to hexadecimal color format
function transformEyeColor(key) {
  const transformValue = data
    .map((e) => {
      return e[key]
        .toLowerCase()
        .replace(' ', '')
        .replace('blauw', '#0000ff')
        .replace('bruin', '#a52a2a')
        .replace('groen', '#008000')
        .replace('rgb(139.69,19)', '#8b4513')
        .replace('licht#0000ff', '#add8e6');
    })

    // Check if a hashtag is present, if not; add one in front of the string
    .map((e) => {
      return !e.includes('#') ? '#' + e : e;
    });

  return transformValue;
}

console.log(transformEyeColor('oogKleur'));
