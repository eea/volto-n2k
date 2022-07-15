import React from 'react';
import { Grid } from 'semantic-ui-react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import Pie from './Pie';

import './style.less';

const View = (props) => {
  const { d3, placeholder = 'No results' } = props;
  const { x = null, y = null, x_colors = [], precision = 2 } = props.data;
  const data = props.provider_data || {};
  const x_values = data?.[x] || [];
  const y_values = data?.[y] || [];
  const format = d3.format('.2f');

  const xColorsObj = {};

  x_colors.forEach((item) => {
    xColorsObj[item.label] = item.color;
  });

  const dataReady =
    data && Object.keys(data).length && x_values.length && y_values.length;

  const total = dataReady
    ? format(y_values.reduce((a1, a2) => a1 + a2, 0))
    : null;

  return (
    <>
      {dataReady ? (
        <Grid className="exploded-pies-chart">
          {y_values?.length > 0
            ? y_values.map((value, index) => (
                <Grid.Column
                  key={`x_${index}`}
                  mobile="12"
                  tablet="6"
                  computer="4"
                  largeScreen="4"
                  widescreen="4"
                  className="pie-column"
                >
                  <Grid>
                    <Grid.Column>
                      <Pie
                        width={320}
                        height={120}
                        innerRadius={0}
                        outerRadius={44}
                        center={[60, 60]}
                        data={[
                          { value: 1, color: '#EAEAEA' },
                          {
                            value: value / total,
                            label: x_values[index],
                            outerRadius: 55,
                            shadow: 5,
                            showValue: true,
                            showMouseOver: true,
                            color: xColorsObj[x_values[index]] || '#7BB7F4',
                            filter: '#drop-shadow',
                          },
                        ]}
                        precision={precision}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              ))
            : ''}
        </Grid>
      ) : (
        <p>{placeholder}</p>
      )}
    </>
  );
};

export default injectLazyLibs(['d3'])(View);
