import React, { useMemo } from 'react';
import Chart from './Chart';
import StackedBars from './StackedBars';

import './style.less';

const View = (props) => {
  const [xValues, setXValues] = React.useState([]);
  const [yValues, setYValues] = React.useState({});
  const [yLabels, setYLabels] = React.useState([]);
  const {
    x_label_key = 'country_code',
    y_label_key = 'assessment',
    y_value_key = 'quantity',
  } = props;
  const data = useMemo(() => props.provider_data || {}, [props.provider_data]);

  React.useEffect(() => {
    if (!(data[x_label_key]?.length && data[y_label_key]?.length)) return;
    const yValues = {};
    const total = {};

    data[x_label_key].forEach((x, index) => {
      if (!total[x]) total[x] = 0;
      total[x] += data[y_value_key][index];
    });

    data[x_label_key].forEach((x, index) => {
      const y = data[y_label_key][index];
      if (!yValues[x]) {
        yValues[x] = {
          x,
          total: total[x],
        };
      }
      yValues[x][y] = data[y_value_key][index] / total[x];
    });

    setXValues([...new Set(data[x_label_key])]);
    setYValues(yValues);
    setYLabels([...new Set(data[y_label_key])]);
    /* eslint-disable-next-line */
  }, [x_label_key, y_label_key, y_value_key, data]);

  return (
    <React.Fragment>
      <div className="stacked-bar-chart">
        <Chart
          width={800}
          height={400}
          xDomain={xValues.sort()}
          yDomain={[0, 1]}
        >
          <StackedBars
            data={Object.keys(yValues).map((label) => yValues[label])}
            hoverText={props.data.hoverText}
            keys={yLabels}
          />
        </Chart>
      </div>
    </React.Fragment>
  );
};
export default View;
