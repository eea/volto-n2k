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
    cdda_designation_national_language = [],
    site_type = [],
    site_code = [],
    area_km2 = [],
    year_stablished = [],
    number_protected_habitat_types = [],
    number_protected_species = [],
    major_ecosystem_type = [],
  } = provider_data;

  return (
    <div className="site-banner full-width">
      <div className="ui container">
        <Grid columns="equal">
          <Grid.Column computer="8" mobile="12">
            <h2 className="country-title">{country_name}</h2>
            <span className="site-name">{site_name}</span>
            <Popup
              content={designation}
              trigger={<Image src={infoSVG} className="info-icon" />}
            />

            <div className="site-details-wrapper">
              {site_type[0] === 'CDDA' && (
                <>
                  <div className="site-detail">
                    <div className="upper">
                      {cdda_designation_national_language[0] ? (
                        <div>{cdda_designation_national_language}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">Designation (National Language)</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {designation[0] ? (
                        <div>{designation}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">Designation (English)</div>
                  </div>
                </>
              )}

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
                <div className="lower">Year established</div>
              </div>

              {site_type[0] === 'CDDA' && (
                <div className="site-detail">
                  <div className="upper">
                    {major_ecosystem_type[0] ? (
                      <div>{major_ecosystem_type}</div>
                    ) : (
                      <div>No data</div>
                    )}
                  </div>
                  <div className="lower">Ecosystem</div>
                </div>
              )}

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
          <Grid.Column computer="4" mobile="12">
            {/*map svg here*/}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default View;
