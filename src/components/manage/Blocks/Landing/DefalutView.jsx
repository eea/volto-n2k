import React from 'react';
import { connect } from 'react-redux';
import { generatePath } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import LanguageSelector from '@eeacms/volto-n2k/components/theme/LanguageSelector/LanguageSelector';
import hiker from './images/hiker.webp';
import { tiles, tileProps, getStyle } from './index';

const DefaultView = (props) => {
  const currentLang = props.localStorage.get('N2K_LANGUAGE');

  return (
    <>
      <div
        className="landing-page-wrapper default full-width"
        style={getStyle(props)}
      >
        <Grid className="landing-page" container columns="12">
          <Grid.Row>
            <Grid.Column
              {...{
                mobile: 12,
                tablet: 12,
                computer: 12,
                largeScreen: 12,
                widescreen: 12,
              }}
              style={{ zIndex: 1, marginBottom: '1rem' }}
            >
              <LanguageSelector
                navigation={props.navigation}
                className="landingpage-variation"
              />
            </Grid.Column>
            <Grid.Column
              className="landing-page-description"
              widescreen="6"
              largeScreen="6"
              computer="6"
              tablet="12"
              mobile="12"
            >
              <p>
                DISCOVER EUROPE'S NATURE WITH ITS STUNNING DIVERSITY OF WILD
                PLANTS, ANIMALS AND LANDSCAPES, MANY OF WHICH ARE FOUND NOWHERE
                ELSE IN THE WORLD.
              </p>
              <p>
                WELCOME TO <strong>NATURA 2000</strong>, THE EUROPEAN NETWORK OF
                PROTECTED NATURAL AREAS.
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
                {currentLang
                  ? tiles.map((item, index) => {
                      const link = generatePath(item.link, {
                        lang: currentLang,
                      });
                      return (
                        <Grid.Column
                          key={`item-${index}`}
                          className="item"
                          {...tileProps}
                        >
                          <UniversalLink href={link || '#'} title={item.title}>
                            <img
                              className="image"
                              src={item.image}
                              alt={item.title}
                            />
                            <p className="description">{item.description}</p>
                          </UniversalLink>
                        </Grid.Column>
                      );
                    })
                  : ''}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <img className="slick-image" src={hiker} alt="Hiker" />
      </div>
    </>
  );
};

export default connect((state) => ({
  navigation: state.navigation,
  screen: state.screen,
}))(withLocalStorage(DefaultView));
