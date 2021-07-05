import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import { pack, hierarchy, schemeSpectral } from 'd3';
import * as d3 from 'd3';
import cx from 'classnames';
import { adjustBrightness, getContrastColor } from '@eeacms/volto-n2k/helpers';
import ChartContext from './ChartContext';

function BubbleChart(props) {
  const { x, y, chartData, interpolation } = props;
  const { element, height, width, margin, popup, setPopup } = React.useContext(
    ChartContext,
  );
  const root = pack().size([width, height]).padding(10)(
    hierarchy({ children: chartData })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value),
  );
  const format = d3.format(`.${props.precision || 2}f`);
  const backgroundColor = React.useCallback(
    (value) => {
      if (chartData?.[0]?.maxValue && chartData?.[0]?.minValue) {
        return d3
          .scaleSequential()
          .domain([chartData[0].minValue, chartData[0].maxValue])
          .interpolator(d3[interpolation])(value);
      }
      return '#000';
    },
    /* eslint-disable-next-line */
    [chartData, interpolation],
  );

  return (
    <React.Fragment>
      {root.leaves().map((leaf, index) => {
        const data = leaf.data;
        if (!leaf.r) return '';
        const id = _uniqueId('leaf-');

        return (
          <g
            key={`leaf-${data.name}`}
            style={{
              transform: `translate(${leaf.x}px, ${leaf.y - leaf.r / 2}px)`,
            }}
          >
            <circle
              id={id}
              r={leaf.r}
              fill={
                popup?.id === `${index}_leaf_${data.name}`
                  ? adjustBrightness(backgroundColor(leaf.value), -20)
                  : backgroundColor(leaf.value)
              }
              onFocus={() => {}}
              onBlur={() => {}}
              onMouseMoveCapture={(event) => {
                const elementPosition = element.parentNode.getBoundingClientRect();
                setPopup({
                  id: `${index}_leaf_${data.name}`,
                  clientX: event.clientX - elementPosition.x,
                  clientY: event.clientY - elementPosition.y - 16,
                  content: (
                    <>
                      <p>{data.name}</p>
                      <p>
                        {leaf.value} ({format(data.percentage * 100)}%)
                      </p>
                    </>
                  ),
                });
              }}
              onMouseOut={() => {
                setPopup(null);
              }}
            />
            <text
              className="bubble-text"
              fill={getContrastColor(backgroundColor(leaf.value))}
            >
              <tspan x={0} y={0}>
                {data.name}
              </tspan>
              <tspan x={0} y={'28px'}>
                {leaf.value}
              </tspan>
            </text>
          </g>
        );
      })}
    </React.Fragment>
  );
}
export default BubbleChart;
