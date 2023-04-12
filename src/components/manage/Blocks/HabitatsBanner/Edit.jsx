import React, { useMemo } from 'react';
import { compose } from 'redux';
import { SidebarPortal } from '@plone/volto/components';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToProviderData } from '@eeacms/volto-datablocks/hocs';
import getSchema from './schema';
import View from './View';
import './style.less';

const Edit = (props) => {
  const schema = useMemo(() => getSchema(props), [props]);

  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={props.selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          onChangeBlock={props.onChangeBlock}
          formData={props.data}
          block={props.block}
        />
      </SidebarPortal>
    </>
  );
};

const EditWrapper = compose(
  connectToProviderData((props) => ({
    provider_url: props.data?.provider_url,
  })),
)(Edit);

export default (props) => {
  return (
    <VisibilitySensor>
      <EditWrapper {...props} />
    </VisibilitySensor>
  );
};
