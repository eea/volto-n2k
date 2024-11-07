import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { adjustBrightness, getContrastColor } from '@eeacms/volto-n2k/helpers';
import { FormattedValue } from '@eeacms/volto-datablocks/Utils';
import ChartContext from './ChartContext';

function BubbleChart(props) {
  const { d3, chartData, interpolation } = props;
  const { element, height, width, popup, setPopup } =
    React.useContext(ChartContext);
  const root = d3.pack().size([width, height]).padding(10)(
    d3
      .hierarchy({ children: chartData })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value),
  );
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
              transform: `translate(${leaf.x}px, ${leaf.y}px)`,
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
                const elementPosition =
                  element.parentNode.getBoundingClientRect();
                setPopup({
                  id: `${index}_leaf_${data.name}`,
                  clientX: event.clientX - elementPosition.x,
                  clientY: event.clientY - elementPosition.y - 16,
                  content: (
                    <>
                      <p>{data.name}</p>
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
                <FormattedValue
                  value={data.name}
                  textTemplate={props.data.yTextTemplate}
                  specifier={props.data.ySpecifier}
                  wrapped={false}
                />
              </tspan>
              <tspan x={0} y={'28px'}>
                <FormattedValue
                  value={data.value}
                  textTemplate={props.data.xTextTemplate}
                  specifier={props.data.xSpecifier}
                  wrapped={false}
                />
              </tspan>
            </text>
          </g>
        );
      })}
    </React.Fragment>
  );
}
export default injectLazyLibs(['d3'])(BubbleChart);
