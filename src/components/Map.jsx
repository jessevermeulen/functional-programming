import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import municipalities from '../data/d3/netherlands-municipalities.json';

const renderMap = async (parkingData) => {
  const width = 800;
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

  function tooltipOver() {
    tooltip.style('visibility', 'visible');
  }

  function tooltipMove(e) {
    tooltip
      .style('left', e.pageX + 10 + 'px')
      .style('top', e.pageY - 10 + 'px');
  }

  function tooltipOut() {
    tooltip.style('visibility', 'hidden');
  }

  let svg = d3
    .select('.map')
    .append('svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height);

  svg.append('g').attr('class', 'map');
  svg.append('g').attr('class', 'points');

  let map = svg.select('g.map').selectAll('path').data(municipalities.features);

  map
    .enter()
    .append('path')
    .attr('d', geoGenerator)
    .on('mouseover', (_, d) => {
      tooltipOver();
      tooltip.html(
        '<span class="tooltip-municipality">Gemeente</span>' +
          d.properties.statnaam
      );
    })
    .on('mousemove', (e) => {
      tooltipMove(e);
    })
    .on('mouseout', () => {
      tooltipOut();
    });

  let points = svg
    .select('g.points')
    .selectAll('circle')
    .data(parkingData.data.features);

  points
    .enter()
    .append('circle')
    .attr('class', (d) => {
      return d.properties.usage.replace(/ /g, '').replace(/&/g, '');
    })
    .attr('cx', (d) => {
      return geoGenerator(d).match(/\d+/g).slice(0, 2).join('.');
    })
    .attr('cy', (d) => {
      return geoGenerator(d).match(/\d+/g).slice(2, 4).join('.');
    })
    .attr('r', '6px')
    .on('mouseover', (_, d) => {
      tooltipOver();
      tooltip.html(
        `<span class="tooltip-${d.properties.usage
          .replace(/ /g, '')
          .replace(/&/g, '')}">${d.properties.usage}</span>` + d.properties.name
      );
    })
    .on('mousemove', (e) => {
      tooltipMove(e);
    })
    .on('mouseout', () => {
      tooltipOut();
    });
};

export default function Map(parkingData) {
  useEffect(() => {
    document.querySelector('.map').innerHTML = '';
    renderMap(parkingData);
  }, [parkingData]);

  return <div className="map"></div>;
}
