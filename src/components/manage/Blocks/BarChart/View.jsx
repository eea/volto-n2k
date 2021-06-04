import React from 'react';
import { Grid } from 'semantic-ui-react';
import * as d3 from 'd3';
import { getObjectByIndex } from '@eeacms/volto-n2k/helpers';
import './style.less';

const View = (props) => {
  const [data, setData] = React.useState({});
  const { x = null, y = null, x_colors = [], precision = 2 } = props.data;
  const provider_data = props.provider_data || {};
  // const x_values = data?.[x] || [];
  // const y_values = data?.[y] || [];
  // const format = d3.format('.2f');

  // const xColorsObj = {};

  // x_colors.forEach((item) => {
  //   xColorsObj[item.label] = item.color;
  // });

  // const dataReady =
  //   data && Object.keys(data).length && x_values.length && y_values.length;

  // const total = dataReady
  //   ? format(y_values.reduce((a1, a2) => a1 + a2, 0))
  //   : null;

  console.log('HERE', provider_data);

  React.useEffect(() => {
    const newData = {};

    // if (provider_data?.country_code) {
    //   provider_data.country_code.forEach((country, index) => {
    //     if (!newData[country]) {
    //       newData[country] = [];
    //     }

    //     newData[country].push(getObjectByIndex(provider_data, index));
    //   });
    // }

    // console.log('HERE', newData);
  }, [JSON.stringify(data)]);

  return 'BAR CHART';
};

export default View;
