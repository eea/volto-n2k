import React, { useState, useEffect, useContext } from 'react';
import Map from '@eeacms/volto-openlayers-map/Map';
import MapContext from '@eeacms/volto-openlayers-map/Map/MapContext';
import { TileLayer, VectorLayer } from '@eeacms/volto-openlayers-map/Layers';
import { openlayers } from '@eeacms/volto-openlayers-map';
import './style.less';

const Layers = ({ provider_data }) => {
  const { map } = useContext(MapContext);
  const { ol, extent, format, style, source } = openlayers;
  const [vectorSource, setVectorSource] = useState(new source.Vector());
  const { site_code = [], site_name = [] } = provider_data;
  let esrijsonFormat = new format.EsriJSON();

  useEffect(() => {
    if (!map) return;
    const url = `https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Sites/MapServer/2/query?f=json&where=SITECODE LIKE '%${site_code[0].toUpperCase()}%'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=SITECODE,SITENAME,OBJECTID&outSR=102100`;
    fetch(encodeURI(url)).then(function (response) {
      if (response.status !== 200) return;
      // Examine the text in the response
      response.json().then(function (data) {
        if (data.features && data.features.length > 0) {
          const features = esrijsonFormat.readFeatures(data);
          if (features.length > 0) {
            vectorSource.addFeatures(features);
            map.getView().fit(features[0].getGeometry().getExtent());
            const size = extent.getSize(vectorSource.getExtent());
            map.setView(
              new ol.View({
                maxZoom: 16,
                extent: new extent.buffer(
                  vectorSource.getExtent(),
                  size[0] * 0.1,
                ),
                showFullExtent: true,
              }),
            );
            map
              .getView()
              .fit(new extent.buffer(vectorSource.getExtent(), size[0] * 0.1));
          }
        }
      });
    });
    /* eslint-disable-next-line */
  }, [map]);

  return (
    <>
      <TileLayer source={new source.OSM()} zIndex={0} />
      <VectorLayer
        source={vectorSource}
        style={
          new style.Style({
            fill: new style.Fill({
              color: 'rgba(255,255,255,0.4)',
            }),
            stroke: new style.Stroke({
              color: 'blue',
              width: 3,
              lineDash: [5, 7],
            }),
          })
        }
      />
    </>
  );
};

const View = (props) => {
  const [zoom, setZoom] = useState(4.5);
  const { proj } = openlayers;
  const provider_data = props.provider_data || {};
  const { site_code = [], site_name = [] } = provider_data;

  if (__SERVER__ || !site_code[0]) return '';
  return (
    <div className="site-shape full-width">
      <Map center={proj.fromLonLat([20, 50])} zoom={zoom}>
        <Layers provider_data={provider_data} />
      </Map>
    </div>
  );
};

export default View;
