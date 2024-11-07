import HashLink from './HashLink';

export default function applyConfig(config) {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: HashLink,
    },
  ];

  return config;
}
