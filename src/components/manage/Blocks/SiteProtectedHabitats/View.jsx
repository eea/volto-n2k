import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { getObjectByIndex } from '@eeacms/volto-n2k/helpers';

import './style.less';

const View = (props) => {
  const [habitats, setHabitats] = React.useState({});
  const provider_data = props.provider_data || {};

  React.useEffect(() => {
    const newHabitats = {};
    if (provider_data?.habitat_group?.length) {
      provider_data.habitat_group.forEach((habitat, index) => {
        if (!newHabitats[habitat]) {
          newHabitats[habitat] = [];
        }
        newHabitats[habitat].push(getObjectByIndex(provider_data, index));
      });
    }
    setHabitats(newHabitats);
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  return (
    <div className="habitats-banner full-width" id="habitats-banner">
      <div className="habitats-container">
        <Container className="habitats-wrapper">
          <div className="habitats-wrapper">
            {Object.keys(habitats)
              .sort((a, b) => a.localeCompare(b))
              .map((habitat, index) => (
                <div key={index} className="habitat-box">
                  <div className="upper">
                    <span>{habitats[habitat].length}</span>
                  </div>
                  <div className="lower">
                    <span>{habitat}</span>
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
