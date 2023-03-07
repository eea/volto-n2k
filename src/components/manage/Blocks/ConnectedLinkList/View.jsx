/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { FormattedValue } from '@eeacms/volto-datablocks/Utils';
import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const provider_data = props.provider_data || {};
  const columns = provider_data[Object.keys(provider_data)?.[0]]?.length || 0;

  return (
    <div className="connected-list">
      {props.mode === 'edit' ? <p>Connected link list</p> : ''}
      <p>
        {Array(Math.max(0, columns))
          .fill()
          .map((_, column) => (
            <FormattedValue
              textTemplate={data.textTemplate}
              linkTemplate={data.linkTemplate}
              value={provider_data[data.value]?.[column]}
              linkValue={provider_data[data.linkValue]?.[column]}
              link={true}
            />
          ))}
      </p>
    </div>
  );
};

export default View;
