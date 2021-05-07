import React from 'react';
import { Container, Pagination, Grid, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import downKeySVG from '@plone/volto/icons/down-key.svg';
import upKeySVG from '@plone/volto/icons/up-key.svg';
import cx from 'classnames';
import './style.less';

import { SpeciesGroupsFilter, Filters } from './Filters';
import {
  photoPlaceholders,
  getPopulationString,
  getLabelString,
} from './utils';

const getObjectByIndex = (provider_data, index) => {
  const obj = {};
  const keys = Object.keys(provider_data);
  keys.forEach((key) => {
    obj[key] = provider_data[key][index];
  });
  return obj;
};

const View = (props) => {
  const { provider_data = {} } = props;
  const [activeSpeciesGroup, setActiveSpeciesGroup] = React.useState('All');
  const [species, setSpecies] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    activePage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [sortBy, setSortBy] = React.useState('alphabetical');

  React.useEffect(() => {
    const newSpecies = [];
    if (provider_data.scientific_name?.length) {
      provider_data.scientific_name.sort().forEach((animal, index) => {
        newSpecies.push(getObjectByIndex(provider_data, index));
      });
    }
    setSpecies(newSpecies);
    setPagination({ ...pagination, totalItems: newSpecies.length });
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  return (
    <div className="site-species-list full-width">
      <SpeciesGroupsFilter
        {...props}
        activeSpeciesGroup={activeSpeciesGroup}
        setActiveSpeciesGroup={setActiveSpeciesGroup}
      />
      <Filters
        {...props}
        pagination={pagination}
        sortBy={sortBy}
        setPagination={setPagination}
        setSortBy={setSortBy}
      />
      <Container className="species-container">
        {Array.from(
          {
            length:
              species.length > pagination.itemsPerPage
                ? pagination.itemsPerPage
                : species.length,
          },
          (v, k) => k + (pagination.activePage - 1) * pagination.itemsPerPage,
        ).map((index) => {
          return (
            <Grid
              className="species"
              key={`${index}-${species[index].id_eunis}`}
              columns="12"
            >
              <Grid.Row>
                <Grid.Column
                  mobile={3}
                  tablet={3}
                  computer={2}
                  className="species-photo"
                >
                  <img
                    src={
                      photoPlaceholders[species[index].species_group_name] ||
                      photoPlaceholders.Birds
                    }
                    alt={species[index].species_group_name}
                  />
                </Grid.Column>
                <Grid.Column
                  mobile={9}
                  tablet={9}
                  computer={10}
                  className="species-details"
                >
                  <div className="metadata">
                    <h3 className="name">
                      {species[index].scientific_name}
                      <span className="code-2000">
                        {' '}
                        - {species[index].code_2000}
                      </span>
                    </h3>
                    <p>
                      {getPopulationString(
                        species[index].lower_bound,
                        species[index].upper_bound,
                      )}
                      {getLabelString('units', species[index].counting_unit)}
                      {getLabelString(
                        'abundance',
                        species[index].abundance_category,
                      )}
                    </p>
                  </div>
                  <div className="footer-metadata">
                    <p className="green">
                      Appears in {species[index].appears_number_sites} sites
                    </p>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}
        <Pagination
          activePage={pagination.activePage}
          totalPages={Math.ceil(
            pagination.totalItems / pagination.itemsPerPage,
          )}
          onPageChange={(e, data) => {
            setPagination({ ...pagination, activePage: data.activePage });
          }}
        />
      </Container>
    </div>
  );
};

export default View;
