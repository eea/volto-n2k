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
    <div className="species-banner full-width">
      <div className="species-container">
        <Container>
          <div className="species-wrapper">
            {Object.entries(data).map(([item, value], index) => (
              <div key={index} className="species-box">
                <div className="upper">
                  <span>{value}</span>
                </div>
                <div className="lower">
                  <span>{item}</span>
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
