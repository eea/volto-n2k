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
        <p className="with-border rounded-border">
          <UniversalLink href={image.link || '#'} title={image.title}>
            <img
              src={`${image.image}/@@images/image`}
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
