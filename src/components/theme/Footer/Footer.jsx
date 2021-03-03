/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import upKeySVG from '@plone/volto/icons/up-key.svg';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl, pathname }) => (
  <div className="footer-wrapper">
    <div className="back-to-top">
      <Button
        circular
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Icon name={upKeySVG} size="40px" color="#7B7B7B" />
      </Button>
      <p>Back to top</p>
    </div>
    <div className="footer-wrapper-bg" />
    {/* <Segment
    role="contentinfo"
    className="footer-wrapper"
    vertical
    padded
    inverted
    textAlign="center"
  >
    <Container>
      <div className="content">
        <h1>
          <FormattedMessage
            id="Know more about marine conservation in the EU"
            defaultMessage="Know more about marine conservation in the EU"
          />
        </h1>
        <p>
          <FormattedMessage
            id="Do you want to explore {marine_ecosystems} yourself?"
            defaultMessage="Do you want to explore {marine_ecosystems} yourself?"
            values={{
              marine_ecosystems: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage
                    id="marine ecosystems"
                    defaultMessage="marine ecosystems"
                  />
                </a>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="Explore the nearest marine Natura 2000 site {n2k_site}."
            defaultMessage="Explore the nearest marine Natura 2000 site {n2k_site}"
            values={{
              n2k_site: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage id="here" defaultMessage="here" />
                </a>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="Explore more European initiatives for {cetaceans} and {oceans_conservation}."
            defaultMessage="Explore more European initiatives for {cetaceans} and {oceans_conservation}."
            values={{
              cetaceans: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage id="cetaceans" defaultMessage="cetaceans" />
                </a>
              ),
              oceans_conservation: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage
                    id="oceans conservation"
                    defaultMessage="oceans conservation"
                  />
                </a>
              ),
            }}
          />
        </p>
        <Input
          size="small"
          className="search"
          action={{ icon: 'search' }}
          placeholder="Find address or place"
        />
      </div>
    </Container>
  </Segment> */}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
