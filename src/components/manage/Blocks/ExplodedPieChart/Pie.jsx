import React from 'react';
import * as d3 from 'd3';

// function getTextWidth(text, font) {
//   let canvas =
//     getTextWidth.canvas ||
//     (getTextWidth.canvas = document.createElement('canvas'));
//   let context = canvas.getContext('2d');
//   context.font = font;
//   let metrics = context.measureText(text);
//   return metrics.width;
// }

// function splitText(text, font, maxWidth) {
//   const width = getTextWidth(text, font);
//   if (width > maxWidth) {
//     return splitText(text.substring(0, text.length), font, maxWidth);
//   }
//   return text;
// }

const Arc = ({ data, index, createArc, format, size }) => {
  const arcData = data.data;
  const offsetX = 0;
  const textWidth = arcData.outerRadius
    ? size.width - ((2 * arcData.outerRadius + size.height) / 2 + offsetX)
    : null;

  return (
    <g key={index} className="arc">
      {arcData.showValue && arcData.label ? (
        <g>
          <g transform={`translate(${arcData.outerRadius + offsetX}, 0)`}>
            <text
              textAnchor="end"
              fill="#013C60"
              fontSize="32"
              fontWeight="bold"
              className="arc-text"
              dy="-6"
              x={textWidth}
            >
              {format(arcData.value)}%
            </text>
            <text
              textAnchor="end"
              fill="#013C60"
              fontSize="12"
              fontWeight="bold"
              fontFamily="arial"
              className="arc-text"
              dy="20"
              x={textWidth}
            >
              <tspan>{arcData.label}</tspan>
            </text>
          </g>
          <line
            transform={`translate(${size.outerRadius}, 3)`}
            stroke="#013C60"
            stroke-width="3px"
            x1="0"
            y1="0"
            x2={size.width - (2 * size.outerRadius + size.height) / 2}
            y2="0"
          ></line>
        </g>
      ) : (
        ''
      )}
      <path
        className="arc"
        d={createArc(data)}
        fill={arcData.color}
        filter={arcData.filter ? `url(${arcData.filter})` : ''}
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
    .outerRadius((d) => d.data.outerRadius || props.outerRadius);
  const data = createPie(props.data);
  const format = d3.format('.2f');

  return (
    <svg width={props.width} height={props.height}>
      <defs>
        <filter id="drop-shadow" x="0" y="0" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="1" dy="4" result="offsetblur" />
          <feFlood flood-color="rgba(0, 0, 0, 0.2)" />
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
            }}
          />
        ))}
      </g>
    </svg>
  );
};

export default Pie;
