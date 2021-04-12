import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const { site_code, ...data } = provider_data;

  return (
    <div className="species-banner full-width">
      <div className="species-container">
        <Container>
          {Object.keys(data).map((key, index) => (
            <div key={index} className={`species-wrapper species-${key}`}>
              <Grid columns="equal">
                {Object.keys(data[key]).map((i) => (
                  <Grid.Column key={i}>
                    <div className="species-data">
                      <span>{data[key][i]}</span>
                    </div>
                  </Grid.Column>
                ))}
              </Grid>
            </div>
          ))}
        </Container>
      </div>
      <div className="banner-layer"></div>
    </div>
  );
};

export default View;
