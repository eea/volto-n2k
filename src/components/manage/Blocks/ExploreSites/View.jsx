import React, { useState, useEffect } from 'react';
import { Message, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import { getAllSitesURL } from './index';
import './style.less';

const View = (props) => {
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const { extent, format, proj, style, source } = openlayers;

  useEffect(() => {
    if (__SERVER__) return;
    setVectorSource(new source.Vector());
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (
      __SERVER__ ||
      !vectorSource ||
      !props.search?.results?.length ||
      props.search?.results?.length > 30
    )
      return;
    const esrijsonFormat = new format.EsriJSON();

    // Get sites
    fetch(
      getAllSitesURL(props.search.results.map((item) => `'${item.site_code}'`)),
    ).then(function (response) {
      if (response.status !== 200) return;

      vectorSource.clear();

      response.json().then(function (data) {
        if (data.features && data.features.length > 0) {
          const features = esrijsonFormat.readFeatures(data);
          if (features.length > 0) {
            vectorSource.addFeatures(features);
            const vectorExtent = vectorSource.getExtent();
            let size = extent.getSize(vectorExtent);
            setOptions({
              ...options,
              extent: new extent.buffer(vectorExtent, size[0] * 0.01),
            });
          }
        }
      });
    });
    /* eslint-disable-next-line */
  }, [props.search]);

  if (__SERVER__ || !vectorSource) return '';
  return (
    <div className="explore-sites-wrapper full-width">
      <div className="explore-sites">
        <Map
          view={{
            center: proj.fromLonLat([20, 50]),
            showFullExtent: true,
            zoom: 5,
          }}
          {...options}
        >
          <Layers>
            <Layer.Tile zIndex={0} />
            <Layer.Vector
              source={vectorSource}
              style={
                new style.Style({
                  fill: new style.Fill({
                    color: 'rgba(255,255,255,0.4)',
                  }),
                  stroke: new style.Stroke({
                    color: '#04A77D',
                    width: 3,
                  }),
                })
              }
              zIndex={1}
            />
          </Layers>
          <Controls attribution={true} zoom={false} />
          <Interactions
            doubleClickZoom={true}
            dragAndDrop={false}
            dragPan={true}
            keyboardPan={true}
            keyboardZoom={true}
            mouseWheelZoom={true}
            pointer={false}
            select={false}
          />
        </Map>
      </div>
      <Container className="map-info-notice">
        <Message>
          <p>
            The designations employed and the presentation of material on this
            map do not imply the expression of any opinion whatsoever on the
            part of the European Union concerning the legal status of any
            country, territory, city or area or of its authorities, or
            concerning the delimitation of its frontiers or boundaries.
          </p>
        </Message>
      </Container>
    </div>
  );
};

export default connect((state) => ({
  search: state.table_search || {},
}))(View);
