import React from 'react';
import { Grid } from 'semantic-ui-react';
import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const provider_data = props.provider_data || {};
  const columns = Object.keys(provider_data || {})?.[0]?.length || 0;

  return (
    <div className="connected-list">
      {props.mode === 'edit' ? <p>Connected list</p> : ''}
      <Grid columns={data.grid_size}>
        <Grid.Row>
          {Array(Math.max(0, columns))
            .fill()
            .map((_, column) => (
              <Grid.Column key={`connected-list-${column}`}>
                {data.labeled ?? true ? (
                  <p className="label">{provider_data[data.label][column]}</p>
                ) : (
                  ''
                )}
                <p className="value">{provider_data[data.value][column]}</p>
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default View;
