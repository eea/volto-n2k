import React, { useState, useEffect, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Menu, Container, Sticky } from 'semantic-ui-react';
import qs from 'querystring';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';
import { withHashLink } from 'volto-slate/hooks';
import { StickyContext } from '@eeacms/volto-bise/components';
import './styles.less';

const formatLink = (str, obj) => {
  let newStr = str;
  if (!str || typeof str !== 'string') return str;
  Object.keys(obj || {}).forEach((key) => {
    newStr = newStr.replace(new RegExp(`\\$${key}`, 'g'), obj[key]);
  });
  return newStr;
};

const View = (props) => {
  const [activeHash, setActiveHash] = useState();
  const [offsetHeight, setOffsetHeight] = useState(0);
  const { stickyRef } = useContext(StickyContext);
  const anchorsRef = useRef();
  const { data = {}, screen = {} } = props;
  const links = data.links || [];
  const sticky = data.sticky ?? true;

  const params = {
    ...props.match.params,
    ...(props.route_parameters || {}),
    ...qs.parse(props.location.search.replace('?', '')),
  };

  const hashList = links
    .map((link) => link.hash?.[0]?.['id'])
    .filter((hash) => hash);

  const onScroll = () => {
    const top = document.documentElement.scrollTop;
    const offsetHeight = anchorsRef.current?.offsetHeight + 10;
    let activeHash,
      maxTop = 0;
    hashList.forEach((hash) => {
      const hashTop = document.getElementById(hash)?.offsetTop;
      if (top >= hashTop - offsetHeight && top >= maxTop) {
        maxTop = top;
        activeHash = hash;
      }
    });
    setActiveHash(activeHash);
    setOffsetHeight(offsetHeight - 11);
  };

  useEffect(() => {
    onScroll();
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
    /* eslint-disable-next-line */
  }, []);

  return (
    <Sticky
      active={sticky && screen.page?.width > 765}
      context={stickyRef}
      className={cx('sticky-navigation-anchors', {
        'full-width': sticky,
        'is-sticky': sticky,
      })}
    >
      <div
        className={cx('navigation-anchors', data.className)}
        ref={anchorsRef}
      >
        <Container>
          <Menu
            stackable
            style={{ justifyContent: data.align || 'flex-start' }}
          >
            {links?.map((link, index) => {
              const href = formatLink(link.href, params);
              const hash = link.hash?.[0] || {};

              return (
                <Menu.Item
                  key={`anchor-${link.title}-${index}`}
                  active={
                    (hash.id && activeHash && hash.id === activeHash) ||
                    (!hash.id &&
                      !link.isHash &&
                      props.location.pathname === href.replace(/\/$/, ''))
                  }
                >
                  {link.isHash ? (
                    <a
                      href={`#${hash.id}`}
                      title={link.title}
                      onClick={(event) => {
                        event.preventDefault();
                        if (link.target === '_self') return;
                        props.setHashLink(hash.id, { ...hash, offsetHeight });
                      }}
                      target={link.target || '_self'}
                    >
                      {link.title}
                    </a>
                  ) : (
                    <UniversalLink
                      href={href || '#'}
                      openLinkInNewTab={link.target === '_blank'}
                      title={link.title}
                    >
                      {link.title}
                    </UniversalLink>
                  )}
                </Menu.Item>
              );
            })}
          </Menu>
        </Container>
      </div>
    </Sticky>
  );
};

export default connect((state) => ({
  screen: state.screen,
  route_parameters: state.route_parameters || {},
}))(withHashLink(withRouter(View)));
