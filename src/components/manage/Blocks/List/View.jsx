import React from 'react';
import { Icon } from '@plone/volto/components';

import arrowSVG from '@plone/volto/icons/up-key.svg';

import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const provider_data = props.provider_data || {};
  const columns = React.useMemo(() => {
    const temp = provider_data[Object.keys(provider_data)?.[0]]?.length || 0;
    if (data.count < temp && data.count > 0) {
      return data.count;
    }

    return temp;
  }, [provider_data, data.count]);

  return (
    <div className="connected-list">
      {props.mode === 'edit' ? <p>Connected list</p> : ''}
      {!!columns && (
        <ul className={data.theme || 'default'}>
          {Array(Math.max(0, columns))
            .fill()
            .map((_, column) => {
              return (
                <React.Fragment key={`connected-list-${column}`}>
                  <li>
                    {(data.labeled ?? true) && data.label ? (
                      <p className="label">
                        {provider_data[data.label][column]}
                      </p>
                    ) : (
                      ''
                    )}
                    {data.value ? (
                      <p className="value">
                        {provider_data[data.value][column]}
                      </p>
                    ) : (
                      ''
                    )}
                  </li>
                  {column < columns - 1 && data.theme === 'theme_1' && (
                    <li>
                      <Icon name={arrowSVG} size="64px" />
                    </li>
                  )}
                </React.Fragment>
              );
            })}
        </ul>
      )}
      {!columns && <p className="no-results">-</p>}
    </div>
  );
};

export default View;
