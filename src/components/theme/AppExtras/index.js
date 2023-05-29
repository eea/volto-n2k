import HashLink from './HashLink';

export default (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: HashLink,
    },
  ];

  return config;
};
