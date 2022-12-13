import React from 'react';
import findIndex from 'lodash/findIndex';
import { Icon } from '@plone/volto/components';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { getObjectByIndex } from '@eeacms/volto-n2k/helpers';
import downKeySVG from '@plone/volto/icons/down-key.svg';
import upKeySVG from '@plone/volto/icons/up-key.svg';
import './style.less';

const View = (props) => {
  const [habitats, setHabitats] = React.useState({});
  const [expandedHabitats, setExpandedHabitats] = React.useState([]);
  const { provider_data = {}, placeholder = 'No results' } = props;

  React.useEffect(() => {
    const newHabitats = {};
    if (provider_data?.habitat_group?.length) {
      provider_data.habitat_group.forEach((habitat, index) => {
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
    <div className="site-habitats-list">
      {Object.keys(habitats)?.length ? (
        Object.keys(habitats)
          .sort()
          .map((habitat) => {
            const expanded = expandedHabitats.includes(habitat);
            return (
              <div className="habitat" key={habitat}>
                <div
                  className={cx({
                    'habitat-toolbar': true,
                    marginless: !expanded,
                  })}
                >
                  <div className="habitat-name">
                    <h3>{habitat}</h3>
                    <p className="count">{habitats[habitat].length}</p>
                  </div>
                  <Icon
                    name={expanded ? upKeySVG : downKeySVG}
                    onClick={(e) => {
                      const index = findIndex(
                        expandedHabitats,
                        (name) => name === habitat,
                      );
                      if (index === -1) {
                        setExpandedHabitats((prevExpandedHabitats) => [
                          ...prevExpandedHabitats,
                          habitat,
                        ]);
                      } else {
                        setExpandedHabitats((prevExpandedHabitats) => {
                          const newExpandedHabitats = [...prevExpandedHabitats];
                          newExpandedHabitats.splice(index, 1);
                          return newExpandedHabitats;
                        });
                      }
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    color="#8C8C8C"
                    size="32px"
                  />
                </div>

                {expanded
                  ? habitats[habitat].map((item, index) => (
                      <div
                        className="habitat-item"
                        key={`${habitat}-${index}-item`}
                      >
                        <Link
                          className="description"
                          to={`/natura2000/habitats/h/${item.code_2000}`}
                        >
                          {item.habitat_description} ({item.code_2000})
                        </Link>
                        <p className="coverage">
                          {item.coverage_ha.toFixed(2)} ha (
                          {(item.coverage_ha / 100).toFixed(4)} km
                          <sup>2</sup>)
                        </p>
                      </div>
                    ))
                  : ''}
              </div>
            );
          })
      ) : (
        <p>{placeholder}</p>
      )}
    </div>
  );
};

export default View;
