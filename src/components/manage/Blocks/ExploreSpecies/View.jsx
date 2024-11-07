import React, { useState, useEffect } from 'react';
import { Message, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Interactions } from '@eeacms/volto-openlayers-map/Interactions';
import { Controls } from '@eeacms/volto-openlayers-map/Controls';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import { getActiveSpeciesURL } from './index';
import './style.less';

const View = (props) => {
  const [options, setOptions] = React.useState({});
  const [vectorSource, setVectorSource] = useState(null);
  const [tileWMSSources, setTileWMSSources] = useState([]);
  const { extent, format, proj, style, source } = openlayers;

  const { results = [], payload = {} } = props.search || {};

  const activePageResults = results.filter((_, index) => {
    return (
      index >= (payload?.activePage - 1) * payload?.row_size &&
      index <= payload?.activePage * payload?.row_size - 1
    );
  });

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
      new source.TileWMS({
        extent: [
          -3690067.3068000004, 3129776.6937999986, 3858418.0045999996,
          1.1124223900300004e7,
        ],
        url: 'https://bio.discomap.eea.europa.eu/arcgis/services/Article17/HabitatsDirective_ART_17_WMS_version_2020_08_public/MapServer/WmsServer',
        params: { LAYERS: '7', TILED: true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
    ]);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (__SERVER__ || !vectorSource) {
      return;
    }

    if (activePageResults.length === 0 && vectorSource) {
      vectorSource.clear();
      setOptions({
        ...options,
        extent: new extent.buffer(
          [
            -3690067.3068000004, 3129776.6937999986, 3858418.0045999996,
            1.1124223900300004e7,
          ],
          -3690067.3068000004 * 0.01,
        ),
      });
      return;
    }

    const esrijsonFormat = new format.EsriJSON();

    // Get species of active page
    fetch(
      getActiveSpeciesURL(
        activePageResults.map((item) => `'${item.code_2000}'`),
      ),
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
              extent: new extent.buffer(vectorExtent, size[0] * 0.03),
            });
          }
        }
      });
    });
    /* eslint-disable-next-line */
  }, [JSON.stringify(activePageResults)]);

  if (__SERVER__ || !vectorSource) return '';
  return (
    <div className="explore-species-wrapper full-width">
      <div className="explore-species">
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
            <Layer.Tile source={tileWMSSources[1]} zIndex={1} />
            <Layer.Vector
              source={vectorSource}
              title="highlightLayer"
              style={
                new style.Style({
                  fill: new style.Fill({
                    color: 'rgba(255,255,255,0.4)',
                  }),
                  stroke: new style.Stroke({
                    color: '#00A390',
                    // color: '#F8E473',
                    width: 3,
                  }),
                  image: new style.Circle({
                    radius: 5,
                    fill: new style.Fill({ color: 'rgba(4, 167, 125,0.6)' }),
                    // fill: new style.Fill({ color: 'rgba(248,228,115,0.6)' }),
                    stroke: new style.Stroke({
                      color: 'rgba(242, 180, 87, 1)',
                      width: 2,
                    }),
                  }),
                })
              }
              zIndex={2}
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
      <Container>
        <Message className="map-info-notice" style={{ color: '#005248' }}>
          <p>
            The designations employed and the presentation of material on this
            map do not imply the expression of any opinion whatsoever on the
            part of the European Union concerning the legal status of any
            country, territory, city or area or of its authorities, or
            concerning the delimitation of its frontiers or boundaries.
          </p>
          <p>
            <strong>Note:</strong> When you perform a search we will highlight
            only the results available on the active page of the results table.
          </p>
        </Message>
      </Container>
    </div>
  );
};

export default connect((state) => ({
  search: state.table_search || {},
}))(View);
