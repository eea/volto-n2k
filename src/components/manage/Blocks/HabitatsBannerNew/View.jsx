import React from 'react';
import { Container } from 'semantic-ui-react';
import loadable from '@loadable/component';
import cx from 'classnames';
import './style.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = loadable(() => import('react-slick'));

const View = (props) => {
  const slider = React.useRef(null);
  const provider_data = props.provider_data || {};
  const { WebURL = [], id_photo = [], AnnexI_name = [] } = provider_data;

  const sliderSettings = {
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    cssEase: 'ease',
    dots: false,
    speed: 500,
    initialSlide: 0,
    lazyLoad: 'ondemand',
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
  };

  if (!id_photo[0]) return '';
  return (
    <div className="habitats-banner-details full-width">
      <Container>
        <div className="habitats-details">
          <div
            className={cx('habitats-pictures', {
              'with-slider': WebURL.length > 0 && WebURL[0],
            })}
          >
            {WebURL.length > 0 && WebURL[0] ? (
              <Slider {...sliderSettings} ref={slider}>
                {WebURL.map((picture, index) => (
                  <div key={`${picture}_${index}`} className="picture-wrapper">
                    <img src={picture} alt={AnnexI_name[0]} />
                    <div className="source"></div>
                  </div>
                ))}
              </Slider>
            ) : (
              ''
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default View;
