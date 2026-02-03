import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import TilesImagesView from './View';
import getSchema from './schema';

const Edit = (props) => {
  const { selected = false, data = {} } = props;
  const schema = getSchema({ formData: data });

  return (
    <>
      <TilesImagesView {...props} mode="edit" />
      <SidebarPortal selected={selected}>
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
          block={props.block}
          formData={props.data}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
