import React from 'react';
import { Container } from 'semantic-ui-react';

import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const data = (provider_data?.number || []).reduce(function (data, key, i) {
    data[provider_data.species_group_name[i]] = key;
    return data;
  }, {});

  return (
    <div className="species-banner full-width" id="species-banner">
      <div className="species-container">
        <Container className="species-wrapper">
          {/* <Grid size="12">
            <Grid.Row>
              {Object.entries(data).map(([item, value], index) => (
                <Grid.Column
                  key={index}
                  mobile="6"
                  tablet="6"
                  computer="3"
                  className="species-box"
                >
                  <div className="upper">
                    <span>{value}</span>
                  </div>
                  <div className="lower">
                    <span>{item}</span>
                  </div>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid> */}
          <div className="species-wrapper">
            {Object.keys(data)
              .sort((a, b) => a.localeCompare(b))
              .map((species, index) => (
                <div key={index} className="species-box">
                  <div className="upper">
                    <span>{data[species]}</span>
                  </div>
                  <div className="lower">
                    <span>{species}</span>
                  </div>
                </div>
              ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default View;
