import React from 'react';
import { Grid } from 'semantic-ui-react';
import { RenderBlocks, UniversalLink } from '@plone/volto/components';
import DefaultView from './DefalutView';
import hiker from './images/hiker.webp';
import { tileProps, getStyle } from './index';
import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const { useDefault = true, tiles = [] } = data;
  const metadata = props.metadata || props.properties;
  const blocksData = data?.data || {};

  return useDefault ? (
    <DefaultView {...props} />
  ) : (
    <div className="landing-page-wrapper full-width" style={getStyle(props)}>
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
            <RenderBlocks {...props} metadata={metadata} content={blocksData} />
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
                      src={`${item.image}/@@images/image`}
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
  );
};

export default View;
