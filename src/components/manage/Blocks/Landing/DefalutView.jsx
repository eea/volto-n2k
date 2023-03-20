import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { generatePath } from 'react-router';
import Cookies from 'universal-cookie';
import { Grid } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import hiker from './images/hiker.webp';
import { tiles, tileProps, getStyle } from './index';

function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}

function getLanguage() {
  if (__SERVER__) {
    return config.settings.eea.defaultLanguage;
  }
  const cookies = new Cookies();

  if (!cookies.get('LANGUAGE')) {
    cookies.set('LANGUAGE', config.settings.eea.defaultLanguage || '');
  }

  return cookies.get('LANGUAGE');
}

const DefaultView = (props) => {
  const language = getLanguage();

  useEffect(() => {
    if (removeTrailingSlash(props.location?.pathname || '') === '/natura2000') {
      props.history.push(`/natura2000/${language || 'en'}`);
    }
    /* eslint-disable-next-line */
  }, []);

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
                {language
                  ? tiles.map((item, index) => {
                      const link = generatePath(item.link, {
                        lang: language,
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
  screen: state.screen,
}))(DefaultView);
