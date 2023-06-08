import React from 'react';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';

import arrowSVG from '@plone/volto/icons/ahead.svg';

import './style.less';

const status_labels = {
  good: {
    title: 'GOOD',
    value: 'good',
  },
  poor: {
    title: 'POOR',
    value: 'poor',
  },
  bad: {
    title: 'BAD',
    value: 'bad',
  },
  unknown: {
    title: 'UNKNOWN',
    value: 'unkown',
  },
};

const View = (props) => {
  const { data = {} } = props;
  const provider_data = props.provider_data || {};
  const columns = provider_data[Object.keys(provider_data)?.[0]]?.length || 0;

  return (
    <div className="connected-status-list">
      {props.mode === 'edit' ? <p>Connected status list</p> : ''}
      {!!columns && (
        <ul>
          {Array(Math.max(0, columns))
            .fill()
            .map((_, column) => {
              const status =
                status_labels[
                  provider_data[data.status]?.[column]?.toLowerCase()
                ] || status_labels.unknown;
              return (
                <li
                  key={`connected-list-${column}`}
                  className={cx(`status-${status.value}`)}
                >
                  {provider_data[data.value] && (
                    <span className="value">
                      {provider_data[data.value][column]}
                    </span>
                  )}
                  <Icon name={arrowSVG} size="16px" />
                  <span className="status">{status.title}</span>
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
