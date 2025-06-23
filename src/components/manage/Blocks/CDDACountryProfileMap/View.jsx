import React, { useState, useMemo, useEffect } from 'react';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import Map from '@eeacms/volto-openlayers-map/Map';
import { Layers, Layer } from '@eeacms/volto-openlayers-map/Layers';
import { withOpenLayers } from '@eeacms/volto-openlayers-map';

// layer definitions
const smallScaleLayerId = 1;
const smallScaleMinScale = 0;
const smallScaleMaxScale = 3000000;

const mediumScaleLayerId = 3;
const mediumScaleMinScale = 2999999;
const mediumScaleMaxScale = 1000000;

const largeScaleLayerId = 4;
const largeScaleMinScale = 999999;
const largeScaleMaxScale = 0;

const dynamicLayerDefinition = `
[
  {
    "id":"{layerId}",
    "source":{
      "type":"mapLayer",
      "mapLayerId":"{layerId}"
    },
    "definitionExpression":"cddaCountryCode = '{country}'",
    "drawingInfo":{
      "renderer":{
        "type":"uniqueValue",
        "field1":"cddaCountryCode",
        "uniqueValueInfos":[
          {
            "value":"{country}",
            "label":"{country}",
            "symbol":{
              "color":[40,149,136,100],
              "outline":{
                "color":[40,149,136,100],
                "width": 0.75,
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
    "minScale":{minScale},
    "maxScale":{maxScale}
  }
]`;

const View = (props) => {
  const { ol: openlayers } = props;
  const [sources, setSources] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [extent, setExtent] = useState(null);
  const { proj, source } = openlayers;

  const country = useMemo(() => {
    const query = (props.properties.data_query || []).filter(
      (query) => query.i === 'iso2',
    )[0];
    if (!query) return null;
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
          LAYERS: `${largeScaleLayerId}`,
          dynamicLayers: dynamicLayerDefinition
            .replace(/(\r\n|\n|\r)/gm, '')
            .replaceAll(' ', '')
            .replaceAll('{country}', country)
            .replaceAll('{layerId}', largeScaleLayerId)
            .replace('{minScale}', largeScaleMinScale)
            .replace('{maxScale}', largeScaleMaxScale),
        },
        url: 'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/CDDA_Dyna_WM/MapServer',
      }),
      new source.ImageArcGISRest({
        ratio: 1,
        params: {
          LAYERS: `${mediumScaleLayerId}`,
          dynamicLayers: dynamicLayerDefinition
            .replace(/(\r\n|\n|\r)/gm, '')
            .replaceAll(' ', '')
            .replaceAll('{country}', country)
            .replaceAll('{layerId}', mediumScaleLayerId)
            .replace('{minScale}', mediumScaleMinScale)
            .replace('{maxScale}', mediumScaleMaxScale),
        },
        url: 'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/CDDA_Dyna_WM/MapServer',
      }),
      new source.ImageArcGISRest({
        ratio: 1,
        params: {
          LAYERS: `${smallScaleLayerId}`,
          dynamicLayers: dynamicLayerDefinition
            .replace(/(\r\n|\n|\r)/gm, '')
            .replaceAll(' ', '')
            .replaceAll('{country}', country)
            .replaceAll('{layerId}', smallScaleLayerId)
            .replace('{minScale}', smallScaleMinScale)
            .replace('{maxScale}', smallScaleMaxScale),
        },
        url: 'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/CDDA_Dyna_WM/MapServer',
      }),
    ]);
    fetch(
      `https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries/${country}?f=pjson`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(async (data) => {
        const { fromExtent } = await import('ol/geom/Polygon');
        if (data && data.countries.length > 0) {
          const countryInfo = data.countries[0];
          const countryExtent = [
            countryInfo.defaultExtent.xmin,
            countryInfo.defaultExtent.ymin,
            countryInfo.defaultExtent.xmax,
            countryInfo.defaultExtent.ymax,
          ];

          const reprojectedExtent = proj.transformExtent(
            countryExtent,
            'EPSG:4326',
            'EPSG:3857',
          );

          const polygon = fromExtent(reprojectedExtent);
          polygon.scale(1.2);

          setExtent(polygon.getExtent());
        }
      })
      .catch(function () {
        // handle the error
        setExtent(null);
      });
    /* eslint-disable-next-line */
  }, [country]);

  return (
    <div className="n2k-country-profile-map">
      <Map
        view={{
          center: [0, 0],
          extent: extent || [
            -6319125.804807394, 3070702.923644739, 9584655.106275197,
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
          <Layer.Image source={sources[1]} zIndex={2} />
          <Layer.Image source={sources[2]} zIndex={2} />
        </Layers>
      </Map>
    </div>
  );
};

export default withOpenLayers(View);
