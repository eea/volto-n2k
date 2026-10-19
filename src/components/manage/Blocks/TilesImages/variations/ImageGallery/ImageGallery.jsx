import React from 'react';
import loadable from '@loadable/component';
import { Image } from 'semantic-ui-react';
import cx from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GalleryModal from '../shared/GalleryModal';
import './styles.less';

const Slider = loadable(() => import('react-slick'));

const baseSettings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  adaptiveHeight: true,
  autoplay: false,
  fade: false,
  useTransform: false,
};

const ImageGallery = (props) => {
  const { data = {}, mode } = props;
  const items = data.images || [];
  const [open, setOpen] = React.useState(false);
  const [inlineIndex, setInlineIndex] = React.useState(0);

  const inlineSettings = React.useMemo(
    () => ({
      ...baseSettings,
      beforeChange: (current, next) => setInlineIndex(next),
      initialSlide: 0,
    }),
    [],
  );

  const modalItems = React.useMemo(
    () =>
      items.map((item) => ({
        id: item.image,
        src: `${item.image}/@@images/image/larger`,
        title: item.title,
        description: item.description,
        copyright: item.copyright,
      })),
    [items],
  );

  const handleClick = () => {
    if (items.length) {
      setOpen(true);
    }
  };

  const renderSlide = (item, i, onClick) => {
    const slide = (
      <div className="image-slide">
        {item.copyright ? (
          <div className="image-rights">@ {item.copyright}</div>
        ) : null}
        <Image src={`${item.image}/@@images/image/larger`} alt={item?.title} />
      </div>
    );

    if (!onClick) {
      return (
        <div key={i} className="image-slide-wrapper">
          {slide}
        </div>
      );
    }

    return (
      <div
        key={i}
        className="image-slide-wrapper"
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {slide}
      </div>
    );
  };

  return (
    <div className="image-gallery">
      {mode === 'view' ? (
        <>
          <div className="image-gallery-slider">
            <Slider {...inlineSettings}>
              {items.map((item, i) => renderSlide(item, i, handleClick))}
            </Slider>
          </div>
          <GalleryModal
            open={open}
            onClose={() => setOpen(false)}
            items={modalItems}
            initialSlide={inlineIndex}
          />
        </>
      ) : (
        <>
          <div
            tabIndex={0}
            role="button"
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <Image
              src={`${items[0]?.image}/@@images/image/preview`}
              alt={items[0]?.title}
              className={cx('preview-image', {
                'image-gallery-preview': mode === 'edit',
              })}
            />
          </div>
          <p>Save the block to preview the Image Gallery Carousel.</p>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
