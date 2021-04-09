import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import hiker from './images/hiker.png';
import { tiles, tileProps, getStyle } from './index';

const DefaultView = (props) => {
  return (
    <>
      <div
        className="landing-page-wrapper default full-width"
        style={getStyle(props)}
      >
        <Grid className="landing-page" container columns="12">
          <Grid.Row>
            <Grid.Column
              className="landing-page-description"
              widescreen="6"
              largeScreen="6"
              computer="6"
              tablet="12"
              mobile="12"
            >
              <p>
                EUROPE IS HOME TO A STUNNING DIVERSITY OF WILD PLANTS, ANIMALS
                AND LANDSCAPES, MANY OF WHICH ARE FOUND NOWHERE ELSE IN THE
                WORLD.
              </p>
              <p>
                DISCOVER EU'S NATURE AND THE ACTIONS UNDERWAY TO PROTECT IT.
              </p>
            </Grid.Column>
            <Grid.Column
              className="landing-page-tiles"
              widescreen="6"
              largeScreen="6"
              computer="6"
              tablet="5"
              mobile="7"
            >
              <Grid style={{ justifyContent: 'space-around' }}>
                {tiles.map((item, index) => (
                  <Grid.Column
                    key={`item-${index}`}
                    className="item"
                    {...tileProps}
                  >
                    <UniversalLink href={item.link || '#'} title={item.title}>
                      <img
                        className="image"
                        src={item.image}
                        alt={item.title}
                      />
                      <p className="description">{item.description}</p>
                    </UniversalLink>
                  </Grid.Column>
                ))}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <img className="slick-image" src={hiker} alt="Hiker" />
      </div>
    </>
  );
};

export default connect((state, props) => ({
  screen: state.screen,
}))(DefaultView);
