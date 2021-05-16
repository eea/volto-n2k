import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Pagination, Grid } from 'semantic-ui-react';
import { getObjectByIndex } from '@eeacms/volto-n2k/helpers';
import { Filters } from './Filters';
import {
  photoPlaceholders,
  getPopulationString,
  getLabelString,
} from './utils';

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
  const { provider_data = {} } = props;
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
    return species.sortByProperty(property, order);
  };

  const getFilteredSpecies = (species = []) => {
    const activeFilters = {
      ...filters,
      ...(activeSpeciesGroup !== 'All'
        ? { species_group_name: [activeSpeciesGroup] }
        : {}),
    };

    const filteredSpecies = species.filter((item) => {
      let ok = true;
      Object.keys(activeFilters).forEach((filter) => {
        if (!activeFilters[filter].includes(item[filter])) {
          ok = false;
        }
      });
      return ok;
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
    const newSpecies = [];
    if (provider_data.scientific_name?.length) {
      provider_data.scientific_name.forEach((animal, index) => {
        newSpecies.push(getObjectByIndex(provider_data, index));
      });
    }
    setSpecies(getSortedSpecies(newSpecies));
    setPagination({ ...pagination, totalItems: newSpecies.length });
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  React.useEffect(() => {
    setFilteredSpecies(getSortedSpecies(getFilteredSpecies([...species])));
    /* eslint-disable-next-line */
  }, [species, sortBy, activeSpeciesGroup, filters]);

  return (
    <div className="site-species-list full-width">
      {props.mode !== 'edit' ? (
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
              return (
                <Grid
                  className="species"
                  key={`${index}-${filteredSpecies[index].id_eunis}`}
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
                          filteredSpecies[index].picture_url ||
                          photoPlaceholders[
                            filteredSpecies[index].species_group_name
                          ] ||
                          photoPlaceholders.Birds
                        }
                        alt={filteredSpecies[index].species_group_name}
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
                            to={`/natura2000/species/s/${filteredSpecies[index].id_eunis}`}
                          >
                            {filteredSpecies[index].scientific_name}
                            <span className="code-2000">
                              {' '}
                              - {filteredSpecies[index].code_2000 || 'NA'}
                            </span>
                          </Link>
                        </div>
                        <p>
                          {getPopulationString(
                            filteredSpecies[index].lower_bound,
                            filteredSpecies[index].upper_bound,
                          )}
                          {getLabelString(
                            'counting_unit',
                            filteredSpecies[index].counting_unit,
                          )}
                          {getLabelString(
                            'abundance_category',
                            filteredSpecies[index].abundance_category,
                          )}
                        </p>
                      </div>
                      <div className="footer-metadata">
                        <p className="green">
                          Appears in{' '}
                          {filteredSpecies[index].appears_number_sites} sites
                        </p>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })
          ) : (
            <div className="empty">No data</div>
          )}
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
