import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import './styles.less';

const View = (props) => {
  const { data = {}, mode = 'view' } = props;
  const images = data.images || [];

  return (
    <div className={cx('tiles-images', mode, data.theme || 'light')}>
      {mode === 'edit' && !images.length ? <p>Tiles images block</p> : ''}
      {images.map((image) => (
        <p
          key={`tile-${image.title}`}
          className={cx('p-image', {
            'with-border': data.hasBorder ?? true,
            'rounded-border': data.rounded ?? true,
          })}
        >
          <UniversalLink href={image.link || '#'} title={image.title}>
            <img
              src={`${image.image}/@@images/image/mini`}
              alt={image.title}
              style={
                data.size
                  ? { width: `${data.size}px`, height: `${data.size}px` }
                  : {}
              }
            />
          </UniversalLink>
        </p>
      ))}
    </div>
  );
};

export default View;
