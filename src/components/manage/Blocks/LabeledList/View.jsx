import React from 'react';

import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const provider_data = props.provider_data || {};
  const columns = provider_data[Object.keys(provider_data)?.[0]]?.length || 0;

  return (
    <div className="connected-labeled-list">
      {props.mode === 'edit' ? <p>Connected labeled list</p> : ''}
      {!!columns && (
        <ul className={data.theme || 'default'}>
          {Array(Math.max(0, columns))
            .fill()
            .map((_, column) => {
              return (
                <li key={`connected-list-${column}`}>
                  <span>
                    {(data.values || [])
                      .map((value) => provider_data[value.field]?.[column])
                      .join(data.separator || '')}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
      {!columns && <p className="no-results">-</p>}
    </div>
  );
};

export default View;
