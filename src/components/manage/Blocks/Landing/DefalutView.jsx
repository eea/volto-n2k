import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import hiker from './images/hiker.png';
import { tiles, tileProps } from './index';

const getStyle = (props) => {
  if (!props.screen) return {};
  if (!props.screen.screenWidth || !props.screen.screenHeight) return {};
  if (props.screen.screenWidth < 768)
    return {
      maxHeight: props.screen.screenHeight.toPixel(),
      minHeight: props.screen.screenHeight.toPixel(),
    };
  return { minHeight: props.screen.screenHeight.toPixel() };
};

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
              widescreen="7"
              largeScreen="7"
              computer="7"
              tablet="7"
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
              widescreen="5"
              largeScreen="5"
              computer="5"
              tablet="5"
              mobile="6"
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
