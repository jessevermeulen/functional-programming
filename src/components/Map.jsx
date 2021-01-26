import React, { useEffect } from 'react';
import * as d3 from 'd3';
import municipalities from '../data/d3/netherlands-municipalities.json';
import sellingPoints from '../data/node/selling-points.json';

const cities = [
  `'s-Hertogenbosch`,
  'Amsterdam',
  'Arnhem',
  'Breda',
  'Delft',
  'Groningen',
];

export default function Map() {
  useEffect(() => {
    const width = 1000;
    const height = width;
    const scale = width * 10;
    const center = d3.geoCentroid(municipalities);
    const offset = [width / 2, height / 2];

    const projection = d3
      .geoMercator()
      .scale(scale)
      .center(center)
      .translate(offset);

    const geoGenerator = d3.geoPath().projection(projection);

    let tooltip = d3.select('.map').append('span').attr('class', 'tooltip');

    let svg = d3
      .select('.map')
      .append('svg')
      // .attr('width', width)
      // .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height);

    svg.append('g').attr('class', 'map');
    svg.append('g').attr('class', 'points');

    let map = svg
      .select('g.map')
      .selectAll('path')
      .data(municipalities.features);

    map
      .enter()
      .append('path')
      .attr('d', geoGenerator)
      // .style('fill', (d) => {
      //   if (cities.includes(d.properties.statnaam)) {
      //     return '#3859bc';
      //   }
      // })
      .on('mouseover', (_, d) => {
        return tooltip
          .style('visibility', 'visible')
          .html(d.properties.statnaam);
      })
      .on('mousemove', (e) => {
        return tooltip
          .style('left', e.pageX + 10 + 'px')
          .style('top', e.pageY - 10 + 'px');
      })
      .on('mouseout', () => {
        return tooltip.style('visibility', 'hidden');
      });

    let points = svg
      .select('g.points')
      .selectAll('circle')
      .data(sellingPoints.features);

    points
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return geoGenerator(d).match(/\d+/g).slice(0, 2).join('.');
      })
      .attr('cy', (d) => {
        return geoGenerator(d).match(/\d+/g).slice(2, 4).join('.');
      })
      .attr('r', '6px')
      .on('mouseover', (_, d) => {
        return tooltip
          .style('visibility', 'visible')
          .html('Parkeerplaats: ' + d.properties.name);
      })
      .on('mousemove', (e) => {
        return tooltip
          .style('left', e.pageX + 10 + 'px')
          .style('top', e.pageY - 10 + 'px');
      })
      .on('mouseout', () => {
        return tooltip.style('visibility', 'hidden');
      });
  }, []);

  return (
    <section>
      <div className="map"></div>
    </section>
  );
}
