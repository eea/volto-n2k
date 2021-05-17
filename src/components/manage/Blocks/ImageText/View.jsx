import React from 'react';
import { serializeNodes } from 'volto-slate/editor/render';
import { Editor } from 'volto-slate/utils';
import cx from 'classnames';
import './styles.less';

const View = (props) => {
  const { data = {} } = props;
  const hasBorder = data.hasBorder ?? true;
  const value = { children: data.value || [], isVoid: Editor.isVoid };
  const valueUndefined =
    !value.children.length || Editor.string(value, []) === '';

  return (
    <div className={cx('image-text view', data.theme || 'light')}>
      {data.image ? (
        <p className={cx(hasBorder ? 'with-border rounded-border' : '')}>
          <img
            src={`${data.image}/@@images/image/mini`}
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
      {!valueUndefined ? serializeNodes(value.children) : ''}
    </div>
  );
};

export default View;
