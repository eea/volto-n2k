import React from 'react';
import loadable from '@loadable/component';
import { Modal, Image } from 'semantic-ui-react';
import cx from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const [modalIndex, setModalIndex] = React.useState(0);
  const sliderRef = React.useRef(null);

  const inlineSettings = React.useMemo(
    () => ({
      ...baseSettings,
      beforeChange: (current, next) => setInlineIndex(next),
      initialSlide: 0,
    }),
    [],
  );

  const modalSettings = React.useMemo(
    () => ({
      ...baseSettings,
      beforeChange: (current, next) => setModalIndex(next),
      initialSlide: inlineIndex,
    }),
    [inlineIndex],
  );

  const handleClick = () => {
    if (items.length) {
      setModalIndex(inlineIndex);
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

  // const inlineImage = items[inlineIndex];
  const modalImage = items[modalIndex];

  return (
    <div className="image-gallery">
      {mode === 'view' ? (
        <>
          <div className="image-gallery-slider">
            <Slider {...inlineSettings}>
              {items.map((item, i) => renderSlide(item, i, handleClick))}
            </Slider>
          </div>
          {/* <div className="image-gallery-caption">
            <h3>{inlineImage?.title}</h3>
            <p>{inlineImage?.description}</p>
          </div> */}
          <Modal
            closeIcon
            open={open}
            className="slider-modal"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Modal.Content>
              <h3>{modalImage?.title}</h3>
              <p>{modalImage?.description}</p>
              {open ? (
                <Slider {...modalSettings} ref={sliderRef}>
                  {items.map((item, i) => renderSlide(item, i))}
                </Slider>
              ) : null}
              <div className="slide-image-count">
                <strong>{modalIndex + 1}</strong> of {items.length}
              </div>
            </Modal.Content>
          </Modal>
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
