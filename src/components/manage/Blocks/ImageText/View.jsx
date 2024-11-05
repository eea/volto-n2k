import React, { useEffect, useState } from 'react';
import { UniversalLink } from '@plone/volto/components';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { createEditor } from 'slate';
import cx from 'classnames';
import './styles.less';

const View = (props) => {
  const { data = {} } = props;
  const [value, setValue] = useState(createEditor());

  useEffect(() => {
    setValue((value) => {
      value.children = data.value || [];
      return value;
    });
  }, [data.value]);

  const valueUndefined = !value.children.length || value.string([]) === '';

  const ImageText = () => {
    return (
      <>
        {data.image ? (
          <p
            className={cx('p-image', {
              'with-border': data.hasBorder ?? true,
              'rounded-border': data.rounded ?? true,
            })}
          >
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

        {!valueUndefined ? (
          <div className="text-wrapper">{serializeNodes(value.children)}</div>
        ) : (
          ''
        )}
      </>
    );
  };

  return data.href ? (
    <UniversalLink
      className={cx('image-text view', data.theme || 'light')}
      href={data.href || '/'}
      openLinkInNewTab={data.target === '_blank'}
      title={data.linkTitle}
    >
      <ImageText />
    </UniversalLink>
  ) : (
    <div className={cx('image-text view', data.theme || 'light')}>
      <ImageText />
    </div>
  );
};

export default View;
