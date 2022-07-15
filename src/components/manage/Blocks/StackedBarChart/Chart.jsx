import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import ChartContext from './ChartContext';

/**
 * example:
 * <Chart width="100%" height="400px">
 *   <Bars />
 *   <Legend />
 * </Chart>
 */

function Chart(props) {
  const { d3 } = props;
  const { axisBottom, axisLeft, format, select, scaleBand, scaleLinear } = d3;
  const [scales, setScales] = useState();
  const [popup, setPopup] = useState();
  const chartWrapper = useRef();
  const svgRef = useRef();
  const popupRef = useRef();
  const {
    margin = { top: 20, right: 30, bottom: 70, left: 40 },
    xDomain = [],
    yDomain = [],
  } = props;

  useEffect(() => {
    // dispose();
    if (xDomain.length && yDomain.length) {
      makeAxis();
    }
    /* eslint-disable-next-line */
  }, [JSON.stringify(xDomain), JSON.stringify(yDomain)]);

  // const dispose = () => {
  //   const svg = select(svgRef.current);
  //   svg.selectAll('*').remove();
  // };

  const makeAxis = () => {
    const svg = select(svgRef.current);
    //  Scales
    const xScale = scaleBand()
      .domain([...xDomain])
      .range([margin.left, props.width - margin.right])
      .padding(0.25);
    const yScale = scaleLinear()
      .domain(yDomain)
      .rangeRound([props.height - margin.bottom, margin.top]);

    // Axes
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${props.height - margin.bottom})`)
      .call(axisBottom(xScale).tickPadding(6).tickSize(0))
      .call((g) => g.selectAll('.domain').remove());
    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        axisLeft(yScale).tickSize(0).tickPadding(3).tickFormat(format('.0%')),
      )
      .call((g) => g.selectAll('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .attr('x2', props.width - margin.left - margin.right)
          .attr('stroke-opacity', 0.1),
      );
    setScales({
      xScale,
      yScale,
    });
  };

  return (
    <ChartContext.Provider
      value={{
        element: svgRef.current,
        popupElement: popupRef.current,
        height: props.height,
        width: props.width,
        margin,
        scales,
        popup,
        setPopup,
      }}
    >
      <div ref={chartWrapper} className="chart-wrapper">
        <svg
          viewBox={`0 0 ${props.width} ${props.height}`}
          preserveAspectRatio="xMinYMin meet"
          ref={svgRef}
        >
          <g className="x-axis" />
          <g className="y-axis" />
          {props.children}
        </svg>
        <div
          style={
            popup
              ? {
                  top: popup.clientY - 20,
                  left: popup.clientX,
                }
              : {}
          }
          className={cx(
            'chart-popup ui top center popup',
            popup?.content ? 'visible' : {},
          )}
          ref={popupRef}
        >
          <div className="content">{popup ? popup.content : ''}</div>
        </div>
      </div>
    </ChartContext.Provider>
  );
}

export default injectLazyLibs(['d3'])(Chart);
