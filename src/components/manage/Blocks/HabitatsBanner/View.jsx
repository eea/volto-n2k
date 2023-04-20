import React, { useRef, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import loadable from '@loadable/component';
import { Icon } from '@plone/volto/components';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToMultipleProviders } from '@eeacms/volto-datablocks/hocs';
import arrowLeft from '@eeacms/volto-n2k/icons/arrow-left.svg';
import arrowRight from '@eeacms/volto-n2k/icons/arrow-right.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const _View = (props) => {
  const swiperEl = useRef();
  const previewEl = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const { providers = [] } = props.data;
  const habitat = props.providers_data?.[providers[0]?.provider_url] || {};
  const habitat_pictures =
    props.providers_data?.[providers[1]?.provider_url] || {};

  const {
    code_2000,
    // habitat_description = [],
    // habitat_type = [],
    // number_countries = [],
    // number_sites = [],
    scientific_name,
  } = habitat;

  const pictures = habitat_pictures?.['WebURL'] || [];
  const pictures_length = pictures?.length;
  const picture_names = habitat_pictures?.['filename'] || [];
  const copyright = habitat_pictures?.['attribution_copyright'] || [];

  if (!code_2000 && props.mode === 'edit') {
    return 'Habitat banner block (code_2000 undefined)';
  }
  if (!code_2000) return null;

  return (
    <div className="habitat-banner-details">
      <div className="habitat-details">
        <div className="habitat-metadata">
          <h2 className="name">{scientific_name[0]}</h2>
          <p className="info">
            Habitats Directive Annex I code&nbsp;&nbsp;&nbsp;{code_2000[0]}
          </p>
          {/* {number_sites[0] && (
              <>
                <h3 style={{ marginBottom: '0.15rem' }}>{number_sites[0]}</h3>
                <h4 className="radjhan-normal">
                  NATURA 2000 SITES PROTECTING THIS HABITAT
                </h4>
              </>
            )} */}
        </div>
        {pictures_length > 0 && (
          <div
            className={cx('carousel', {
              'one-slide': pictures_length === 1,
              'two-slides': pictures_length === 2,
              'three-slides': pictures_length > 2,
            })}
          >
            <div className="arrows">
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
              {/* <p title={`${source[activeSlide]} - ${license[activeSlide]}`}>
                {source[activeSlide]} - {license[activeSlide]}
              </p> */}
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
                            initialSlide={0}
                            slidesPerView={1}
                            spaceBetween={0}
                            onBeforeInit={(swiper) => {
                              swiperEl.current = swiper;
                            }}
                          >
                            {pictures.map((source, index) => (
                              <SwiperSlide>
                                <img src={source} alt={pictures[index]} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          {pictures_length > 1 && (
                            <Swiper
                              className="preview preview-one"
                              loop={true}
                              initialSlide={1}
                              slidesPerView={1}
                              spaceBetween={0}
                              onBeforeInit={(swiper) => {
                                if (!previewEl.current) {
                                  previewEl.current = [];
                                }
                                previewEl.current[0] = swiper;
                              }}
                            >
                              {pictures.map((source, index) => (
                                <SwiperSlide>
                                  <img src={source} alt={pictures[index]} />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          )}
                          {pictures_length > 2 && (
                            <Swiper
                              className="preview preview-two"
                              loop={true}
                              initialSlide={2}
                              slidesPerView={1}
                              spaceBetween={0}
                              onBeforeInit={(swiper) => {
                                if (!previewEl.current) {
                                  previewEl.current = [];
                                }
                                previewEl.current[1] = swiper;
                              }}
                            >
                              {pictures.map((source, index) => (
                                <SwiperSlide>
                                  <img src={source} alt={pictures[index]} />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          )}
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
    providers: props.data?.providers,
  })),
)(_View);

export default (props) => {
  return (
    <VisibilitySensor Placeholder={() => <div>loading....&nbsp;</div>}>
      <View {...props} />
    </VisibilitySensor>
  );
};
