import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import './styles.less';
import Copyright from './Copyright';

const DefaultView = (props) => {
  const { mode = 'view', data = {} } = props;

  const images = data.images || [];

  return (
    <div className={cx('tiles-images', mode, data.theme || 'light')}>
      {mode === 'edit' && !images.length ? <p>Tiles images block</p> : ''}
      {images.map((image) => {
        const { copyright } = image;
        return (
          <p
            key={`tile-${image.title}`}
            className={cx('p-image', {
              'with-border': data.hasBorder ?? true,
              'rounded-border': data.rounded ?? true,
            })}
          >
            <UniversalLink href={image.link || '#'} title={image.title}>
              <>
                <img
                  src={`${image.image}/@@images/image/mini`}
                  alt={image.title}
                  style={
                    data.size
                      ? { width: `${data.size}px`, height: `${data.size}px` }
                      : {}
                  }
                />
                <div className={`copyright-wrapper ${'left'}`}>
                  {copyright ? (
                    <Copyright copyrightPosition={'left'}>
                      <Copyright.Icon>@</Copyright.Icon>
                      <Copyright.Text>{copyright}</Copyright.Text>
                    </Copyright>
                  ) : (
                    ''
                  )}
                </div>
              </>
            </UniversalLink>
          </p>
        );
      })}
    </div>
  );
};

export default DefaultView;
