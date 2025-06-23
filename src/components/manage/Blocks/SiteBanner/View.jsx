import React from 'react';
import { Grid } from 'semantic-ui-react';
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
    iucn_category = [],
    site_type = [],
    site_code = [],
    national_id = [],
    area_ha = [],
    year_stablished = [],
    number_protected_habitat_types = [],
    number_protected_species = [],
    marine_area_percentage = [],
  } = provider_data;

  if (!site_code[0]) return '';
  return (
    <div className="site-banner full-width">
      <div className="ui container">
        <Grid columns="equal">
          <Grid.Column style={{ paddingBottom: 0 }} computer="12" mobile="12">
            <h2 className="country-title">{site_name}</h2>
            <p className="site-name">{country_name}</p>
            {designation ? (
              <p className="site-designation">
                Designation type: {designation}
              </p>
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
                      {site_code[0] ? <div>{site_code}</div> : <div>-</div>}
                    </div>
                    <div className="lower">NatDA Site Code</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {isNumber(area_ha[0]) ? (
                        <div>{area_ha} ha</div>
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
                        <div>-</div>
                      )}
                    </div>
                    <div className="lower">Site established</div>
                  </div>

                  {national_id > 0 ? (
                    <div className="site-detail">
                      <div className="upper">
                        <div>{national_id}</div>
                      </div>
                      <div className="lower">National Site Code</div>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="site-detail">
                    <div className="upper">
                      {iucn_category[0] ? (
                        <div>{iucn_category}</div>
                      ) : (
                        <div>Not Reported</div>
                      )}
                    </div>
                    <div className="lower">IUCN Management Category</div>
                  </div>

                  {marine_area_percentage > 0 ? (
                    <div className="site-detail">
                      <div className="upper">
                        <div>{marine_area_percentage} %</div>
                      </div>
                      <div className="lower">Marine Area</div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}

              {['Natura2000', 'Emerald'].includes(site_type[0]) && (
                <>
                  <div className="site-detail">
                    <div className="upper">
                      {site_code[0] ? <div>{site_code}</div> : <div>-</div>}
                    </div>
                    <div className="lower">Site code</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {isNumber(area_ha[0]) ? (
                        <div>{area_ha} ha</div>
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
                        <div>-</div>
                      )}
                    </div>
                    <div className="lower">Site established</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {isNumber(number_protected_habitat_types[0]) ? (
                        <div>{number_protected_habitat_types}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">EU Protected habitats</div>
                  </div>

                  <div className="site-detail">
                    <div className="upper">
                      {isNumber(number_protected_species[0]) ? (
                        <div>{number_protected_species}</div>
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                    <div className="lower">EU Protected species</div>
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
