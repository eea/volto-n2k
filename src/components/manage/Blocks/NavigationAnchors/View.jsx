import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { serializeNodes } from 'volto-slate/editor/render';
import { Editor } from 'volto-slate/utils';
import './style.less';

const View = (props) => {
  const { data = {} } = props;
  const items = data.items || [];

  return (
    <div className="navigation-anchors full-width">
      <Container>
        <Menu>
          {items.map((item, index) => {
            const value = { children: item.value || [], isVoid: Editor.isVoid };
            const valueUndefined =
              !value.children.length || Editor.string(value, []) === '';
            const defaultValue = `Item ${index}`;

            return !valueUndefined ? (
              <Menu.Item>{serializeNodes(value.children)}</Menu.Item>
            ) : (
              <Menu.Item>
                <p>{defaultValue}</p>
              </Menu.Item>
            );
          })}
        </Menu>
      </Container>
    </div>
  );
};

export default View;
