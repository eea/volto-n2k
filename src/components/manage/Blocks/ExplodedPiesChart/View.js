import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import pieSVG from '@eeacms/volto-n2k/icons/pie.svg';
import './style.less';

import Pie from './Pie';

const getWidth = (items, value_1 = '4', value_2 = '6', value_3 = '12') => {
  if (items.length > 2) return value_1;
  if (items.length === 2) return value_2;
  return value_3;
};

const View = (props) => {
  const { x = null, y = null, y_colors = [] } = props.data;
  const data = props.provider_data || {};
  const x_values = data?.[x] || [];
  const y_values = data?.[y] || [];

  const yColorsObj = {};

  y_colors.forEach((item) => {
    yColorsObj[item.label] = item.color;
  });

  const dataReady =
    data && Object.keys(data).length && x_values.length && y_values.length;

  const total = dataReady ? x_values.reduce((a1, a2) => a1 + a2, 0) : null;

  return (
    <>
      {dataReady ? (
        <Grid className="exploded-pies-chart">
          <div className="tooltip" />
          {x_values?.length > 0
            ? x_values.map((value, index) => (
                <Grid.Column
                  key={`x_${index}`}
                  mobile="12"
                  tablet={getWidth(x_values, 6, 6, 12)}
                  computer={getWidth(x_values, 6, 6, 12)}
                  largeScreen={getWidth(x_values)}
                  widescreen={getWidth(x_values)}
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
                            label: y_values[index],
                            outerRadius: 55,
                            showValue: true,
                            showMouseOver: true,
                            color: yColorsObj[y_values[index]] || '#7BB7F4',
                            filter: '#drop-shadow',
                          },
                        ]}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              ))
            : ''}
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};

export default View;
