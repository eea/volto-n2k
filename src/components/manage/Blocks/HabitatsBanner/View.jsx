import React from 'react';
import { Container, Transition } from 'semantic-ui-react';
import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const {
    code_2000 = [],
    // habitat_description = [],
    habitat_prioriy = [],
    habitat_type = [],
    // number_countries = [],
    // number_sites = [],
    scientific_name = [],
  } = provider_data;

  return (
    <Transition visible={!!code_2000[0] || props.mode === 'edit'}>
      <div className="habitat-banner-details full-width">
        <Container>
          <div className="habitat-details">
            <div className="habitat-metadata">
              <h2 className="name">{scientific_name[0]}</h2>
              <p className="info">
                {habitat_type[0]} {code_2000[0]}
              </p>
              {habitat_prioriy[0] ? (
                <p className="info">Priority habitat {habitat_prioriy[0]}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </Container>
      </div>
    </Transition>
  );
};

export default View;
