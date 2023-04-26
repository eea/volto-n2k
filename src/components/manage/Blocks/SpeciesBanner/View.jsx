/* eslint-disable react/jsx-no-target-blank */
import React, { useRef, useState } from 'react';
import cx from 'classnames';
import loadable from '@loadable/component';
import { Icon } from '@plone/volto/components';
import arrowLeft from '@eeacms/volto-n2k/icons/arrow-left.svg';
import arrowRight from '@eeacms/volto-n2k/icons/arrow-right.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const View = (props) => {
  const swiperEl = useRef();
  const previewEl = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const provider_data = props.provider_data || {};
  const {
    author = [],
    common_name = [],
    code_2000 = [],
    id_eunis = [],
    license = [],
    // number_sites = [],
    picture_url = [],
    scientific_name = [],
    source = [],
    // source_url = [],
    // species_group_name = [],
  } = provider_data;

  const pictures_length = picture_url?.length;

  if (!id_eunis[0]) return '';
  return (
    <div className="species-banner-details">
      <div className="species-details">
        <div className="species-metadata">
          <h2 className="name">
            {common_name[0] ? common_name[0] + ' - ' : ''}{' '}
            <span style={{ fontStyle: 'italic', textTransform: 'none' }}>
              {scientific_name[0]}
            </span>
          </h2>
          {author[0] && (
            <p className="info radjhan-bold" style={{ marginBottom: '0.5rem' }}>
              {author[0]}
            </p>
          )}
          {code_2000[0] && (
            <p className="info">
              Natura 2000 species code&nbsp;&nbsp;&nbsp;{code_2000[0]}
              <br />
              <br />
              <a
                href={`http://images.google.com/images?q=${scientific_name[0]}`}
                target="_blank"
              >
                Find image on the web
              </a>
            </p>
          )}
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
              <p title={`${source[activeSlide]} - ${license[activeSlide]}`}>
                {source[activeSlide]} - {license[activeSlide]}
              </p>
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
                            {picture_url.map((source, index) => (
                              <SwiperSlide>
                                <img src={source} alt={picture_url[index]} />
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
                              {picture_url.map((source, index) => (
                                <SwiperSlide>
                                  <img src={source} alt={picture_url[index]} />
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
                              {picture_url.map((source, index) => (
                                <SwiperSlide>
                                  <img src={source} alt={picture_url[index]} />
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

export default View;
