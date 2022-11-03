import CopyPaste from './CopyPaste';
import HashLink from './HashLink';

export default (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '/**/edit',
      component: CopyPaste,
    },
    {
      match: '',
      component: HashLink,
    },
  ];

  return config;
};
