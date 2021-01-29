import * as d3 from 'd3';
import parkingSpecifications from '../data/node/parking-specification.json';

function updateBarChart() {
  // Assign data to const and limit objects
  const data = parkingSpecifications.slice(0, 100);

  const svg = d3.select('svg');
  const margin = { top: 48, right: 72, bottom: 220, left: 72 };
  const height = parseInt(svg.style('height'), 10) - margin.top - margin.bottom;
  const width = parseInt(svg.style('width'), 10) - margin.left - margin.right;

  const g = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleBand().padding(0.2);
  const y = d3.scaleLinear();

  setupScales();
  setupAxes(g);
  drawBars(g);
  setupInput();

  // Draw bars
  function drawBars(t) {
    const bars = t
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.capacity))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.capacity));
  }

  // Setup scales
  function setupScales() {
    console.log('setting up scales');
    x.domain(data.map((d) => d.name));
    y.domain([0, d3.max(data.map((d) => d.capacity))]);
    x.rangeRound([0, width]);
    y.rangeRound([height, 0]);
  }

  // Setup axes
  function setupAxes(t) {
    t.append('g')
      .attr('class', 'axis axis-x')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,' + height + ')')
      .selectAll('text')
      .attr('transform', 'rotate(90)')
      .attr('dx', 120)
      .attr('dy', '-.3em');

    t.append('g').attr('class', 'axis axis-y').call(d3.axisLeft(y).ticks(10));
  }

  // Setup toggle button
  function setupInput() {
    console.log('setting up input');
    const input = d3.select('#filter').on('click', filterUnknown);
  }

  // Filter results based on state of toggle button
  function filterUnknown() {
    const filterOn = this ? this.checked : false;
    const dataSelection = filterOn ? data.filter((d) => d.capacity) : data;

    x.domain(dataSelection.map((d) => d.name));
    y.domain([0, d3.max(dataSelection.map((d) => d.capacity))]);

    const bars = g.selectAll('.bar').data(dataSelection);
    console.log(bars);

    bars
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.capacity))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.capacity));

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.capacity))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.capacity));

    bars.exit().remove();

    svg
      .select('.axis-x')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,' + height + ')')
      .selectAll('text')
      .attr('transform', 'rotate(90)')
      .attr('dx', 120)
      .attr('dy', '-.3em');

    svg.select('.axis-y').call(d3.axisLeft(y).ticks(10));
  }
}

updateBarChart();
