import React from 'react';
import loadable from '@loadable/component';
import { Image, Modal } from 'semantic-ui-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './GalleryModal.less';

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

/**
 * Fullscreen image gallery modal, shared by the ImageGallery and
 * DataConnectedImageGallery variations.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onClose
 * @param {Array} props.items - [{ id, src, title, description, copyright }]
 * @param {number} props.initialSlide
 */
const GalleryModal = ({ open, onClose, items = [], initialSlide = 0 }) => {
  const [index, setIndex] = React.useState(initialSlide);

  React.useEffect(() => {
    if (open) {
      setIndex(initialSlide);
    }
  }, [open, initialSlide]);

  const settings = React.useMemo(
    () => ({
      ...baseSettings,
      beforeChange: (current, next) => setIndex(next),
      initialSlide,
    }),
    [initialSlide],
  );

  const current = items[index] || {};

  return (
    <Modal closeIcon open={open} className="slider-modal" onClose={onClose}>
      <Modal.Content>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
        {open ? (
          <Slider {...settings}>
            {items.map((item, i) => (
              <div
                key={item.id ?? item.src ?? i}
                className="image-slide-wrapper"
              >
                <div className="image-slide">
                  {item.copyright ? (
                    <div className="image-rights">@ {item.copyright}</div>
                  ) : null}
                  <Image src={item.src} alt={item.title} />
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
        <div className="slide-image-count">
          <strong>{index + 1}</strong> of {items.length}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default GalleryModal;
