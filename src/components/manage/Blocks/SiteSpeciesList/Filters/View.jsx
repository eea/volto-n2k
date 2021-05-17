import React from 'react';
import {
  Container,
  Dropdown,
  Sidebar,
  Checkbox,
  Label,
} from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import filterSVG from '@plone/volto/icons/filter.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import SpeciesGroups from './SpeciesGroups';
import SortBy from './SortBy';

import { filtersLabels } from '../utils';

const SidebarFilter = (props) => {
  const { activeFilters, filters, filter, index, setActiveFilters } = props;
  return (
    <div className="filter">
      <div className="header">
        <p className="title">
          {filtersLabels[filter].getTitle().toUpperCase()}
          {!index ? (
            <button
              className="reset-button"
              onClick={() => {
                setActiveFilters({});
              }}
            >
              Reset
            </button>
          ) : (
            ''
          )}
        </p>
      </div>
      {Object.keys(filters[filter]).map((field) => (
        <div key={filtersLabels[filter][field]} className="checkbox-wrapper">
          <Checkbox
            name={filter}
            label={filtersLabels[filter][field]}
            checked={activeFilters[filter]?.includes(field) || false}
            onClick={() => {
              const newActiveFilters = { ...activeFilters };
              if (newActiveFilters[filter]?.includes(field)) {
                newActiveFilters[filter].splice(
                  newActiveFilters[filter].indexOf(field),
                  1,
                );
              } else {
                newActiveFilters[filter] = [
                  ...(activeFilters[filter] || []),
                  field,
                ];
              }
              if (!newActiveFilters[filter].length) {
                delete newActiveFilters[filter];
              }
              setActiveFilters(newActiveFilters);
            }}
          />
          <p className="count">{filters[filter][field]}</p>
        </div>
      ))}
    </div>
  );
};

const View = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const {
    provider_data,
    activeFilters,
    filteredSpecies,
    pagination,
    sortBy,
    species,
    setActiveFilters,
    setPagination,
    setSortBy,
  } = props;
  const itemsPerPageOptions = [
    { key: '10', text: '10', value: 10 },
    { key: '25', text: '25', value: 25 },
    { key: '50', text: '50', value: 50 },
    { key: '100', text: '100', value: 100 },
  ];

  const updateFilters = () => {
    const newFilters = {};
    Object.keys(filtersLabels).forEach((filter) => {
      const fields = [...new Set(provider_data[filter] || [])].filter(
        (field) => field,
      );
      if (fields.length) {
        newFilters[filter] = {};
        fields.forEach((field) => {
          newFilters[filter][field] = filteredSpecies.filter(
            (species) => species[filter] === field,
          ).length;
        });
      }
    });
    setFilters(newFilters);
  };

  React.useEffect(() => {
    if (species.length) {
      updateFilters();
    }
    /* eslint-disable-next-line */
  }, [filteredSpecies]);

  return (
    <div className="species-filters">
      <SpeciesGroups {...props} />
      <Container>
        <div className="active-filters">
          {Object.keys(activeFilters).map((filter) =>
            activeFilters[filter].map((field) => (
              <Label
                className="active-filter"
                key={`active-filter-${field}`}
                as="span"
              >
                {filtersLabels[filter][field]}
                <Icon
                  name={clearSVG}
                  size="18px"
                  onClick={() => {
                    const newActiveFilters = { ...activeFilters };
                    if (newActiveFilters[filter]?.includes(field)) {
                      newActiveFilters[filter].splice(
                        newActiveFilters[filter].indexOf(field),
                        1,
                      );
                    }
                    if (!newActiveFilters[filter].length) {
                      delete newActiveFilters[filter];
                    }
                    setActiveFilters(newActiveFilters);
                  }}
                />
              </Label>
            )),
          )}
        </div>
        <div className="toolbar">
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
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
          <button onClick={() => setVisible(!visible)}>
            <Icon name={filterSVG} size="24px" />
          </button>
        </div>
      </Container>
      <Sidebar
        as="div"
        animation="overlay"
        direction="right"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        <div className="sidebar-header">
          <p className="title">Filters</p>
          <button className="clear-button" onClick={() => setVisible(false)}>
            <Icon name={clearSVG} size="20px" color="#fff" />
          </button>
        </div>
        <div className="filters">
          {Object.keys(filters).map((filter, index) => (
            <SidebarFilter
              key={filter}
              index={index}
              activeFilters={activeFilters}
              filters={filters}
              filter={filter}
              setActiveFilters={setActiveFilters}
            />
          ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default View;
