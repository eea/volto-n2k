import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import getSchema from './schema';
import './styles.less';

import View from './View';

const Edit = (props) => {
  const { selected = false } = props;
  const schema = getSchema();

  return (
    <React.Fragment>
      <View {...props} mode="edit" />
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
        />
      </SidebarPortal>
    </React.Fragment>
  );
};

export default Edit;
