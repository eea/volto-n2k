import React from 'react';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';

const SpeciesGroups = (props) => {
  const [speciesGroups, setSpeciesGroups] = React.useState([]);
  const {
    provider_data = {},
    activeSpeciesGroup = 'All',
    setActiveSpeciesGroup = () => {},
  } = props;

  React.useEffect(() => {
    setSpeciesGroups(
      [
        ...(provider_data.species_group_name?.length ? ['All'] : []),
        ...new Set(provider_data.species_group_name || []),
      ].sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return a.localeCompare(b);
      }),
    );
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  return (
    <div className="species-groups">
      <Container>
        {speciesGroups.map((species) => (
          <button
            key={`group-filter-${species}`}
            className={cx({
              'species-group': true,
              active: activeSpeciesGroup === species,
            })}
            onClick={() => {
              setActiveSpeciesGroup(species);
            }}
          >
            {species}
          </button>
        ))}
      </Container>
    </div>
  );
};

export default SpeciesGroups;
