/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import Navigation from '../Navigation/Navigation';
import Sticky from 'react-stickynode';

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
        <Segment
          basic
          className="header-wrapper tablet computer large screen widescreen only"
          role="banner"
        >
          <Sticky enabled={true} top={0}>
            <Container>
              <div className="header">
                <div className="logo-nav-wrapper">
                  <div className="tools-search-wrapper">
                    <Navigation pathname={this.props.pathname} />
                  </div>
                </div>
              </div>
            </Container>
          </Sticky>
        </Segment>
        <Segment basic className="header-wrapper mobile only" role="banner">
          <div className="sticky-outer-wrapper">
            <div className="sticky-inner-wrapper">
              <Container>
                <div className="header">
                  <div className="logo-nav-wrapper">
                    <div className="tools-search-wrapper">
                      <Navigation pathname={this.props.pathname} />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </Segment>
      </>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(withRouter(withLocalStorage(Header)));
