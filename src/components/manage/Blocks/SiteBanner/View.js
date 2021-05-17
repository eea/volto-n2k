import React from 'react';
import { Grid } from 'semantic-ui-react';
// import { Icon } from '@plone/volto/components';
// import infoSVG from '@eeacms/volto-n2k/icons/info.svg';
import './style.less';

const isNumber = (number) => {
  return typeof number === 'number' && !isNaN(number);
};

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
          <Grid.Column style={{ paddingBottom: 0 }} computer="12" mobile="12">
            <h2 className="country-title">{country_name}</h2>
            <p className="site-name">{site_name}</p>
            {designation ? (
              <p className="site-designation">{designation}</p>
            ) : (
              ''
            )}
          </Grid.Column>
          <Grid.Column style={{ paddingTop: 0 }} computer="8" mobile="12">
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
                  {isNumber(area_km2[0]) ? (
                    <div>
                      {area_km2} km
                      <sup>2</sup>
                    </div>
                  ) : (
                    <div>No data</div>
                  )}
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
                      {isNumber(number_protected_habitat_types[0]) ? (
                        <div>{number_protected_habitat_types}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">Protected habitats</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {isNumber(number_protected_species[0]) ? (
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
