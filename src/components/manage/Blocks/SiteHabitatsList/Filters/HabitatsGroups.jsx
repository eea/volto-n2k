import React from 'react';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';

const HabitatsGroups = (props) => {
  const [habitatsGroups, setHabitatsGroups] = React.useState([]);
  const {
    provider_data = {},
    activeHabitatsGroup = 'All',
    setActiveHabitatsGroup = () => {},
  } = props;

  React.useEffect(() => {
    setHabitatsGroups(
      [
        ...(provider_data.habitat_group?.length ? ['All'] : []),
        ...new Set(provider_data.habitat_group || []),
      ].sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return a.localeCompare(b);
      }),
    );
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  return (
    <div className="habitats-groups">
      <Container>
        {habitatsGroups.map((species) => (
          <button
            key={`group-filter-${species}`}
            className={cx({
              'habitats-group': true,
              active: activeHabitatsGroup === species,
            })}
            onClick={() => {
              setActiveHabitatsGroup(species);
            }}
          >
            {species}
          </button>
        ))}
      </Container>
    </div>
  );
};

export default HabitatsGroups;
