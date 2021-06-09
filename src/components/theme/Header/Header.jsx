/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import config from '@plone/volto/registry';
import { Anontools } from '@plone/volto/components';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import Navigation from '../Navigation/Navigation';
import { Sticky } from '~/components';

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

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.localStorage.get('N2K_LANGUAGE')) {
      this.props.localStorage.set(
        'N2K_LANGUAGE',
        config.settings.defaultLanguage,
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.location.pathname === '/natura2000' ? (
      ''
    ) : (
      <>
        <Sticky
          className="ui basic segment sticky-header-wrapper"
          role="banner"
        >
          <Navbar {...this.props} />
        </Sticky>
      </>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(withRouter(withLocalStorage(Header)));
