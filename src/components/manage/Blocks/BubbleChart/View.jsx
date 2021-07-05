import React from 'react';
import Chart from './Chart';
import BubbleChart from './BubbleChart';

import './style.less';

const View = (props) => {
  const [chartData, setChartData] = React.useState([]);
  const { x, y, interpolation = 'interpolateBlues' } = props.data;
  const data = props.provider_data || {};

  React.useEffect(() => {
    if (!x || !y || !data[x]?.length || !data[y]?.length) return;
    let total = 0;
    let maxValue = -Infinity;
    let minValue = Infinity;
    data[x].forEach((value) => {
      total += value;
      if (value > maxValue) {
        maxValue = value;
      }
      if (value < minValue) {
        minValue = value;
      }
    });
    setChartData([
      ...data[x].map((_, index) => ({
        name: data[y][index],
        value: data[x][index],
        percentage: data[x][index] / total,
        maxValue,
        minValue,
      })),
    ]);
    /* eslint-disable-next-line */
  }, [x, y, data]);

  if (__SERVER__) return '';
  return (
    <React.Fragment>
      <div className="bubble-chart">
        <Chart width={800} height={800}>
          <BubbleChart
            x={x}
            y={y}
            chartData={chartData}
            interpolation={interpolation}
          />
        </Chart>
      </div>
    </React.Fragment>
  );
};
export default View;
