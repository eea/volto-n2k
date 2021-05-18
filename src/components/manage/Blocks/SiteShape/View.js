import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import './style.less';

const isNumber = (number) => {
  return typeof number === 'number' && !isNaN(number);
};

const View = (props) => {
  const provider_data = props.provider_data || {};
  const {
    site_code = [],
  } = provider_data;

  return (
    <Transition visible={!!site_code[0] || props.mode === 'edit'}>
      <div className="site-shape full-width">
        <div className="ui container">
          <Grid>
            <Grid.Column computer="12" mobile="12">
              <div className="site-details-wrapper">
                <div className="site-detail">
                  <div className="upper">
                    {site_code[0] ? <div>{site_code}</div> : <div>-</div>}
                  </div>
                  <div className="lower">Site code</div>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </Transition>
  );
};

export default View;
