import React from 'react';
import { Transition } from 'semantic-ui-react';
import './style.less';

const View = (props) => {
  const provider_data = props.provider_data || {};
  const { site_code = [], site_name = [] } = provider_data;

  return (
    <Transition visible={!!site_code[0] || props.mode === 'edit'}>
      <div className="site-shape full-width">
        <img
          src={`https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/Natura2000Sites/MapServer/export?dpi=96&transparent=true&format=png32&layers=show:0,1&bbox=2750251.3298460003,8242484.10697929,3007538.3670540024,8372579.92912071&bboxSR=102100&imageSR=102100&size=1683,851&f=image`}
          alt={site_name[0] || site_code[0]}
        />
      </div>
    </Transition>
  );
};

export default View;
