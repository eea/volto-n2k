import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToMultipleProviders } from '@eeacms/volto-datablocks/hocs';
import { replaceQueryParam } from '@eeacms/volto-n2k/helpers';
import chevronLeft from '@eeacms/volto-n2k/icons/chevron-left.svg';
import chevronRight from '@eeacms/volto-n2k/icons/chevron-right.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import cx from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { compose } from 'redux';

import GalleryModal from '../shared/GalleryModal';
import './style.less';

const getSource = (source) => {
  let parsedSource = replaceQueryParam(source, 'x', 800);
  parsedSource = replaceQueryParam(parsedSource, 'y', 800);

  return parsedSource;
};

const DataConnectedImageGallery = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const habitat_pictures_provider = useMemo(
    () => flattenToAppURL(props.data.images),
    [props.data.images],
  );

  const habitat_pictures = useMemo(
    () => props.providers_data?.[habitat_pictures_provider] || {},
    [props.providers_data, habitat_pictures_provider],
  );

  const { attribution_copyright = [] } = habitat_pictures;

  const pictures = useMemo(
    () => habitat_pictures?.['WebURL'] || [],
    [habitat_pictures],
  );
  const pictures_length = useMemo(
    () => pictures.filter((picture) => !!picture)?.length,
    [pictures],
  );

  const galleryItems = useMemo(
    () =>
      pictures.map((source, index) => ({
        id: source,
        src: getSource(source),
        copyright: attribution_copyright[index],
      })),
    [pictures, attribution_copyright],
  );

  const handleSliderPrevious = useCallback(() => {
    setActiveSlide((index) => (index - 1 + pictures_length) % pictures_length);
  }, [pictures_length]);

  const handleSliderNext = useCallback(() => {
    setActiveSlide((index) => (index + 1) % pictures_length);
  }, [pictures_length]);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpenModal();
      }
    },
    [handleOpenModal],
  );

  if (!habitat_pictures_provider && props.mode === 'edit') {
    return ' habitat pictures provider undefined';
  }

  return (
    <div className="habitat-banner-details-2">
      <div className="habitat-details">
        {pictures_length > 0 && (
          <div className={cx('carousel one-slide')}>
            <div className="gallery-slide">
              <div
                className="gallery-image"
                role="button"
                tabIndex={0}
                onClick={handleOpenModal}
                onKeyDown={handleModalKeyDown}
              >
                <Image
                  src={getSource(pictures[activeSlide])}
                  alt={
                    attribution_copyright[activeSlide] ||
                    `Image ${activeSlide + 1}`
                  }
                />
              </div>
              {(pictures_length > 1 ||
                !!attribution_copyright[activeSlide]) && (
                <div
                  className={cx('arrows', {
                    'arrows-hidden': pictures_length < 2,
                  })}
                >
                  {pictures_length > 1 && (
                    <>
                      <button
                        className="swiper-button image-swiper-button-prev"
                        aria-label="Previous image"
                        onClick={handleSliderPrevious}
                      >
                        <Icon
                          className="icon-left"
                          color="#fff"
                          name={chevronLeft}
                          size="18px"
                        />
                      </button>
                      <button
                        className="swiper-button image-swiper-button-next"
                        aria-label="Next image"
                        onClick={handleSliderNext}
                      >
                        <Icon
                          className="icon-right"
                          color="#fff"
                          name={chevronRight}
                          size="18px"
                        />
                      </button>
                    </>
                  )}
                  {!!attribution_copyright[activeSlide] && (
                    <p title={attribution_copyright[activeSlide]}>
                      {attribution_copyright[activeSlide]}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {__CLIENT__ && (
        <GalleryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          items={galleryItems}
          initialSlide={activeSlide}
        />
      )}
    </div>
  );
};

const ViewCompose = compose(
  connectToMultipleProviders((props) => ({
    providers: [{ provider_url: props.data?.images }],
  })),
)(DataConnectedImageGallery);

export default function View(props) {
  return (
    <VisibilitySensor Placeholder={() => <div>loading....&nbsp;</div>}>
      <ViewCompose {...props} />
    </VisibilitySensor>
  );
}
