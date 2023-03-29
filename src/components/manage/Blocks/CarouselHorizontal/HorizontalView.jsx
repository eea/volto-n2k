import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import loadable from '@loadable/component';
import { Icon, RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import rightArrowSVG from '@eeacms/volto-n2k/icons/right-key.svg';
import leftArrowSVG from '@eeacms/volto-n2k/icons/left-key.svg';
import cx from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@eeacms/volto-tabs-block/less/carousel.less';
import './styles.less';

const Slider = loadable(() => import('react-slick'));

const Dots = (props) => {
  const { activeTab = null, tabsList = [], slider = {} } = props;
  return slider.current && tabsList.length > 1 ? (
    <div className="slick-dots-wrapper">
      <div className="slick-line" />
      <ul className={cx('slick-dots ui container', props.uiContainer)}>
        {tabsList.map((tab, index) => (
          <li
            key={`dot-${tab}`}
            className={cx({ 'slick-active': activeTab === tab })}
          >
            <button
              aria-label={`Select slide ${index + 1}`}
              tabIndex={0}
              onClick={() => {
                if (slider.current) {
                  slider.current.slickGoTo(index);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    ''
  );
};

const ArrowsGroup = (props) => {
  const { activeTab = null, tabsList = [], slider = {} } = props;
  const currentSlide = tabsList.indexOf(activeTab);
  const slideCount = tabsList.length;

  return slider.current ? (
    <div
      className={cx({
        'slick-arrows': true,
        'one-arrow': currentSlide === 0 || currentSlide === slideCount - 1,
      })}
    >
      {currentSlide > 0 ? (
        <button
          aria-label="Previous slide"
          className="slick-arrow slick-prev"
          onClick={() => {
            if (slider.current) {
              slider.current.slickPrev();
            }
          }}
          tabIndex={0}
        >
          <Icon name={leftArrowSVG} size="50px" />
        </button>
      ) : (
        ''
      )}
      {currentSlide < slideCount - 1 ? (
        <button
          aria-label="Next slide"
          className="slick-arrow slick-next"
          onClick={() => {
            if (slider.current) {
              slider.current.slickNext();
            }
          }}
          tabIndex={0}
        >
          {currentSlide === 0 && props.learnMore ? (
            <p className="learn-more">{props.learnMore}</p>
          ) : (
            ''
          )}
          <Icon name={rightArrowSVG} size="50px" />
        </button>
      ) : (
        ''
      )}
    </div>
  ) : (
    ''
  );
};

const View = (props) => {
  const slider = React.useRef(null);
  const img = React.useRef(null);
  const [imgHeight, setImgHeight] = React.useState(0);
  const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);
  const blockId = props.id;
  const {
    activeTab = null,
    data = {},
    hashlink = {},
    metadata = {},
    tabsList = [],
    tabs = {},
    setActiveTab = () => {},
  } = props;
  const activeTabIndex = tabsList.indexOf(activeTab);
  const uiContainer = data.align === 'full' ? 'ui container' : false;
  const image = data.image || null;

  const settings = {
    autoplay: false,
    arrows: false,
    dots: false,
    speed: 500,
    initialSlide: 0,
    lazyLoad: 'ondemand',
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    beforeChange: (oldIndex, index) => {
      setActiveTab(tabsList[index]);
    },
  };

  // const panes = tabsList.map((tab, index) => {
  //   return {
  //     id: tab,
  //     renderItem: (
  //       <React.Fragment key={`slide-${tab}`}>
  //         <RenderBlocks {...props} metadata={metadata} content={tabs[tab]} />
  //         {index === 0 ? (
  //           <div
  //             className="divider"
  //             style={{ height: `${imgHeight - 80}px` }}
  //           />
  //         ) : (
  //           ''
  //         )}
  //       </React.Fragment>
  //     ),
  //   };
  // });

  // const updateImageHeight = () => {
  //   setImgHeight(img.current?.height || 0);
  // };

  React.useEffect(() => {
    const urlHash = props.location.hash.substring(1) || '';
    if (
      hashlink.counter > 0 ||
      (hashlink.counter === 0 && urlHash && !hashlinkOnMount)
    ) {
      const id = hashlink.hash || urlHash || '';
      const index = tabsList.indexOf(id);
      const parentId = data.id || props.id;
      const parent = document.getElementById(parentId);
      // TODO: Find the best way to add offset relative to header
      //       The header can be static on mobile and relative on > mobile
      const headerWrapper = document.querySelector('.header-wrapper');
      const offsetHeight = headerWrapper?.offsetHeight || 0;
      if (
        id !== parentId &&
        parentId === hashlink.data.parentId &&
        index > -1 &&
        parent
      ) {
        if (activeTabIndex !== index) {
          slider.current.slickGoTo(index);
        }
        props.scrollToTarget(parent, offsetHeight);
      } else if (id === parentId && parent) {
        props.scrollToTarget(parent, offsetHeight);
      }
    }
    if (!hashlinkOnMount) {
      setHashlinkOnMount(true);
    }
    /* eslint-disable-next-line */
  }, [hashlink.counter]);

  const panes = tabsList.map((tab, index) => {
    return {
      id: tab,
      renderItem: (
        <RenderBlocks
          key={`slide-${tab}`}
          {...props}
          metadata={metadata}
          content={tabs[tab]}
        />
      ),
    };
  });

  // React.useEffect(() => {
  //   updateImageHeight();
  //   img.current.onload = () => {
  //     updateImageHeight();
  //   };
  //   window.addEventListener('resize', updateImageHeight);
  //   return () => {
  //     window.removeEventListener('resize', updateImageHeight);
  //   };
  //   /* eslint-disable-next-line */
  // }, []);

  console.log('HERE RERENDER');

  return (
    <>
      <Slider
        {...settings}
        ref={slider}
        className={cx(uiContainer, 'tabs-accessibility')}
        accessibility={true}
        afterChange={() => {
          if (
            document
              .getElementById(blockId)
              ?.getElementsByClassName('slick-slider')?.length > 0
          ) {
            document
              .getElementById(blockId)
              .getElementsByClassName('slick-current')[0]
              .focus();
          }
        }}
      >
        {panes.length ? panes.map((pane) => pane.renderItem) : ''}
      </Slider>
      <img
        ref={img}
        className={cx('slick-image', { hidden: activeTabIndex !== 0 })}
        src={`${image}/@@images/image/preview`}
        alt="Logo"
      />
      <ArrowsGroup
        activeTab={activeTab}
        tabsList={tabsList}
        slider={slider}
        learnMore={data.learnMore}
      />
      <Dots activeTab={activeTab} tabsList={tabsList} slider={slider} />
    </>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
    };
  }),
  withScrollToTarget,
)(withRouter(View));
