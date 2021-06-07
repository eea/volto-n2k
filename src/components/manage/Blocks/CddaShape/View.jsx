import React, { useState, useEffect } from 'react';
import { Message, Container } from 'semantic-ui-react';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import { getCddaShapeURL } from './index';
import './style.less';

const View = (props) => {
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const { extent, format, proj, style, source } = openlayers;
  const provider_data = props.provider_data || {};
  const { site_code = [] } = provider_data;

  useEffect(() => {
    if (__SERVER__) return;
    setVectorSource(new source.Vector());
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (__SERVER__ || !vectorSource || !site_code[0]) return;
    const esrijsonFormat = new format.EsriJSON();
    // Get site shape
    fetch(getCddaShapeURL(site_code[0])).then(function (response) {
      if (response.status !== 200) return;
      response.json().then(function (data) {
        if (data.features && data.features.length > 0) {
          const features = esrijsonFormat.readFeatures(data);
          if (features.length > 0) {
            vectorSource.addFeatures(features);
            const vectorExtent = vectorSource.getExtent();
            let size = extent.getSize(vectorExtent);
            setOptions({
              ...options,
              extent: new extent.buffer(vectorExtent, size[0] * 0.1),
            });
          }
        }
      });
    });
    /* eslint-disable-next-line */
  }, [site_code?.[0]]);

  if (__SERVER__ || !vectorSource) return '';
  return (
    <div className="site-shape-wrapper full-width">
      <div className="site-shape">
        <Map
          view={{
            center: proj.fromLonLat([20, 50]),
            showFullExtent: true,
            maxZoom: 10,
            minZoom: 10,
            zoom: 10,
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
                    lineDash: [5, 7],
                  }),
                })
              }
              zIndex={1}
            />
          </Layers>
          <Controls attribution={true} zoom={false} />
          <Interactions
            doubleClickZoom={false}
            dragAndDrop={false}
            dragPan={false}
            keyboardPan={false}
            keyboardZoom={false}
            mouseWheelZoom={false}
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

export default View;
