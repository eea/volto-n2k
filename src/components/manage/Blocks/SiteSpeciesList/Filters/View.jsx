import React from 'react';
import { Container, Dropdown } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import filterSVG from '@plone/volto/icons/filter.svg';
import cx from 'classnames';

const View = (props) => {
  const {
    pagination = {},
    setPagination = () => {},
    sortBy = 'alphabetical',
    setSortBy = () => {},
  } = props;
  const itemsPerPageOptions = [
    { key: '10', text: '10', value: 10 },
    { key: '25', text: '25', value: 25 },
    { key: '50', text: '50', value: 50 },
    { key: '100', text: '100', value: 100 },
  ];
  const sortByOptions = [
    { text: 'Alphabetical', value: 'alphabetical' },
    { text: 'Population', value: 'population' },
  ];

  return (
    <div className="species-filters">
      <Container>
        <div className="active-filters"></div>
        <div className="filters">
          <Dropdown text="SORT BY" floating button>
            <Dropdown.Menu>
              {sortByOptions.map((option) => (
                <Dropdown.Item
                  key={option.text}
                  active={sortBy === option.value}
                  onChange={(e, data) => {
                    setSortBy(data.value);
                  }}
                >
                  {option.text}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            placeholder="Items per page"
            value={pagination.itemsPerPage}
            floating
            button
            options={itemsPerPageOptions}
            onChange={(e, data) => {
              setPagination({ ...pagination, itemsPerPage: data.value });
            }}
          />
          <button>
            <Icon name={filterSVG} size="24px" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default View;
