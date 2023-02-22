/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useContext, useMemo } from 'react';
import cx from 'classnames';
import { matchPath, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import { Container, Segment, Sticky, Image } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { Anontools } from '@plone/volto/components';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import { StickyContext } from '@eeacms/volto-bise/components';
import Navigation from '../Navigation/Navigation';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

import BISELogo from '@eeacms/volto-bise/customizations/volto/components/theme/Logo/Logo.svg';

function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}

function matchPaths(paths, pathname) {
  if (
    matchPath(pathname, {
      path: paths,
      exact: true,
      strict: false,
    })
  ) {
    return true;
  }
  return false;
}

const Navbar = (props) => {
  const currentLang = props.localStorage.get('N2K_LANGUAGE');

  return (
    <div>
      <Segment basic role="banner" className={cx('header-wrapper')}>
        <Container>
          <div className="header">
            <div className="logo-nav-wrapper">
              <div className="logo">
                <Link title="Natura 2000" to="/">
                  <Image
                    src={BISELogo}
                    alt="Biodiversity logo"
                    title="Biodiversity logo"
                    height={64}
                    width={192}
                  />
                </Link>
              </div>
              <div className="tools-search-wrapper">
                {currentLang ? (
                  <Navigation
                    pathname={props.pathname}
                    isSticky={props.isSticky}
                    isRoot={props.isRoot}
                    isExplorer={props.isExplorer}
                  />
                ) : (
                  ''
                )}
              </div>
              {!props.isSdf && !props.isExplorer && (
                <div className="mobile hidden tablet hidden computer hidden language-selector-wrapper">
                  <LanguageSelector navigation={props.navigation} />
                </div>
              )}
            </div>
          </div>
          {!props.token && (
            <Portal
              node={__CLIENT__ && document.querySelector('#footer_links')}
            >
              <Anontools />
            </Portal>
          )}
        </Container>
      </Segment>
    </div>
  );
};

const Header = (props) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const { stickyRef } = useContext(StickyContext);
  const isRoot = useMemo(
    () =>
      removeTrailingSlash(props.pathname) !== '/natura2000/natura2000' &&
      matchPath(props.pathname, {
        path: config.settings.n2k.multilingualRoot,
        exact: true,
        strict: false,
      }),
    [props.pathname],
  );

  const isSdf = useMemo(() => matchPaths(config.settings.sdf, props.pathname), [
    props.pathname,
  ]);

  const isExplorer = useMemo(
    () => matchPaths(config.settings.explorer, props.pathname),
    [props.pathname],
  );

  useEffect(() => {
    if (!props.localStorage.get('N2K_LANGUAGE')) {
      props.localStorage.set(
        'N2K_LANGUAGE',
        config.settings.n2k.defaultLanguage,
      );
    }
    /* eslint-disable-next-line */
  }, []);

  return isRoot ? (
    <div className="ui basic segment sticky-header-wrapper">
      <div className="ui sticky">
        <Navbar
          {...props}
          isSticky={false}
          isRoot={isRoot}
          isSdf={isSdf}
          isExplorer={isExplorer}
        />
      </div>
    </div>
  ) : (
    <Sticky
      context={stickyRef}
      className="ui basic segment sticky-header-wrapper"
      role="banner"
      onStick={() => {
        setIsSticky(true);
      }}
      onUnstick={() => {
        setIsSticky(false);
      }}
    >
      <Navbar
        {...props}
        isSticky={isSticky}
        isRoot={isRoot}
        isSdf={isSdf}
        isExplorer={isExplorer}
      />
    </Sticky>
  );
};

export default compose(
  withRouter,
  withLocalStorage,
  connect((state) => {
    return {
      token: state.userSession.token,
      navigation: state.navigation,
    };
  }),
)(Header);
