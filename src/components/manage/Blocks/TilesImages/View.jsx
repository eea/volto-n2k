import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import config from '@plone/volto/registry';

const View = (props) => {
  const { mode = 'view', variation } = props;

  const variations =
    config.blocks?.blocksConfig['tiles_images']?.variations || [];
  const defaultVariation = variations.filter((item) => item.isDefault)?.[0];
  const Template = variation?.template ?? defaultVariation?.template ?? null;

  return <Template {...props} mode={mode} />;
};

export default withBlockExtensions(View);
