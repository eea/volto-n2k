import React from 'react';
import { Container } from 'semantic-ui-react';
import { photoPlaceholders } from '@eeacms/volto-n2k/helpers';
import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const {
    author = [],
    common_name = [],
    common_name_list = [],
    id_eunis = [],
    picture_url = [],
    scientific_name = [],
    species_group_names = [],
  } = provider_data;

  if (!id_eunis[0]) return '';
  return (
    <div className="species-banner-details full-width">
      <Container>
        <div className="species-details">
          <div className="species-metadata">
            <h2 className="name">{scientific_name[0]}</h2>
            <p className="info">
              {common_name[0]} {author[0]}
            </p>
            {common_name_list[0] ? (
              <p className="info">Common names: {common_name_list[0]}</p>
            ) : (
              ''
            )}
          </div>
          <img
            src={
              picture_url[0] ||
              photoPlaceholders[species_group_names[0]] ||
              photoPlaceholders.Birds
            }
            alt={species_group_names[0]}
          />
        </div>
      </Container>
    </div>
  );
};

export default View;
