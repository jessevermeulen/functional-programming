import * as surveyData from './data/dv-survey.json';

Object.keys(surveyData).map(function (key) {
  let favoriteColor = surveyData[key].lievelingskleur;

  console.log(favoriteColor);
});
