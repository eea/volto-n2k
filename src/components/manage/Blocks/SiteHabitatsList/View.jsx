import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Pagination, Grid } from 'semantic-ui-react';
import { getObjectByIndex, photoPlaceholders } from '@eeacms/volto-n2k/helpers';
import { Filters } from './Filters';
import { getPopulationString, getLabelString } from './utils';

import './style.less';

const getCurrentPageLength = (pagination, arr) => {
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  if (arr.length < pagination.itemsPerPage) return arr.length;
  if (totalPages === pagination.activePage) {
    return arr.length - (pagination.activePage - 1) * pagination.itemsPerPage;
  }
  return pagination.itemsPerPage;
};

const View = (props) => {
  const {
    provider_data = {},
    placeholder = 'This site does not host any protected habitats',
  } = props;
  const dataReady = React.useRef(false);
  const [activeHabitatsGroup, setActiveHabitatsGroup] = React.useState('All');
  const [filters, setFilters] = React.useState({});
  const [habitats, spetHabitats] = React.useState([]);
  const [filteredHabitats, setFilteredHabitats] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    activePage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [sortBy, setSortBy] = React.useState(['scientific_name', 'ASC']);

  const getSortedHabitats = (habitats = []) => {
    const property = sortBy[0];
    const order = sortBy[1];

    return habitats.sort((a, b) => {
      const a_value = a[0][property];
      const b_value = b[0][property];
      if (a_value < b_value) return order === 'ASC' ? -1 : 1;
      if (a_value > b_value) return order === 'ASC' ? 1 : -1;
      return 0;
    });
  };

  const getfilteredHabitats = (habitats = []) => {
    const activeFilters = {
      ...filters,
      ...(activeHabitatsGroup !== 'All'
        ? { habitat_group: [activeHabitatsGroup] }
        : {}),
    };

    const filteredHabitats = habitats.filter((items, index) => {
      let itemsHaveFilter = true;
      Object.keys(activeFilters).forEach((filter) => {
        let habitatHasFilter = false;
        items.forEach((item) => {
          if (activeFilters[filter].includes(item[filter])) {
            habitatHasFilter = true;
          }
        });
        if (!habitatHasFilter) {
          itemsHaveFilter = false;
        }
      });
      return itemsHaveFilter;
    });

    setPagination({
      ...pagination,
      activePage: 1,
      totalItems: filteredHabitats.length,
    });

    return filteredHabitats;
  };

  React.useEffect(() => {
    dataReady.current = false;
    const habitatsIndex = {};
    const newHabitats = [];
    if (provider_data.scientific_name?.length) {
      provider_data.scientific_name.forEach((_, index) => {
        const habitat = getObjectByIndex(provider_data, index);
        if (!(habitatsIndex[habitat.code_2000] >= 0)) {
          habitatsIndex[habitat.code_2000] = index;
        }
        if (!newHabitats[habitatsIndex[habitat.code_2000]]) {
          newHabitats[habitatsIndex[habitat.code_2000]] = [];
        }
        newHabitats[habitatsIndex[habitat.code_2000]].push(habitat);
      });
    }
    spetHabitats(getSortedHabitats(newHabitats.filter((habitats) => habitats)));
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  React.useEffect(() => {
    const filteredHabitats = getSortedHabitats(
      getfilteredHabitats([...habitats]),
    );
    setFilteredHabitats(filteredHabitats);
    /* eslint-disable-next-line */
  }, [habitats, sortBy, activeHabitatsGroup, filters]);

  return (
    <div className="site-habitats-list full-width">
      {props.mode !== 'edit' && habitats.length ? (
        <Filters
          {...props}
          activeHabitatsGroup={activeHabitatsGroup}
          activeFilters={filters}
          filteredHabitats={filteredHabitats}
          pagination={pagination}
          sortBy={sortBy}
          habitats={habitats}
          setActiveHabitatsGroup={setActiveHabitatsGroup}
          setActiveFilters={setFilters}
          setPagination={setPagination}
          setSortBy={setSortBy}
        />
      ) : (
        ''
      )}

      <div className="habitats-list">
        <Container>
          {filteredHabitats.length ? (
            Array.from(
              {
                length: getCurrentPageLength(pagination, filteredHabitats),
              },
              (v, k) =>
                k + (pagination.activePage - 1) * pagination.itemsPerPage,
            ).map((index) => {
              const habitatsData = filteredHabitats[index][0];

              return (
                <Grid
                  className="habitats"
                  key={`${index}-${habitatsData.code_2000}`}
                  columns="12"
                >
                  <Grid.Row>
                    <Grid.Column
                      mobile={12}
                      tablet={3}
                      computer={2}
                      className="habitats-photo"
                    >
                      <img
                        src={
                          habitatsData.picture_url ||
                          photoPlaceholders[habitatsData.habitat_group] ||
                          photoPlaceholders.Birds
                        }
                        alt={habitatsData.habitat_group}
                      />
                    </Grid.Column>
                    <Grid.Column
                      mobile={12}
                      tablet={9}
                      computer={10}
                      className="habitats-details"
                    >
                      <div className="metadata">
                        <div className="name">
                          <Link
                            as="h3"
                            to={`/habitats/${habitatsData.code_2000}`}
                          >
                            {habitatsData.scientific_name
                              ? habitatsData.scientific_name + ' '
                              : ''}
                            <span className="code-2000">
                              {' '}
                              - {habitatsData.code_2000 || 'NA'}
                            </span>
                          </Link>
                        </div>
                        {filteredHabitats[index].map((habitat, index) => (
                          <p
                            className="habitat-data blue"
                            style={{ fontSize: '1.2rem' }}
                            key={`habitat-${index}-${habitat.code_2000}`}
                          >
                            Cover: {habitat.coverage_ha.toFixed(2)} ha (
                            {(habitat.coverage_ha / 100).toFixed(4)} km²)
                            {habitat.habitat_prioriy
                              ? `; Priority habitat type: ${habitat.habitat_prioriy}`
                              : ''}
                          </p>
                        ))}
                      </div>
                      <div className="footer-metadata">
                        <p className="green">
                          Appears in {habitatsData.number_sites} sites
                        </p>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })
          ) : habitats.length ? (
            <div className="empty">No results</div>
          ) : (
            ''
          )}
          {!habitats?.length ? <div className="empty">{placeholder}</div> : ''}
          {pagination.totalItems > 0 ? (
            <Pagination
              activePage={pagination.activePage}
              totalPages={Math.ceil(
                pagination.totalItems / pagination.itemsPerPage,
              )}
              onPageChange={(e, data) => {
                setPagination({ ...pagination, activePage: data.activePage });
              }}
              prevItem={null}
              nextItem={null}
            />
          ) : (
            ''
          )}
        </Container>
      </div>
    </div>
  );
};

export default View;
