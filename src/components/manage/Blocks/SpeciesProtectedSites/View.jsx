import React, { useState, useEffect } from 'react';
import { Message, Container } from 'semantic-ui-react';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import { getSpeciesProtectedSitesURL } from './index';
import './style.less';

const DEFAULT_LAYERS = [3, 7];

const View = (props) => {
  const dataFetched = React.useRef();
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const [tileWMSSources, setTileWMSSources] = useState([]);
  const { extent, format, proj, style, source } = openlayers;
  const provider_data = props.provider_data || {};
  const { code_2000 = [] } = provider_data;
  const layers = DEFAULT_LAYERS;

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
  }, [source]);

  useEffect(() => {
    if (__SERVER__ || !vectorSource || !code_2000[0]) {
      dataFetched.current = false;
      return;
    }

    const esrijsonFormat = new format.EsriJSON();
    const urls = getSpeciesProtectedSitesURL(code_2000[0],layers);
    
    let isMounted = true;
    dataFetched.current = false;

    // Get species protected sites from all specified layers
    Promise.all(
      Object.values(urls).map(url => 
        fetch(url)
          .then(response => {
            if (!isMounted) return { features: [] };
            return response.status == 200 ? response.json() : { features: [] };
          })
          .catch(() => {
            if (!isMounted) return { features: [] };
            return { features: [] };
          })
      )
    ).then( results => {
      if (!isMounted) return;

      const validResults = results.filter(r => !r.error);
      dataFetched.current = true;

      const allFeatures = validResults.reduce((acc, data) => {
        return acc.concat(data.features || []);
      }, []);

      if (allFeatures.length > 0) {
        // all features from all layers should have the same metadata
        const metadataTemplate = validResults.find(r => r.features && r.features.length > 0);

        const features = esrijsonFormat.readFeatures({ 
          ...metadataTemplate,
          features: allFeatures 
        });

        if (features.length > 0) {
          vectorSource.addFeatures(features);
          const vectorExtent = vectorSource.getExtent();

          if (!extent.isEmpty(vectorExtent)) {
            let size = extent.getSize(vectorExtent);
            setOptions({
              ...options,
              extent: new extent.buffer(vectorExtent, size[0] * 0.1),
            });
          }
        }
      }
    }).catch( error => {
      if (!isMounted) return;
      console.error('Error fetching protected sites data:', error);
      dataFetched.current = false;
      if (vectorSource) vectorSource.clear();
      setOptions(currentOptions => ({
        ...currentOptions,
        extent: undefined,
      }));
    });

    return () => {
      isMounted = false;
    };
    /* eslint-disable-next-line */
  }, [vectorSource, code_2000?.[0]]);

  if (__SERVER__ || !vectorSource) return '';

  return (
    <div className="species-protected-sites-wrapper">
      <div className="species-protected-sites">
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
            <Layer.VectorImage
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

export default View;
