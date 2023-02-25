import React from 'react';
import { RenderBlocks } from '@plone/volto/components';
import config from '@plone/volto/registry';

const View = (props) => {
  const { data } = props;
  const condition = data.condition;
  const metadata = props.metadata || props.properties;
  const CustomTag = `${data.as || 'div'}`;
  const customId = data?.title
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z-\s]/gi, '')
    ?.trim()
    ?.replace(/\s+/gi, '-');

  const ConditionalRendering =
    config.blocks.blocksConfig.group.conditions?.[condition] || null;

  if (ConditionalRendering) {
    return (
      <ConditionalRendering>
        <CustomTag id={customId}>
          <RenderBlocks
            {...props}
            metadata={metadata}
            content={data?.data || {}}
          />
        </CustomTag>
      </ConditionalRendering>
    );
  }

  return (
    <CustomTag id={customId}>
      <RenderBlocks {...props} metadata={metadata} content={data?.data || {}} />
    </CustomTag>
  );
};

export default View;
