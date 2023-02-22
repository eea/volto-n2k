/* eslint-disable react/jsx-no-target-blank */
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
    code_2000 = [],
    id_eunis = [],
    license = [],
    number_sites = [],
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
            <h2 className="name">
              {common_name[0] ? common_name[0] + ' - ' : ''}{' '}
              <span style={{ fontStyle: 'italic' }}>{scientific_name[0]}</span>
            </h2>
            {author[0] && (
              <p
                className="info radjhan-bold"
                style={{ marginBottom: '0.15rem' }}
              >
                {author[0]}
              </p>
            )}
            {code_2000[0] && (
              <p className="info">Natura 2000 species code {code_2000[0]}</p>
            )}
            <br />
            {number_sites[0] && (
              <h3 style={{ marginBottom: '0.15rem' }}>{number_sites[0]}</h3>
            )}
            <h4 className="radjhan-normal">
              NATURA 2000 SITES PROTECTING THIS SPECIES
            </h4>
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
            <div className="find-image">
              <a
                href={`http://images.google.com/images?q=${scientific_name[0]}`}
                target="_blank"
              >
                Find image on the web
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default View;
