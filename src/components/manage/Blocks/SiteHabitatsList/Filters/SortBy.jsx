import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up.svg';
import downSVG from '@plone/volto/icons/down.svg';

const antonyms = {
  ASC: 'DESC',
  DESC: 'ASC',
};

const View = (props) => {
  const { sortBy, setSortBy } = props;

  const sortByOptions = [
    { text: 'Name', value: 'scientific_name', key: 'scientific_name' },
    { text: 'Coverage', value: 'coverage_ha', key: 'coverage_ha' },
    { text: 'Sites', value: 'number_sites', key: 'number_sites' },
    { text: 'Code', value: 'code_2000', key: 'code_2000' }
  ];

  return (
    <Dropdown aria-label="Sort habitats by" text="SORT BY" floating button>
      <Dropdown.Menu>
        {sortByOptions.map((option) => (
          <Dropdown.Item
            key={option.text}
            active={sortBy === option.value}
            onClick={(e, data) => {
              const activePoperty = sortBy[0];
              const activeOrder = sortBy[1];
              const newOrder =
                activePoperty === option.value ? antonyms[activeOrder] : 'ASC';
              setSortBy([option.value, newOrder]);
            }}
          >
            <p>
              {option.text}
              {sortBy[0] === option.value ? (
                <Icon
                  name={sortBy[1] === 'ASC' ? upSVG : downSVG}
                  size="14px"
                />
              ) : (
                ''
              )}
            </p>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default View;
