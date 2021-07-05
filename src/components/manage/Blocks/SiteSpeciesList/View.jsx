import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Pagination, Grid } from 'semantic-ui-react';
import { getObjectByIndex } from '@eeacms/volto-n2k/helpers';
import { Filters } from './Filters';
import { photoPlaceholders } from '@eeacms/volto-n2k/helpers';
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
    placeholder = 'This site does not host any protected species',
  } = props;
  const dataReady = React.useRef(false);
  const [activeSpeciesGroup, setActiveSpeciesGroup] = React.useState('All');
  const [filters, setFilters] = React.useState({});
  const [species, setSpecies] = React.useState([]);
  const [filteredSpecies, setFilteredSpecies] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    activePage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [sortBy, setSortBy] = React.useState(['scientific_name', 'ASC']);

  const getSortedSpecies = (species = []) => {
    const property = sortBy[0];
    const order = sortBy[1];

    return species.sort((a, b) => {
      const a_value = a[0][property];
      const b_value = b[0][property];
      if (a_value < b_value) return order === 'ASC' ? -1 : 1;
      if (a_value > b_value) return order === 'ASC' ? 1 : -1;
      return 0;
    });
  };

  const getFilteredSpecies = (species = []) => {
    const activeFilters = {
      ...filters,
      ...(activeSpeciesGroup !== 'All'
        ? { species_group_name: [activeSpeciesGroup] }
        : {}),
    };

    const filteredSpecies = species.filter((items, index) => {
      let itemsHaveFilter = true;
      Object.keys(activeFilters).forEach((filter) => {
        let specimenHasFilter = false;
        items.forEach((item) => {
          if (activeFilters[filter].includes(item[filter])) {
            specimenHasFilter = true;
          }
        });
        if (!specimenHasFilter) {
          itemsHaveFilter = false;
        }
      });
      return itemsHaveFilter;
    });

    setPagination({
      ...pagination,
      activePage: 1,
      totalItems: filteredSpecies.length,
    });

    return filteredSpecies;
  };

  React.useEffect(() => {
    dataReady.current = false;
    const speciesIndex = {};
    const newSpecies = [];
    if (provider_data.scientific_name?.length) {
      provider_data.scientific_name.forEach((_, index) => {
        const specimen = getObjectByIndex(provider_data, index);
        if (!speciesIndex[specimen.id_eunis]) {
          speciesIndex[specimen.id_eunis] = index;
        }
        if (!newSpecies[speciesIndex[specimen.id_eunis]]) {
          newSpecies[speciesIndex[specimen.id_eunis]] = [];
        }
        newSpecies[speciesIndex[specimen.id_eunis]].push(specimen);
      });
    }
    setSpecies(getSortedSpecies(newSpecies.filter((species) => species)));
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  React.useEffect(() => {
    const filteredSpecies = getSortedSpecies(getFilteredSpecies([...species]));
    setFilteredSpecies(filteredSpecies);
    /* eslint-disable-next-line */
  }, [species, sortBy, activeSpeciesGroup, filters]);

  return (
    <div className="site-species-list full-width">
      {props.mode !== 'edit' && species.length ? (
        <Filters
          {...props}
          activeSpeciesGroup={activeSpeciesGroup}
          activeFilters={filters}
          filteredSpecies={filteredSpecies}
          pagination={pagination}
          sortBy={sortBy}
          species={species}
          setActiveSpeciesGroup={setActiveSpeciesGroup}
          setActiveFilters={setFilters}
          setPagination={setPagination}
          setSortBy={setSortBy}
        />
      ) : (
        ''
      )}

      <div className="species-list">
        <Container>
          {filteredSpecies.length ? (
            Array.from(
              {
                length: getCurrentPageLength(pagination, filteredSpecies),
              },
              (v, k) =>
                k + (pagination.activePage - 1) * pagination.itemsPerPage,
            ).map((index) => {
              const speciesData = filteredSpecies[index][0];

              return (
                <Grid
                  className="species"
                  key={`${index}-${speciesData.id_eunis}`}
                  columns="12"
                >
                  <Grid.Row>
                    <Grid.Column
                      mobile={12}
                      tablet={3}
                      computer={2}
                      className="species-photo"
                    >
                      <img
                        src={
                          speciesData.picture_url ||
                          photoPlaceholders[speciesData.species_group_name] ||
                          photoPlaceholders.Birds
                        }
                        alt={speciesData.species_group_name}
                      />
                    </Grid.Column>
                    <Grid.Column
                      mobile={12}
                      tablet={9}
                      computer={10}
                      className="species-details"
                    >
                      <div className="metadata">
                        <div className="name">
                          <Link
                            as="h3"
                            to={`/natura2000/species/s/${speciesData.id_eunis}`}
                          >
                            {speciesData.common_name
                              ? speciesData.common_name + ' '
                              : ''}
                            <em>{speciesData.scientific_name}</em>
                            <span className="code-2000">
                              {' '}
                              - {speciesData.code_2000 || 'NA'}
                            </span>
                          </Link>
                        </div>
                        {filteredSpecies[index].map((specimen, index) => (
                          <p
                            className="specimen-data"
                            key={`specimen-${index}-${specimen.id_eunis}`}
                          >
                            {getLabelString(
                              'population_type',
                              specimen.population_type,
                            )}
                            {getPopulationString(
                              specimen.lower_bound,
                              specimen.upper_bound,
                              ', ',
                            )}
                            {getLabelString(
                              'counting_unit',
                              specimen.counting_unit,
                              ', ',
                            )}
                            {getLabelString(
                              'abundance_category',
                              specimen.abundance_category,
                              ', ',
                            )}
                          </p>
                        ))}
                      </div>
                      <div className="footer-metadata">
                        <p className="orange">
                          {speciesData.EU_threat_name || 'Not reported'} (IUCN
                          European Red List)
                        </p>
                        <p className="green">
                          Appears in {speciesData.appears_number_sites} sites
                        </p>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })
          ) : species.length ? (
            <div className="empty">No results</div>
          ) : (
            ''
          )}
          {!species?.length ? <div className="empty">{placeholder}</div> : ''}
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
