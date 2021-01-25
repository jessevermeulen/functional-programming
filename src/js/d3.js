import * as d3 from 'd3';
import municipalities from '../data/d3/netherlands-municipalities.json';
import sellingPoints from '../data/node/selling-points.json';

const width = 600;
const height = 800;
const scale = 7000;

const renderMap = d3
  .select('.map')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g');

const sellingPoints = d3.select('.map').append('g');

const center = d3.geoCentroid(municipalities);
const offset = [width / 2, height / 2];
const projection = d3
  .geoMercator()
  .scale(scale)
  .center(center)
  .translate(offset);

const geoGenerator = d3.geoPath().projection(projection);

function update(municipalities) {
  const u = d3
    .select('.map svg g')
    .selectAll('path')
    .data(municipalities.features);

  u.enter().append('path').attr('d', geoGenerator);
}

update(municipalities);

// var center = d3.geoCentroid(municipalities);

// var projection = d3.geoMercator().center(center).scale(7000);

// var geoGenerator = d3.geoPath().projection(projection);

// Join the FeatureCollection's features array to path elements
// var u = d3
//   .select('#content g.map')
//   .selectAll('path')
//   .data(municipalities.features);

// Create path elements and update the d attribute using the geo generator
// u.enter().append('path').attr('d', geoGenerator);
