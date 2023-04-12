import React, { useState } from 'react';
import loadable from '@loadable/component';
import { compose } from 'redux';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToMultipleProviders } from '@eeacms/volto-datablocks/hocs';
import arrowLeft from './chevron-left-square-fill-svgrepo-com.svg';
import arrowRight from './chevron-right-square-fill-svgrepo-com.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const _View = (props) => {
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
        {pictures?.length > 0 && (
          <div className="carousel">
            <div className="arrows">
              <div className="swiper-button image-swiper-button-prev">
                <img
                  className="icon  icon-left"
                  src={arrowLeft}
                  alt="left arrow"
                />
                {/* <Icon className="icon-left" name={arrowSVG} size="24px" /> */}
              </div>
              <div className="swiper-button image-swiper-button-next">
                <img
                  className="icon icon-right"
                  src={arrowRight}
                  alt="right arrow"
                />
                {/* <Icon className="icon-right" name={arrowSVG} size="24px" /> */}
              </div>
              <p>{copyright[activeSlide]}</p>
            </div>
            <SwiperLoader>
              {({ Navigation, Pagination }) => {
                return (
                  <SwiperReactLoader>
                    {({ Swiper, SwiperSlide }) => {
                      return (
                        <Swiper
                          modules={[Navigation, Pagination]}
                          navigation={{
                            prevEl: '.image-swiper-button-prev',
                            nextEl: '.image-swiper-button-next',
                          }}
                          slidesPerView={3}
                          spaceBetween={0}
                          loop={true}
                          breakpoints={{
                            320: {
                              slidesPerView: 1,
                              spaceBetween: 0,
                            },
                            1200: {
                              slidesPerView: 3,
                              spaceBetween: 0,
                            },
                          }}
                          onSlideChange={(swiper) => {
                            setActiveSlide(swiper.activeIndex);
                          }}
                        >
                          {pictures.map((source, index) => (
                            <SwiperSlide>
                              <img src={source} alt={picture_names[index]} />
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
