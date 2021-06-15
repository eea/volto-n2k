import React from 'react';
import { scaleOrdinal, schemeSpectral, stack } from 'd3';
import cx from 'classnames';
import { adjustBrightness } from '@eeacms/volto-n2k/helpers';
import ChartContext from './ChartContext';

const getSerieData = (serie) => {
  return Object.keys(serie)
    .filter((key) => !['index', 'key'].includes(key))
    .map((key) => serie[key]);
};

function StackedBars(props) {
  const { height, width, margin, scales, popup, setPopup } = React.useContext(
    ChartContext,
  );
  const { data = {}, keys = [] } = props;

  if (!keys?.length || !scales?.xScale || !scales?.yScale) {
    return <></>;
  }

  const series = stack()
    .keys(keys)(data)
    .map((d) => {
      d.forEach((v) => (v.key = d.key));
      return d;
    });
  const color = scaleOrdinal()
    .domain(series.map((d) => d.key))
    .range(
      ['#70AD47', '#ED7D31', '#FF3F3F', '#AFABAB'] ||
        schemeSpectral[series.length],
    )
    .unknown('#ccc');

  return (
    <React.Fragment>
      {series?.map((serie, serieIndex) => {
        return (
          <g key={serie.key} className={cx('serie', serie.key)}>
            {getSerieData(serie).map((rect, rectIndex) => {
              return (
                <rect
                  key={`${serie.key}_${serieIndex}_${rectIndex}`}
                  className={cx(rect.key)}
                  fill={
                    popup?.id === `${serieIndex}_${rectIndex}_${rect.key}`
                      ? adjustBrightness(color(serie.key), -20)
                      : color(serie.key)
                  }
                  x={scales.xScale(rect.data.x)}
                  y={scales.yScale(rect[1])}
                  height={scales.yScale(rect[0]) - scales.yScale(rect[1]) || 0}
                  width={scales.xScale.bandwidth()}
                  onFocus={() => {}}
                  onBlur={() => {}}
                  onMouseMoveCapture={(event) => {
                    setPopup({
                      id: `${serieIndex}_${rectIndex}_${rect.key}`,
                      clientX: event.clientX,
                      clientY:
                        event.clientY + document.documentElement.scrollTop,
                      content: (
                        <>
                          <p>{rect.data[rect.key] * rect.data.total} Forests</p>
                        </>
                      ),
                    });
                  }}
                  onMouseOut={() => {
                    setPopup(null);
                  }}
                />
              );
            })}
          </g>
        );
      })}
      <foreignObject
        width={width - margin.left - margin.right}
        height="12px"
        position="relative"
        x={margin.left}
        y={height - 40}
      >
        <div className="legend-wrapper" xmlns="http://www.w3.org/1999/xhtml">
          {series?.map((serie, serieIndex) => (
            <div
              key={`legend_${serie.key}`}
              className={cx('legend', serie.key)}
            >
              <span
                className={'square'}
                style={{ background: color(serie.key) }}
              />
              <p>{serie.key}</p>
            </div>
          ))}
        </div>
      </foreignObject>
    </React.Fragment>
  );
}
export default StackedBars;
