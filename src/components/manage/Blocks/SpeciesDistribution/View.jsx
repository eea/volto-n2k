import React, { useState, useEffect } from 'react';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import { getSpeciesDistributionURL } from './index';
import './style.less';

const View = (props) => {
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const { extent, format, proj, style, source } = openlayers;
  const provider_data = props.provider_data || {};
  const { code_2000 = [] } = provider_data;

  useEffect(() => {
    if (__SERVER__) return;
    setVectorSource(new source.Vector());
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (__SERVER__ || !vectorSource || !code_2000[0]) return;
    const esrijsonFormat = new format.EsriJSON();
    // Get species location on sites
    fetch(getSpeciesDistributionURL(code_2000[0])).then(function (response) {
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
  }, [code_2000?.[0]]);

  if (__SERVER__ || !vectorSource) return '';
  return (
    <div className="species-distribution-wrapper">
      <div className="species-distribution">
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
            <Layer.WebGLPoints
              source={vectorSource}
              style={{
                symbol: {
                  symbolType: 'circle',
                  size: 8,
                  color: '#04A77D',
                  rotateWithView: false,
                  offset: [0, 0],
                  opacity: 0.8,
                },
              }}
              zIndex={1}
            />
          </Layers>
          <Controls attribution={false} />
          <Interactions pointer={false} select={false} />
        </Map>
      </div>
    </div>
  );
};

export default View;
