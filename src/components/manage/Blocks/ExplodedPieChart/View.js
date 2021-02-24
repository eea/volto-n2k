import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import pieSVG from '@eeacms/volto-n2k/icons/pie.svg';
import './style.less';

import Pie from './Pie';

const View = (props) => {
  const { x = null, y = null, y_colors = [] } = props.data;
  const data = props.provider_data || {};
  const x_values = data?.[x];
  const y_values = data?.[y];

  const yColorsObj = {};

  y_colors.forEach((item) => {
    yColorsObj[item.label] = item.color;
  });

  const dataReady =
    data && Object.keys(data).length && x_values.length && data[y].length;

  const total = dataReady ? x_values.reduce((a1, a2) => a1 + a2, 0) : null;

  return (
    <>
      {dataReady ? (
        <Grid className="exploded-pies-chart">
          {x_values?.length > 0
            ? x_values.map((value, index) => (
                <Grid.Column
                  key={`x_${index}`}
                  mobile="12"
                  tablet="6"
                  computer="6"
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
                            label: y_values[index],
                            outerRadius: 55,
                            showValue: true,
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
