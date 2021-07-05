import React from 'react';
import { Container } from 'semantic-ui-react';
import loadable from '@loadable/component';
import { photoPlaceholders } from '@eeacms/volto-n2k/helpers';
import cx from 'classnames';
import './style.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = loadable(() => import('react-slick'));

const View = (props) => {
  const slider = React.useRef(null);
  const provider_data = props.provider_data || {};
  const {
    author = [],
    common_name = [],
    common_name_list = [],
    id_eunis = [],
    license = [],
    picture_url = [],
    scientific_name = [],
    source = [],
    source_url = [],
    species_group_name = [],
  } = provider_data;

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

  if (!id_eunis[0]) return '';
  return (
    <div className="species-banner-details full-width">
      <Container>
        <div className="species-details">
          <div className="species-metadata">
            <h2 className="name">{scientific_name[0]}</h2>
            <p className="info">
              {common_name[0] ? common_name[0] + ' - ' : ''} {author[0]}
            </p>
            {common_name_list[0] ? (
              <p className="info">Common names: {common_name_list[0]}</p>
            ) : (
              ''
            )}
          </div>
          <div
            className={cx('species-pictures', {
              'with-slider': picture_url.length > 0 && picture_url[0],
            })}
          >
            {picture_url.length > 0 && picture_url[0] ? (
              <Slider {...sliderSettings} ref={slider}>
                {picture_url.map((picture, index) => (
                  <div key={`${picture}_${index}`} className="picture-wrapper">
                    <img src={picture} alt={common_name[0]} />
                    <div className="source">
                      <a
                        href={source_url[index]}
                        title={'Picture source'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source[index]}
                        {license[index] ? (
                          <>
                            ,<br />
                            {license[index]}
                          </>
                        ) : (
                          ''
                        )}
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="picture-wrapper">
                <img
                  src={
                    photoPlaceholders[species_group_name[0]] ||
                    photoPlaceholders.default
                  }
                  alt={species_group_name[0]}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default View;
