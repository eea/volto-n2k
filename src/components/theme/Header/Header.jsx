/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useContext, useMemo } from 'react';
import { matchPath, withRouter } from 'react-router';
import { Container, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import config from '@plone/volto/registry';
import { Anontools } from '@plone/volto/components';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import Navigation from '../Navigation/Navigation';
import { StickyContext } from '@eeacms/volto-bise/components';

const Navbar = (props) => {
  const currentLang = props.localStorage.get('N2K_LANGUAGE');

  return (
    <Container>
      <div className="header-wrapper">
        <div className="header">
          <div className="logo-nav-wrapper">
            <div className="tools-search-wrapper">
              {currentLang ? (
                <Navigation
                  isSticky={props.isSticky}
                  isRoot={props.isRoot}
                  isExplorer={props.isExplorer}
                  pathname={props.pathname}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      {!props.token && (
        <Portal node={__CLIENT__ && document.querySelector('#footer_links')}>
          <Anontools />
        </Portal>
      )}
    </Container>
  );
};

const Header = (props) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const { stickyRef } = useContext(StickyContext);
  const isRoot = useMemo(
    () =>
      matchPath(props.pathname, {
        path: config.settings.n2k.multilingualRoot,
        exact: true,
        strict: false,
      }),
    [props.pathname],
  );

  const isExplorer = useMemo(
    () =>
      (isRoot &&
        !config.settings.n2k.supportedLanguages.includes(isRoot.params.lang)) ||
      matchPath(props.pathname, {
        path: '/natura2000/explore-natura2000/*',
        exact: true,
        strict: false,
      }),
    [props.pathname, isRoot],
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

  return isRoot || isExplorer ? (
    <div className="ui basic segment sticky-header-wrapper">
      <div className="ui sticky">
        <Navbar
          {...props}
          isSticky={false}
          isRoot={isRoot}
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
        isExplorer={isExplorer}
      />
    </Sticky>
  );
};

export default connect((state) => ({
  token: state.userSession.token,
}))(withRouter(withLocalStorage(Header)));
