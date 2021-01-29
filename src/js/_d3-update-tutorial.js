function updateText() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const width = 960;
  const height = 500;

  const svg = d3.select('svg').attr('width', width).attr('height', height);
  const g = svg
    .append('g')
    .attr('transform', 'translate(32, ' + height / 2 + ')');

  function update(data) {
    const t = d3.transition().duration(750);

    const text = g.selectAll('text').data(data, (d) => {
      return d;
    });

    text
      .exit()
      .attr('class', 'exit')
      .transition(t)
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .remove();

    text
      .attr('class', 'update')
      .attr('y', 0)
      .style('fill-opacity', 1)
      .transition(t)
      .attr('x', (_, i) => {
        return i * 32;
      });

    text
      .enter()
      .append('text')
      .attr('class', 'enter')
      .attr('dy', '.35em')
      .attr('y', -60)
      .attr('x', (_, i) => {
        return i * 32;
      })
      .style('fill-opacity', 1e-6)
      .text((d) => {
        return d;
      })
      .transition(t)
      .attr('y', 0)
      .style('fill-opacity', 1);
  }

  update(alphabet);

  d3.interval(() => {
    update(
      d3
        .shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort()
    );
  }, 1500);
}

updateText();