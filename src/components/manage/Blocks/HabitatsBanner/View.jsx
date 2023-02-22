import React from 'react';
import { Container } from 'semantic-ui-react';
import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const {
    code_2000 = [],
    // habitat_description = [],
    habitat_type = [],
    // number_countries = [],
    number_sites = [],
    scientific_name = [],
  } = provider_data;

  if (!code_2000[0]) return '';
  return (
    <div className="habitat-banner-details full-width">
      <Container>
        <div className="habitat-details">
          <div className="habitat-metadata">
            <h2 className="name">{scientific_name[0]}</h2>
            <p className="info">
              {habitat_type[0]} habitat code {code_2000[0]}
            </p>
            <br />
            {number_sites[0] && (
              <>
                <h3 style={{ marginBottom: '0.15rem' }}>{number_sites[0]}</h3>
                <h4 className="radjhan-normal">
                  NATURA 2000 SITES PROTECTING THIS HABITAT
                </h4>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default View;
