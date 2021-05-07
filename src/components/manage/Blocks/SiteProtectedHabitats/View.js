import React from 'react';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import downKeySVG from '@plone/volto/icons/down-key.svg';
import upKeySVG from '@plone/volto/icons/up-key.svg';
import './style.less';

const getObjectByIndex = (provider_data, index) => {
  const obj = {};
  const keys = Object.keys(provider_data);
  keys.forEach((key) => {
    obj[key] = provider_data[key][index];
  });
  return obj;
};

const View = (props) => {
  const [habitats, setHabitats] = React.useState({});
  const [selectedHabitat, setSelectedHabitat] = React.useState(null);
  const { provider_data = {} } = props;

  React.useEffect(() => {
    const newHabitats = {};
    if (provider_data?.habitat_group?.length) {
      provider_data.habitat_group.sort().forEach((habitat, index) => {
        if (!newHabitats[habitat]) {
          newHabitats[habitat] = [];
        }
        newHabitats[habitat].push(getObjectByIndex(provider_data, index));
      });
    }
    setHabitats(newHabitats);
    /* eslint-disable-next-line */
  }, [JSON.stringify(provider_data)]);

  return (
    <div className="site-protected-habitats">
      {Object.keys(habitats).map((habitat) => (
        <div className="habitat" key={habitat}>
          <div
            className={cx({
              'habitat-toolbar': true,
              marginless: selectedHabitat !== habitat,
            })}
          >
            <div className="habitat-name">
              <h3>{habitat}</h3>
              <p className="count">{habitats[habitat].length}</p>
            </div>
            <Icon
              name={selectedHabitat === habitat ? upKeySVG : downKeySVG}
              onClick={(e) => {
                setSelectedHabitat(
                  selectedHabitat === habitat ? null : habitat,
                );
                e.preventDefault();
                e.stopPropagation();
              }}
              color="#8C8C8C"
              size="32px"
            />
          </div>

          {selectedHabitat === habitat
            ? habitats[habitat].map((item, index) => (
                <div className="habitat-item" key={`${habitat}-${index}-item`}>
                  <Link
                    className="description"
                    to={`/natura2000/habitats/h/${item.code_2000}`}
                  >
                    {item.habitat_description}
                  </Link>
                  <p className="coverage">
                    {item.coverage_ha} ha ({item.coverage_ha / 100} km
                    <sup>2</sup>)
                  </p>
                </div>
              ))
            : ''}
        </div>
      ))}
    </div>
  );
};

export default View;
