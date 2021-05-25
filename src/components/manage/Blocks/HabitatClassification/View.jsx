import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const { habitat_code = [], level = [], scientific_name = [] } = provider_data;
  const rows = habitat_code?.length || 0;

  return (
    <div className="habitat-classification">
      {props.mode === 'edit' ? <p>Habitat classification</p> : ''}
      {Array(Math.max(0, rows))
        .fill()
        .map((_, row) => (
          <p
            key={`classification-${scientific_name[row]}`}
            className={`level-${level[row]}`}
            style={{ marginLeft: `${level[row] - 1}rem` }}
          >
            <UniversalLink href="#">
              {habitat_code[row]}. {scientific_name[row]}
            </UniversalLink>
          </p>
        ))}
    </div>
  );
};

export default View;
