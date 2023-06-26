/* eslint-disable react/jsx-no-target-blank */
import React, { useRef, useMemo, useState } from 'react';
import { compose } from 'redux';
import cx from 'classnames';
import loadable from '@loadable/component';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToMultipleProviders } from '@eeacms/volto-datablocks/hocs';
import { replaceQueryParam } from '@eeacms/volto-n2k/helpers';
import arrowLeft from '@eeacms/volto-n2k/icons/arrow-left.svg';
import arrowRight from '@eeacms/volto-n2k/icons/arrow-right.svg';
import './style.less';

const SwiperLoader = loadable.lib(() => import('swiper'));
const SwiperReactLoader = loadable.lib(() => import('swiper/react'));

const getSource = (source) => {
  let parsedSource = replaceQueryParam(source, 'x', 300);
  parsedSource = replaceQueryParam(parsedSource, 'y', 300);

  return parsedSource;
};

const _View = (props) => {
  const swiperEl = useRef();
  const previewEl = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const species_provider = flattenToAppURL(props.data.species_provider);
  const species_pictures_provider = flattenToAppURL(
    props.data.species_pictures_provider,
  );
  const species = props.providers_data?.[species_provider] || {};
  const species_pictures =
    props.providers_data?.[species_pictures_provider] || {};

  const {
    author = [],
    common_name = [],
    code_2000 = [],
    id_eunis = [],
    picture_url = [],
    scientific_name = [],
    source = [],
    license = [],
  } = species;
  const { attribution_copyright = [] } = species_pictures;

  const pictures = useMemo(() => {
    const weburls = species_pictures?.['WebURL'] || [];
    if (weburls.filter((url) => !!url).length > 0) {
      return weburls;
    }
    return picture_url;
  }, [species_pictures, picture_url]);

  const pictures_length = useMemo(
    () => pictures.filter((picture) => !!picture)?.length,
    [pictures],
  );

  if (!species_provider && props.mode === 'edit') {
    return 'species banner block, species provider undefined';
  }
  if (!species_pictures_provider && props.mode === 'edit') {
    return 'Species banner block, species pictures provider undefined';
  }

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
          <div className={cx('carousel one-slide')}>
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
              {!!attribution_copyright[activeSlide] ? (
                <p>{attribution_copyright[activeSlide]}</p>
              ) : !!source[activeSlide] && !!license[activeSlide] ? (
                <p title={`${source[activeSlide]} - ${license[activeSlide]}`}>
                  {source[activeSlide]} - {license[activeSlide]}
                </p>
              ) : null}
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
                            allowTouchMove={true}
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
        provider_url: props.data?.species_provider,
      },
      { provider_url: props.data?.species_pictures_provider },
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
