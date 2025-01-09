import React from 'react';
import config from '@plone/volto/registry';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { Editor } from 'slate';
import getSchema from './schema';
import cx from 'classnames';
import './styles.less';

const createParagraph = (text) => {
  return {
    children: [{ text }],
  };
};

const Edit = (props) => {
  const { data = {}, selected = false } = props;
  const schema = getSchema();
  const value = { children: data.value || [], isVoid: Editor.isVoid };
  const valueUndefined = !value.children.length;

  const handleKeyDown = (e, index, { disableEnter = false } = {}) => {
    if (e.key === 'Enter' && !e.shiftKey && !disableEnter) {
      props.onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  return (
    <div
      className={cx('image-text edit', data.theme || 'light')}
      role="presentation"
      onKeyDown={(e) => {
        handleKeyDown(e, props.index);
      }}
      // The tabIndex is required for the keyboard navigation
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
      tabIndex={-1}
    >
      {data.image ? (
        <p
          className={cx('p-image', {
            'with-border': data.hasBorder ?? true,
            'rounded-border': data.rounded ?? true,
          })}
        >
          <img
            src={`${data.image}/@@images/image`}
            alt={data.imageTitle}
            style={
              data.imageSize
                ? {
                    width: `${data.imageSize}px`,
                    height: `${data.imageSize}px`,
                  }
                : {}
            }
          />
        </p>
      ) : (
        ''
      )}
      <SlateEditor
        id={`image-text-${props.id}`}
        name={`image-text-${props.id}`}
        value={valueUndefined ? [createParagraph('')] : value.children}
        onChange={(value) => {
          props.onChangeBlock(props.block, {
            ...data,
            value,
          });
        }}
        block={null}
        renderExtensions={[]}
        selected={true}
        properties={props.metadata}
        placeholder="Enter some rich text..."
      />
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
    </div>
  );
};

export default Edit;
