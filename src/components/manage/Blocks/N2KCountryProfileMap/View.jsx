import React, { useState, useEffect, useMemo } from 'react';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';

let dynamicLayerDefinition = `
[
  {
    "id":2,
    "source":{
      "type":"mapLayer",
      "mapLayerId":2
    },
    "definitionExpression":"MS = '{country}'",
    "drawingInfo":{
      "renderer":{
        "type":"uniqueValue",
        "field1":"MS",
        "uniqueValueInfos":[{
          "value":"{country}",
          "label":"{country}",
          "symbol":{
            "color":[237,81,81,255],
            "outline":{
              "color":[153,153,153,64],
              "width":0.75,
              "type":"esriSLS",
              "style":"esriSLSSolid"
            },
            "type":"esriSFS",
            "style":"esriSFSSolid"
          }
        }
      ]
    },
    "showLabels":false
  },
  "minScale":0,
  "maxScale":0
}
]`;

const View = (props) => {
  const [sources, setSources] = useState([]);
  const [tiles, setTiles] = useState([]);
  const { source } = openlayers;

  const country = useMemo(() => {
    const query = (props.properties.data_query || []).filter(
      (query) => query.i === 'iso2',
    )[0];
    const value = query.v;
    if (isArray(value)) {
      return value[0];
    }
    if (isString(value)) {
      return value;
    }
    return null;
  }, [props.properties]);

  useEffect(() => {
    setTiles([
      new source.XYZ({
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/' +
          'Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      }),
      new source.XYZ({
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/' +
          'Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
      }),
    ]);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    setSources([
      new source.ImageArcGISRest({
        ratio: 1,
        params: {
          LAYERS: '2',
          dynamicLayers: dynamicLayerDefinition
            .replace(/(\r\n|\n|\r)/gm, '')
            .replaceAll(' ', '')
            .replaceAll('{country}', country),
        },
        url:
          'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Sites/MapServer',
      }),
    ]);
    /* eslint-disable-next-line */
  }, [country]);

  return (
    <div className="n2k-country-profile-map">
      <Map
        view={{
          center: [0, 0],
          extent: [
            -6319125.804807394,
            3070702.923644739,
            9584655.106275197,
            12091128.659149397,
          ],
          zoom: 2,
          showFullExtent: true,
        }}
        pixelRatio={1}
      >
        <Layers>
          <Layer.Tile source={tiles[1]} zIndex={0} opacity={1} />
          <Layer.Tile source={tiles[0]} zIndex={1} opacity={0.7} />
          <Layer.Image source={sources[0]} zIndex={2} />
        </Layers>
      </Map>
    </div>
  );
};

export default View;
