import React from 'react';
import { Icon } from '@plone/volto/components';
import domainSVG from './icons/domain.svg';
import locationSVG from './icons/location.svg';
import emailSVG from './icons/email.svg';

import './styles.less';

const icons = {
  domain: domainSVG,
  location: locationSVG,
  email: emailSVG,
};

const View = (props) => {
  const { mode = 'view', data = {} } = props;
  const { contactFields = [] } = data;
  const provider_data = props.provider_data || {};

  const contacts = contactFields.length
    ? [
        ...Array(
          provider_data[Object.keys(provider_data)[0]]?.length || 0,
        ).keys(),
      ]
    : [];

  return (
    <div className="contact-block">
      {mode === 'edit' ? <p>Contact block</p> : ''}
      {contacts.map((index) => (
        <div key={`contact-${index}`} className="contact">
          {contactFields.map((field) => (
            <div
              key={`contact-field-${index}-${field.dataEntity}`}
              className="contact-field"
            >
              <Icon name={icons[field.icon]} size="24px" />
              <p>{provider_data[field.dataEntity]?.[index] || '-'}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default View;
