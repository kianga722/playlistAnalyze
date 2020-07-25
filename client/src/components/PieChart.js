import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = props => {
  const ref = useRef(null);

  useEffect(
    () => {
      // Remove any current svgs before starting
      d3.select('svg').remove()
      
      const data = props.data;

      const width = 600;
      const height = 500;
      const radius = Math.min(width, height) / 2;

      const pieDemo = d3.select(ref.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('max-width', width)
        .style('max-height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`)
      
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      
      // Generate pie
      const pie = d3.pie().value(d => { return d.value })

      // Generate arcs
      const arc = d3.arc()
        .innerRadius(80)
        .outerRadius(radius)
      
      // Labels
      const label = d3.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius)
      
      // Generate groups
      const arcs = pieDemo.selectAll('arc')
        .data(pie(data)).enter()
        .append('g')
        .attr('class', 'arc')
      
      // Draw arc paths with animation
      arcs.append('path')
        .attr('stroke', 'white')
        .attr('fill', (d, i) => color(i))
        .transition()
        .duration(800)
        .attrTween('d', d => {
          let i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
          return t => {
            d.endAngle = i(t)
            return arc(d)
          }
        })
      
      // Arc Labels
      arcs.append('text')
        .transition()
        .duration(800)
        .attr('transform', d => {
          return `translate(${label.centroid(d)[0]}, ${label.centroid(d)[1]})`
        })
        .text(d => { return `${d.data.artist}` })
        .attr('font-size', '1.3rem')
        .attr('font-weight', 'bold')
        .style('fill', '#183a24')
        .attr("text-anchor", "middle")
        

      arcs.append('text')
        .transition()
        .duration(800)
        .attr('transform', d => {
          return `translate(${label.centroid(d)[0]}, ${label.centroid(d)[1] + 20})`
        })
        .text(d => { return `${d.data.value}` })
        .attr('font-size', '1.1rem')
        .style('fill', '#FFF')
        .attr("text-anchor", "middle")
      
      // Tooltip for cutoff labels
      const toolTip = d3.select(ref.current)
        .append('div')
        .attr('class', 'toolTip')
      
      // Disable tooltip for now
      // d3.selectAll('path').on('mousemove', d => {
      //   toolTip.style("left", d3.event.pageX+10+"px");
      //   toolTip.style("top", d3.event.pageY-25+"px");
      //   toolTip.style("display", "inline-block");
      //   toolTip.html((d.data.artist)+"<br>"+(d.data.value));
      // })

      // d3.selectAll("path").on("mouseout", d => {
      //   toolTip.style("display", "none");
      // });

    }
  )

  return (
    <div id='pieChart' className='chart' ref={ref}></div>
  )
}

export default PieChart;