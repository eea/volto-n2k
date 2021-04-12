import React from 'react';
import { Grid, Popup, Image } from 'semantic-ui-react';
import infoSVG from './info.svg';

import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const {
    country_name,
    site_name,
    designation = [],
    site_type = [],
    site_code = [],
    area_km2 = [],
    year_stablished = [],
    number_protected_habitat_types = [],
    number_protected_species = [],
  } = provider_data;

  return (
    <div className="site-banner full-width">
      <div className="ui container">
        <Grid columns="equal">
          <Grid.Column width={8}>
            <h2 className="country-title">{country_name}</h2>
            <span className="site-name">{site_name}</span>
            <Popup
              content={designation}
              trigger={<Image src={infoSVG} className="info-icon" />}
            />

            <div className="site-details-wrapper">
              <div className="site-detail">
                <div className="upper">
                  {site_code[0] ? <div>{site_code}</div> : <div>No data</div>}
                </div>
                <div className="lower">Site code</div>
              </div>

              <div className="site-detail">
                <div className="upper">
                  {area_km2[0] ? <div>{area_km2}</div> : <div>No data</div>}
                </div>
                <div className="lower">Reported area</div>
              </div>

              <div className="site-detail">
                <div className="upper">
                  {year_stablished[0] ? (
                    <div>{year_stablished}</div>
                  ) : (
                    <div>No data</div>
                  )}
                </div>
                <div className="lower">Year est</div>
              </div>

              {site_type[0] === 'Natura2000' && (
                <>
                  <div className="site-detail">
                    <div className="upper">
                      {number_protected_habitat_types[0] ? (
                        <div>{number_protected_habitat_types}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">Protected habitats</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {number_protected_species[0] ? (
                        <div>{number_protected_species}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">Protected species</div>
                  </div>
                </>
              )}
            </div>
          </Grid.Column>
          <Grid.Column width={4}>{/*map svg here*/}</Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default View;
