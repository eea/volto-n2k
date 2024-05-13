import React, { useRef, useMemo, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import loadable from '@loadable/component';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToMultipleProviders } from '@eeacms/volto-datablocks/hocs';
import { replaceQueryParam } from '@eeacms/volto-n2k/helpers';
import arrowLeft from '@eeacms/volto-n2k/icons/arrow-left.svg';
import arrowRight from '@eeacms/volto-n2k/icons/arrow-right.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const getSource = (source) => {
  let parsedSource = replaceQueryParam(source, 'x', 800);
  parsedSource = replaceQueryParam(parsedSource, 'y', 800);

  return parsedSource;
};

const _View = (props) => {
  const swiperEl = useRef();
  const previewEl = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const habitat_provider = flattenToAppURL(props.data.habitat_provider);
  const habitat_pictures_provider = flattenToAppURL(
    props.data.habitat_pictures_provider,
  );
  const habitat = props.providers_data?.[habitat_provider] || {};
  const habitat_pictures =
    props.providers_data?.[habitat_pictures_provider] || {};

  const { code_2000 = [], scientific_name = [] } = habitat;
  const { attribution_copyright = [] } = habitat_pictures;

  const pictures = habitat_pictures?.['WebURL'] || [];
  const pictures_length = useMemo(
    () => pictures.filter((picture) => !!picture)?.length,
    [pictures],
  );

  if (!habitat_provider && props.mode === 'edit') {
    return 'Habitat banner block, habitat provider undefined';
  }
  if (!habitat_pictures_provider && props.mode === 'edit') {
    return 'Habitat banner block, habitat pictures provider undefined';
  }

  return (
    <div className="habitat-banner-details">
      <div className="habitat-details">
        <div className="habitat-metadata">
          <h2 className="name">{scientific_name[0]}</h2>
          <p className="info">
            Habitats Directive Annex I code&nbsp;&nbsp;&nbsp;{code_2000[0]}
          </p>
        </div>
        {pictures_length > 0 && (
          <div className={cx('carousel one-slide')}>
            <div
              className={cx('arrows', { 'arrows-hidden': pictures_length < 2 })}
            >
              {pictures_length > 1 && (
                <>
                  <button
                    className="swiper-button image-swiper-button-prev"
                    onClick={() => {
                      swiperEl.current.slidePrev();
                      if (previewEl.current?.[0]) {
                        previewEl.current[0].slidePrev();
                      }
                      if (previewEl.current?.[1]) {
                        previewEl.current[1].slidePrev();
                      }
                      setActiveSlide(swiperEl.current.realIndex);
                    }}
                  >
                    <Icon
                      className="icon-left"
                      color="#000"
                      name={arrowLeft}
                      size="32px"
                    />
                  </button>
                  <button
                    className="swiper-button image-swiper-button-next"
                    onClick={() => {
                      swiperEl.current.slideNext();
                      if (previewEl.current?.[0]) {
                        previewEl.current[0].slideNext();
                      }
                      if (previewEl.current?.[1]) {
                        previewEl.current[1].slideNext();
                      }
                      setActiveSlide(swiperEl.current.realIndex);
                    }}
                  >
                    <Icon
                      className="icon-right"
                      color="#000"
                      name={arrowRight}
                      size="32px"
                    />
                  </button>
                </>
              )}
              {!!attribution_copyright[activeSlide] && (
                <p>{attribution_copyright[activeSlide]}</p>
              )}
            </div>
            <SwiperLoader>
              {() => {
                return (
                  <SwiperReactLoader>
                    {({ Swiper, SwiperSlide }) => {
                      return (
                        <>
                          <Swiper
                            loop={true}
                            allowTouchMove={false}
                            initialSlide={0}
                            slidesPerView={1}
                            spaceBetween={0}
                            onBeforeInit={(swiper) => {
                              swiperEl.current = swiper;
                            }}
                          >
                            {pictures.map((source, index) => (
                              <SwiperSlide>
                                <img
                                  src={getSource(source)}
                                  alt={pictures[index]}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </>
                      );
                    }}
                  </SwiperReactLoader>
                );
              }}
            </SwiperLoader>
          </div>
        )}
      </div>
    </div>
  );
};

const View = compose(
  connectToMultipleProviders((props) => ({
    providers: [
      {
        provider_url: props.data?.habitat_provider,
      },
      { provider_url: props.data?.habitat_pictures_provider },
    ],
  })),
)(_View);

export default (props) => {
  return (
    <VisibilitySensor Placeholder={() => <div>loading....&nbsp;</div>}>
      <View {...props} />
    </VisibilitySensor>
  );
};
