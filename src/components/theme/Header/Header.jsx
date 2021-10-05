/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { Container, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import config from '@plone/volto/registry';
import { Anontools } from '@plone/volto/components';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import Navigation from '../Navigation/Navigation';
import { StickyContext } from '~/components';

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

  useEffect(() => {
    if (!props.localStorage.get('N2K_LANGUAGE')) {
      props.localStorage.set('N2K_LANGUAGE', config.settings.defaultLanguage);
    }
    /* eslint-disable-next-line */
  }, []);

  return props.location.pathname === '/natura2000' ? (
    ''
  ) : (
    <>
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
        <Navbar {...props} isSticky={isSticky} />
      </Sticky>
    </>
  );
};

export default connect((state) => ({
  token: state.userSession.token,
}))(withRouter(withLocalStorage(Header)));
