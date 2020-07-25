import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleChart = props => {
  const ref = useRef(null);

  // For wrapping long text labels
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr("dy", "1em")
                        .text(word);
          }
        }
    });
  }

  useEffect(
    () => {
      // Remove any current svgs before starting
      d3.select('svg').remove()

      const data = props.data;

      const width = 650;
      const height = 550;

      const pack = d3.pack()
        .size([width - 2, height - 2])
        .padding(3)

      // Process data to have a hierarchy structure
      const root = d3.hierarchy({ children: data })
        .sum(d => { return d.value })
      
      const bubbleDemo = d3.select(ref.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('max-width', width)
        .style('max-height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
      
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Pass data to pack
      const nodes = pack(root).leaves()
      
      const node = bubbleDemo.selectAll('.node')
        .data(nodes).enter()
        .append('g')
        .attr('transform', d => {
          return `translate(${d.x}, ${d.y})`
        })
      
      node.append('circle')
        .transition()
        .duration(800)
        .attr('r', d => d.r)
        .attr('fill-opacity', 0.7)
        .attr('fill', d => color(d.data.artist))
        
      node.append('text')
        .attr('opacity', 0)
        .text(d => {
          return `${d.data.artist}`
        })
        .attr('text-anchor', 'middle')
        .style('fill', '#183a24')
        .attr('font-size', '20px')
        .attr('font-weight', '700')
        .attr('transform', `translate(0, 5)`)
        .transition()
        .duration(1500)
        .attr('opacity', 1)
        .attr('class', 'bubbleArtistText')
        .call(wrap, 120);
      
      node.append('text')
        .attr('opacity', 0)
        .text(d => {
          return `${d.data.value}`
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.1rem')
        .attr('transform', `translate(0, -15)`)
        .style('fill', '#FFF')
        .transition()
        .duration(1500)
        .attr('opacity', 1)
      
    },
    [props.data]
  );

  return (
    <div id='bubbleChart' className='chart' ref={ref}></div>
  )
}

export default BubbleChart;