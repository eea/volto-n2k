import React from 'react';
import * as d3 from 'd3';
import { Popup } from 'semantic-ui-react';
import { adjustBrightness } from '@eeacms/volto-n2k/helpers';

const Arc = ({ data, index, createArc, format, size }) => {
  const [mouseOver, setMouseOver] = React.useState(false);
  const arcData = data.data;

  return (
    <g key={index} className="arc">
      {arcData.showValue && arcData.label ? (
        <g>
          <foreignObject
            transform={`translate(-${size.realOuterRadius}, -${size.realOuterRadius})`}
            width="100%"
            height={size.height}
            position="relative"
            x={size.realOuterRadius + size.outerRadius}
          >
            <div
              className="text"
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width: `calc(100% - ${
                  size.realOuterRadius + size.outerRadius
                }px)`,
                height: 2 * size.outerRadius,
              }}
            >
              <p className="value">{format(arcData.value * 100)}%</p>
              <span className="line" />
              <p className="label">{arcData.label}</p>
            </div>
          </foreignObject>
        </g>
      ) : (
        ''
      )}
      <Popup
        content={
          <>
            <p style={{ marginBottom: 0 }}>{format(arcData.value * 100)}%</p>
            <p>{arcData.label}</p>
          </>
        }
        disabled={!arcData.showMouseOver}
        trigger={
          <path
            className="arc"
            d={createArc(data)}
            fill={
              mouseOver ? adjustBrightness(arcData.color, -10) : arcData.color
            }
            filter={arcData.filter ? `url(${arcData.filter})` : ''}
            onFocus={() => {}}
            onBlur={() => {}}
            onMouseOver={(event) => {
              if (arcData.showMouseOver) {
                setMouseOver(true);
              }
            }}
            onMouseOut={() => {
              if (mouseOver) {
                setMouseOver(false);
              }
            }}
          />
        }
      />
    </g>
  );
};

const Pie = (props) => {
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius((d) => d.data.innerRadius || props.innerRadius)
    .outerRadius((d) => d.data.outerRadius || props.outerRadius)
    .startAngle(0)
    .endAngle((d) => d.value * 2 * Math.PI);
  const data = createPie(props.data);
  const format = d3.format(`.${props.precision || 2}f`);

  return (
    <svg width={'100%'} height={props.height}>
      <defs>
        <filter id="drop-shadow" x="0" y="0" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="1" dy="4" result="offsetblur" />
          <feFlood floodColor="rgba(0, 0, 0, 0.2)" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform={`translate(${props.center[0]} ${props.center[1]})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            format={format}
            size={{
              width: props.width,
              height: props.height,
              innerRadius: props.innerRadius,
              outerRadius: props.outerRadius,
              realOuterRadius: props.center[0],
            }}
          />
        ))}
      </g>
    </svg>
  );
};

export default Pie;
