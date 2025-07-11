import React, { useState, useEffect } from 'react';
import { Message, Container } from 'semantic-ui-react';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { withOpenLayers } from '@eeacms/volto-openlayers-map';
import { getHabitatDistributionURL } from './index';
import './style.less';

const View = (props) => {
  const { ol: openlayers } = props;
  const dataFetched = React.useRef();
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const [tileWMSSources, setTileWMSSources] = useState([]);
  const { extent, format, proj, style, source } = openlayers;
  const provider_data = props.provider_data || {};
  const { code_2000 = [] } = provider_data;

  useEffect(() => {
    if (__SERVER__) return;
    setVectorSource(new source.Vector());
    setTileWMSSources([
      new source.TileWMS({
        url: 'https://gisco-services.ec.europa.eu/maps/service',
        params: {
          LAYERS: 'OSMBlossomComposite',
          TILED: true,
        },
        serverType: 'geoserver',
        transition: 0,
      }),
    ]);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (__SERVER__ || !vectorSource || !code_2000[0] || dataFetched.current)
      return;
    const esrijsonFormat = new format.EsriJSON();
    // Get habitat location on sites
    fetch(getHabitatDistributionURL(code_2000[0])).then(function (response) {
      if (response.status !== 200) return;
      response.json().then(function (data) {
        dataFetched.current = true;
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
  }, [vectorSource, code_2000?.[0]]);

  if (__SERVER__ || !vectorSource) return '';
  return (
    <div className="habitat-distribution-wrapper">
      <div className="habitat-distribution">
        <Map
          view={{
            center: proj.fromLonLat([20, 50]),
            showFullExtent: true,
            zoom: 5,
            ...(options.extent ? { extent: options.extent } : {}),
          }}
          pixelRatio={1}
        >
          <Layers>
            <Layer.Tile source={tileWMSSources[0]} zIndex={0} />
            <Layer.Vector
              source={vectorSource}
              style={
                new style.Style({
                  fill: new style.Fill({
                    color: 'rgba(255,255,255,0.4)',
                  }),
                  stroke: new style.Stroke({
                    color: '#00A390',
                    width: 3,
                  }),
                })
              }
              zIndex={1}
            />
          </Layers>
          <Controls attribution={true} />
          <Interactions pointer={false} select={false} />
        </Map>
      </div>
      <Container>
        <Message className="map-info-notice">
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

export default withOpenLayers(View);
