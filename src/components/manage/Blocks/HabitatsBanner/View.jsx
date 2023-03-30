import React, { useState } from 'react';
import loadable from '@loadable/component';
import { Container } from 'semantic-ui-react';
import arrow from './chevron-left-square-fill-svgrepo-com.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const View = (props) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const provider_data = props.provider_data || {};
  // eslint-disable-next-line no-console
  console.log(provider_data);
  const { code_2000 = [], WebURL = [], filename = [] } = provider_data;

  if (!code_2000[0]) return '';
  return (
    <div className="habitat-banner-details full-width">
      <Container>
        <div className="habitat-details">
          <div className="habitat-metadata">
            {/* <h2 className="name">{scientific_name[0]}</h2> */}
            <p className="info">
              Habitats Directive Annex I code&nbsp;&nbsp;&nbsp;{code_2000[0]}
            </p>
          </div>
          <div className="carousel">
            <div className="arrows">
              <div className="swiper-button image-swiper-button-prev">
                <img className="icon-left" src={arrow} alt="left arrow" />
              </div>
              <div className="swiper-button image-swiper-button-next">
                <img className="icon-right" src={arrow} alt="right arrow" />
              </div>
            </div>
            <SwiperLoader>
              {({ Navigation, Pagination }) => {
                return (
                  <SwiperReactLoader>
                    {({ Swiper, SwiperSlide }) => {
                      return (
                        <Swiper
                          navigation={{
                            nextEl: '.image-swiper-button-next',
                            prevEl: '.image-swiper-button-prev',
                          }}
                          onSwiper={setSwiperRef}
                          slidesPerView={3}
                          spaceBetween={0}
                          loop={true}
                          modules={[Navigation, Pagination]}
                          className="mySwiper"
                        >
                          {WebURL.map((img) => (
                            <SwiperSlide>
                              <img src={img} alt={filename} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      );
                    }}
                  </SwiperReactLoader>
                );
              }}
            </SwiperLoader>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default View;
