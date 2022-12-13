/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { matchPath, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { Menu, Dropdown } from 'semantic-ui-react';
import cx from 'classnames';
import {
  getBaseUrl,
  flattenToAppURL,
  hasApiExpander,
} from '@plone/volto/helpers';
import { UniversalLink, Icon } from '@plone/volto/components';
import qs from 'querystring';
import { getNavigation } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import { withLocalStorage } from '@eeacms/volto-n2k/hocs';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import n2kLogo from '@eeacms/volto-n2k/icons/natura2000.svg';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

const Hamburger = (props) => (
  <div className="hamburger-wrapper mobile only">
    <button
      className={cx('hamburger hamburger--collapse', {
        'is-active': props.isMobileMenuOpen,
      })}
      aria-label={
        props.isMobileMenuOpen
          ? props.intl.formatMessage(messages.closeMobileMenu, {
              type: props.type,
            })
          : props.intl.formatMessage(messages.openMobileMenu, {
              type: props.type,
            })
      }
      title={
        props.isMobileMenuOpen
          ? props.intl.formatMessage(messages.closeMobileMenu, {
              type: props.type,
            })
          : props.intl.formatMessage(messages.openMobileMenu, {
              type: props.type,
            })
      }
      type="button"
      onClick={props.toggleMobileMenu}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  </div>
);

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        items: PropTypes.array,
      }),
    ).isRequired,
  };

  static defaultProps = {
    token: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
      isSdf: false,
    };
    this.container = React.createRef();
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { settings } = config;
    if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
      this.props.getNavigation(
        getBaseUrl(this.props.pathname),
        settings.navDepth,
      );
    }
    this.setState({
      isSdf: this.isSdf(),
    });
  }

  handleClickOutsideNav = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        isMobileMenuOpen: false,
      });
    }
  };

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { settings } = config;
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
        this.props.getNavigation(
          getBaseUrl(nextProps.pathname),
          settings.navDepth,
        );
      }
      this.closeMobileMenu();
    }

    // Hide submenu on route change
    if (document.querySelector('body')) {
      document.querySelector('body').click();
    }
  }

  /**
   * Check if menu is active
   * @method isActive
   * @param {string} url Url of the navigation item.
   * @returns {bool} Is menu active?
   */
  isActive(url) {
    return (
      (url === '' && this.props.pathname === '/') ||
      // (url !== '' && isMatch(this.props.pathname.split('/'), url.split('/')))
      (url !== '' && url === this.props.pathname)
    );
  }

  /**
   * Check if page si sdf
   * @method isSdf
   * @returns {bool} Is sdf?
   */
  isSdf() {
    if (
      matchPath(this.props.pathname, {
        path: config.settings.sdf,
        exact: true,
        strict: false,
      })
    ) {
      return true;
    }
    return false;
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen }, () => {
      if (this.state.isMobileMenuOpen) {
        document.addEventListener('mousedown', this.handleClickOutsideNav);
      }
    });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false }, () => {
      document.removeEventListener('mousedown', this.handleClickOutsideNav);
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const params = {
      ...this.props.match.params,
      ...(this.props.route_parameters || {}),
      ...qs.parse(this.props.location.search.replace('?', '')),
    };
    const currentLang = this.props.localStorage.get('N2K_LANGUAGE');

    return (
      <nav
        className={cx('navigation', this.props.className || '')}
        ref={this.container}
      >
        <div className="mobile only">
          <Hamburger
            {...this.props}
            isMobileMenuOpen={this.state.isMobileMenuOpen}
            toggleMobileMenu={this.toggleMobileMenu}
          />
        </div>
        <Menu
          stackable
          pointing
          secondary
          className={cx({
            open: this.state.isMobileMenuOpen,
            'is-sdf': this.state.isSdf,
            'is-sticky': this.state.isSdf || this.props.isSticky,
            'mobile hidden': !this.state.isMobileMenuOpen,
            'mobile only': this.state.isMobileMenuOpen,
          })}
          onClick={this.closeMobileMenu}
          onBlur={() => this.closeMobileMenu}
        >
          <div className="mobile only">
            <Hamburger
              {...this.props}
              isMobileMenuOpen={this.state.isMobileMenuOpen}
              toggleMobileMenu={this.toggleMobileMenu}
            />
          </div>
          <Menu.Item className="home-button logo">
            <Link title="Natura 2000" to={`/natura2000/${currentLang}`}>
              <Icon name={n2kLogo} size={44} />
            </Link>
          </Menu.Item>
          {this.state.isSdf ? (
            <>
              <button
                to={this.props.pathname}
                title="At a glance"
                className="item firstLevel at-glance"
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                  });
                }}
              >
                AT A GLANCE
              </button>

              <UniversalLink
                href={
                  params.site_code
                    ? `https://natura2000.eea.europa.eu/Natura2000/SDF.aspx?site=${params.site_code}`
                    : '#'
                }
                openLinkInNewTab={true}
                title="Go to expert view"
                className="item firstLevel deep-dive"
              >
                GO TO EXPERT VIEW
              </UniversalLink>
            </>
          ) : (
            ''
          )}

          {(!this.state.isSdf && !this.props.isRoot) || this.props.isExplorer
            ? this.props.items.map((item) => {
                const flatUrl = flattenToAppURL(item.url);
                const itemID = item.title.split(' ').join('-').toLowerCase();
                return item.items && item.items.length && false ? (
                  <Dropdown
                    id={itemID}
                    className={cx({
                      item: true,
                      firstLevel: true,
                      menuActive: this.isActive(flatUrl),
                    })}
                    key={flatUrl}
                    trigger={
                      <Link to={flatUrl === '' ? '/' : flatUrl} key={flatUrl}>
                        {item.title}
                      </Link>
                    }
                    item
                    simple
                  >
                    <Dropdown.Menu>
                      {item.items.map((subitem) => {
                        const flatSubUrl = flattenToAppURL(subitem.url);
                        const subItemID = subitem.title
                          .split(' ')
                          .join('-')
                          .toLowerCase();
                        return (
                          <Dropdown.Item key={flatSubUrl}>
                            <div className="secondLevel-wrapper">
                              <Link
                                id={subItemID}
                                to={flatSubUrl === '' ? '/' : flatSubUrl}
                                key={flatSubUrl}
                                className={
                                  this.isActive(flatSubUrl)
                                    ? 'item secondLevel menuActive'
                                    : 'item secondLevel'
                                }
                              >
                                {subitem.title}
                              </Link>
                            </div>
                            {subitem.items && (
                              <div className="submenu-wrapper">
                                <div className="submenu">
                                  {subitem.items.map((subsubitem) => {
                                    const flatSubSubUrl = flattenToAppURL(
                                      subsubitem.url,
                                    );
                                    return (
                                      <Link
                                        to={
                                          flatSubSubUrl === ''
                                            ? '/'
                                            : flatSubSubUrl
                                        }
                                        title={subsubitem.title}
                                        key={flatSubSubUrl}
                                        className={
                                          this.isActive(flatSubSubUrl)
                                            ? 'item thirdLevel menuActive'
                                            : 'item thirdLevel'
                                        }
                                      >
                                        {subsubitem.title}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link
                    to={flatUrl === '' ? '/' : flatUrl}
                    key={flatUrl}
                    className={
                      this.isActive(flatUrl)
                        ? 'item menuActive firstLevel'
                        : 'item firstLevel'
                    }
                  >
                    {item.title}
                  </Link>
                );
              })
            : ''}
          {!this.state.isSdf && !this.props.isExplorer ? (
            <Menu.Item className="firstLevel language-selector-wrapper">
              <LanguageSelector navigation={this.props.navigation} />
            </Menu.Item>
          ) : (
            ''
          )}
        </Menu>
      </nav>
    );
  }
}

const getN2kItems = (items, localStorage) => {
  if (__SERVER__) return [];
  const currentLang = localStorage.get('N2K_LANGUAGE');
  let navItems = [];
  const natura2000 =
    items.filter((item) => item.url === '/natura2000')?.[0]?.items || [];
  natura2000.forEach((item) => {
    const languageFolder = matchPath(item.url, {
      path: config.settings.n2k.multilingualRoot,
      exact: true,
      strict: false,
    });
    if (languageFolder && languageFolder.params.lang === currentLang) {
      navItems = [...navItems, ...(item.items || [])];
    }
    if (
      languageFolder &&
      !config.settings.n2k.supportedLanguages.includes(
        languageFolder.params.lang,
      ) &&
      item.url !== '/natura2000/sites' &&
      item.url !== '/natura2000/habitats' &&
      item.url !== '/natura2000/species' &&
      item.url !== '/natura2000/copyright-notice'
    ) {
      navItems.push(item);
    }
  });

  return navItems;
};

export default compose(
  withRouter,
  withLocalStorage,
  injectIntl,
  connect(
    (state, props) => {
      return {
        token: state.userSession.token,
        route_parameters: state.route_parameters,
        navigation: state.navigation,
        items: getN2kItems(state.navigation.items, props.localStorage),
      };
    },
    { getNavigation },
  ),
)(Navigation);
