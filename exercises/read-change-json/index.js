import { surveyData } from "./data/dv-survey";

const data = Object.keys(surveyData);

const formatValues = () => {
  const getValues = data.map((key) => {
     const favColors = surveyData[key].lievelingskleur;
     favColors.toLowerCase()

     if (favColors.length == 0) {
       favColors.replace('',)
     }
      // .toLowerCase()
      // .replace(undefined, '#000000')
      return favColors
  });

  return getValues;
};

console.log(formatValues());

// console.log();

// Object.keys(surveyData).map(function (key) {
// const favColor = surveyData;

// console.log(favColor)
// })
// const data = Object.values(surveyData);
// const data = Object.keys(surveyData));

// for (const keys of data) {
//   console.log(keys)
// }

// console.log(data);

// function getColor() {
// const colors = Object.keys(data);

// for (const keys of data) {
// console.log(keys)
// }
// const allColors = data.map(x => )
// console.log(colors)
// return getColor;
// }
// console.log(getColor());

// let vals = [4, 8, 1, 2, 9];
// console.log(vals);

// vals = vals.map(x => x * 2);
// console.log(vals)
// console.log(val);
// console.log(surveyData)

// Object.keys(SURVEY_DATA).map(function (key) {
//   let favoriteColor = SURVEY_DATA[key].lievelingskleur;

//   console.log(favoriteColor);
// });

// const data = surveyData.filter()

// for (let key in surveyData) {
//   console.log(surveyData[key]);
//   surveyData.filter()
// }

// Create filter
// const filterItems = surveyData.map(key => {
//   'use strict'

//   // console.log(key)
//   // console.log(data)
// });

// Get data
// let data = surveyData.map(function(num) {
//   return num;
// })

// for (const [key, value] of Object.entries(surveyData)) {
//   console.log([key, value])
// }

// const data = Object.values(surveyData);

// console.log(data[0]);
// console.log(getData());
// const myArr = Object

// console.log(data)

// console.log(surveyData);

// filterItems(surveyData, 'lievelingskleur');

// console.log(filterItems(lievelingskleur))
