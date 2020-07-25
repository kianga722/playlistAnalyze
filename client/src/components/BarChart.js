import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = props => {
  const ref = useRef(null);
  
  useEffect(
    () => {
      // Remove any current svgs before starting
      d3.select('svg').remove()
      
      const data = props.data;

      const margin = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 250
      }
      const barThickness = 40;

      const width = 500;
      const height = ((barThickness + 10) * data.length);

      const widthInner = width - margin.left - margin.right;
      const heightInner = height - margin.top - margin.bottom;

      // Enclosing canvas
      const barDemo = d3.select(ref.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('max-width', width)
        .style('max-height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // Scales
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => {
          return d.value
        })])
        .range([0, widthInner])

      const y = d3.scaleBand()
        .range([0, heightInner])
        .domain(data.map(d => { return d.artist }))
        .padding(.1)
    
      // Y Axis Artist Names
      barDemo.append('g')
        .call(d3.axisLeft(y).tickSize(0))
        .call(g => g.select('.domain').remove())
        .attr('font-size', '1.3rem')
        .attr('font-weight', '700')
      
      // Bars
      barDemo.selectAll('rect')
        .data(data).enter()
        .append('rect')
        .attr('x', x(0))
        .attr('y', (d) => { return y(d.artist) })
        .attr('width', 0)
        .attr('height', y.bandwidth())
        .attr('fill', '#1db954')
        .attr('transform', `translate(5, 0)`)
     
      // Count
      barDemo.append('g').selectAll('text')
        .data(data).enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d) => { return y(d.artist) })
        .attr('dx', 10)
        .attr('dy', (barThickness / 2)+5)
        .text(d => { return d.value })
        .attr('fill', '#2d46b9')
        .attr('font-weight', '700')
      
      // Animation
      barDemo.selectAll('rect')
        .transition()
        .duration(800)
        .attr('width', d => { return x(d.value) })
      
      barDemo.selectAll('text')
        .transition()
        .duration(800)
        .attr('x', d => { return x(d.value) })
        
      
    },
    [props.data]
  );

  return (
    <div id='barChart' className='chart' ref={ref}></div>
  )
}

export default BarChart;