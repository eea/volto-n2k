import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import SlateEditor from 'volto-slate/editor/SlateEditor';
import { serializeNodes } from 'volto-slate/editor/render';
import { Editor } from 'volto-slate/utils';
import getSchema from './schema';
import './style.less';

const createParagraph = (text) => {
  return {
    children: [{ text }],
  };
};

const Edit = (props) => {
  const { data = {}, selected = false } = props;
  const [editingItem, setEditingItem] = React.useState(null);
  const schema = getSchema();
  const items = data.items || [];

  const addNewItem = () => {
    props.onChangeBlock(props.block, {
      ...data,
      items: [...items, {}],
    });
  };

  const removeItem = () => {
    props.onChangeBlock(props.block, {
      ...data,
      items: [...items.slice(0, items.length - 1)],
    });
  };

  return (
    <div className="navigation-anchors edit full-width">
      <Container>
        <Menu>
          {items.map((item, index) => {
            const value = { children: item.value || [], isVoid: Editor.isVoid };
            const valueUndefined =
              !value.children.length || Editor.string(value, []) === '';
            const defaultValue = `Item ${index}`;

            return (
              <Menu.Item
                key={`anchor-${index}`}
                onDoubleClick={() => {
                  if (editingItem !== index) {
                    setEditingItem(index);
                  }
                }}
              >
                {editingItem === index && selected ? (
                  <SlateEditor
                    id={`anchor-${index}`}
                    name={`anchor-${index}`}
                    value={
                      valueUndefined
                        ? [createParagraph(defaultValue)]
                        : value.children
                    }
                    onChange={(newValue) => {
                      const newItems = [...items];
                      newItems[index].value = [...(newValue || [])];
                      props.onChangeBlock(props.block, {
                        ...data,
                        items: [...newItems],
                      });
                    }}
                    block={null}
                    renderExtensions={[]}
                    selected={true}
                    properties={props.metadata}
                    placeholder={defaultValue}
                  />
                ) : !valueUndefined ? (
                  serializeNodes(value.children)
                ) : (
                  <p>{defaultValue}</p>
                )}
              </Menu.Item>
            );
          })}
          <Menu.Item
            name="addition"
            onClick={() => {
              addNewItem();
              setEditingItem(null);
            }}
          >
            +
          </Menu.Item>
          {items.length > 0 ? (
            <Menu.Item
              name="addition"
              onClick={() => {
                removeItem();
                setEditingItem(null);
              }}
            >
              -
            </Menu.Item>
          ) : (
            ''
          )}
        </Menu>
      </Container>
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
