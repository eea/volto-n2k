import React, { useState, useRef } from 'react';
import cx from 'classnames';
import ChartContext from './ChartContext';

/**
 * example:
 * <Chart width="100%" height="400px">
 *   <Bars />
 *   <Legend />
 * </Chart>
 */

function Chart(props) {
  const [popup, setPopup] = useState();
  const chartWrapper = useRef();
  const svgRef = useRef();
  const popupRef = useRef();
  const { margin = { top: 20, right: 30, bottom: 70, left: 40 } } = props;

  return (
    <ChartContext.Provider
      value={{
        element: svgRef.current,
        popupElement: popupRef.current,
        height: props.height,
        width: props.width,
        margin,
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

export default Chart;
