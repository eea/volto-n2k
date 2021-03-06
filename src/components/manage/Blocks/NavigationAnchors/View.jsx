import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { serializeNodes } from 'volto-slate/editor/render';
import { Editor } from 'volto-slate/utils';
import { Sticky } from '~/components';
import './styles.less';

const View = (props) => {
  const { data = {} } = props;
  const items = data.items || [];

  return (
    <Sticky className="sticky-navigation-anchors full-width">
      <div className="navigation-anchors">
        <Container>
          <Menu>
            {items.map((item, index) => {
              const value = {
                children: item.value || [],
                isVoid: Editor.isVoid,
              };
              const valueUndefined =
                !value.children.length || Editor.string(value, []) === '';
              const defaultValue = `Item ${index}`;

              return !valueUndefined ? (
                <Menu.Item key={`anchor-${index}`}>
                  {serializeNodes(value.children)}
                </Menu.Item>
              ) : (
                <Menu.Item key={`anchor-${index}`}>
                  <p>{defaultValue}</p>
                </Menu.Item>
              );
            })}
          </Menu>
        </Container>
      </div>
    </Sticky>
  );
};

export default View;
